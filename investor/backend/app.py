# backend/app.py  (replace your existing file with this)
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from learning.topics import get_learning_topics

import os
from utils.ml_utils import predict_allocation  # ML allocation
from utils.rag_utils import retrieve, get_investment_advice_context  # KB retrieval
from utils.report import create_report
from utils.stock_predictor import stock_predictor
from utils.live_data_service import live_data_service
from utils.enhanced_ml_advisor import enhanced_ml_advisor
from tinydb import TinyDB
from datetime import datetime
import requests

# -------------------------
# LOAD ENV
# -------------------------
load_dotenv()

# -------------------------
# INIT APP
# -------------------------
app = Flask(__name__)
# Allow CORS for all origins (already present)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Accept requests with or without trailing slashes
app.url_map.strict_slashes = False

# -------------------------
# PATHS & DB CONFIG
# -------------------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
UPLOADS_DIR = os.path.join(DATA_DIR, "uploads")
KB_DIR = os.path.join(DATA_DIR, "kb")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(KB_DIR, exist_ok=True)

DB_FILE = os.path.join(DATA_DIR, "db.json")
db = TinyDB(DB_FILE)
records_table = db.table("records")

# -------------------------
# HELPER: Get advice from local Ollama model or fallback
# -------------------------
OLLAMA_URL = "http://127.0.0.1:11434"  # Ollama default local server
OLLAMA_MODEL = "llama3.1:8b"  # exact model name from `ollama list`

def get_ollama_advice(prompt):
    try:
        print(f"\n[Ollama] Sending prompt to {OLLAMA_MODEL}...")
        print(f"[Ollama] Prompt length: {len(prompt)} characters")
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "options": {"temperature": 0.7, "top_p": 0.9, "max_tokens": 500},
            },
            timeout=120,
        )

        if response.status_code == 200:
            data = response.json()
            advice = data.get("response", "").strip()
            if advice:
                print(f"[Ollama] Generated advice: {len(advice)} characters")
                return advice
            else:
                print("[ERROR] Empty response from Ollama")
                return None
        else:
            print(f"[ERROR] Ollama API returned status: {response.status_code}")
            print("[Ollama] Raw response:", response.text[:500])
            return None
    except requests.exceptions.Timeout:
        print("[ERROR] Ollama request timed out")
        return None
    except requests.exceptions.ConnectionError:
        print("[ERROR] Cannot connect to Ollama. Is it running?")
        return None
    except Exception as e:
        print(f"[ERROR] Ollama call failed: {e}")
        return None

def get_fallback_advice(income, expenses, age, risk, allocation):
    """Generate fallback advice when Ollama is not available"""
    savings = income - expenses
    savings_rate = (savings / income) * 100 if income > 0 else 0

    advice_parts = []

    # Savings rate advice
    if savings_rate < 10:
        advice_parts.append(
            f"Your savings rate is {savings_rate:.1f}%, which is quite low. Consider reducing expenses or increasing income."
        )
    elif savings_rate < 20:
        advice_parts.append(
            f"Your savings rate is {savings_rate:.1f}%, which is moderate. Try to increase it to 20% or more for better financial security."
        )
    else:
        advice_parts.append(
            f"Great! Your savings rate is {savings_rate:.1f}%, which is excellent for building wealth."
        )

    # Age-based advice
    if age < 30:
        advice_parts.append("Since you're young, you can afford to take more risks for higher long-term returns.")
    elif age < 50:
        advice_parts.append("You're in your prime earning years - focus on growth while maintaining some stability.")
    else:
        advice_parts.append("As you approach retirement, prioritize capital preservation and stable returns.")

    # Risk-based advice
    if risk <= 2:
        advice_parts.append("Your conservative approach is good for capital preservation. Consider gradually increasing equity exposure for better long-term growth.")
    elif risk == 3:
        advice_parts.append("Your balanced approach provides good growth potential while managing risk effectively.")
    else:
        advice_parts.append("Your aggressive approach can generate higher returns, but ensure you have an emergency fund and can handle market volatility.")

    # Allocation-specific advice
    sip_pct = (allocation.get("SIP", 0) / savings) * 100 if savings > 0 else 0
    fd_pct = (allocation.get("FD", 0) / savings) * 100 if savings > 0 else 0
    stocks_pct = (allocation.get("Stocks", 0) / savings) * 100 if savings > 0 else 0

    advice_parts.append(f"Your recommended allocation: {sip_pct:.0f}% SIP, {fd_pct:.0f}% FD, {stocks_pct:.0f}% Stocks. This balances growth, stability, and liquidity based on your risk profile.")

    return " ".join(advice_parts)

def get_enhanced_advice(income, expenses, age, risk, allocation, kb_context=""):
    """Generate enhanced advice combining multiple sources"""
    advice_parts = []

    # Get contextual advice
    context_advice = get_investment_advice_context(income, expenses, age, risk, allocation)
    advice_parts.append(context_advice)

    # Add knowledge base context if available
    if kb_context:
        advice_parts.append(f"Based on financial knowledge: {kb_context}")

    # Add specific allocation advice
    savings = income - expenses
    if savings > 0:
        sip_pct = (allocation.get("SIP", 0) / savings) * 100
        fd_pct = (allocation.get("FD", 0) / savings) * 100
        stocks_pct = (allocation.get("Stocks", 0) / savings) * 100

        advice_parts.append(f"Your recommended allocation: {sip_pct:.0f}% SIP for systematic investing, {fd_pct:.0f}% FD for safety, and {stocks_pct:.0f}% stocks for growth. This balanced approach helps manage risk while building wealth over time.")

    # Add market timing advice
    advice_parts.append("Remember: Time in the market beats timing the market. Start investing early and stay consistent with your SIPs regardless of market conditions.")

    return " ".join(advice_parts)

# -------------------------
# ROUTES
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(force=True)
    if not payload:
        return jsonify({"msg": "No JSON payload provided"}), 400

    # Parse user input
    try:
        income = float(payload.get("income", 0))
        expenses = float(payload.get("expenses", 0))
        age = int(payload.get("age", 0))
        risk = int(payload.get("risk", 3))
    except Exception as e:
        print("[ERROR] Invalid input:", e)
        return jsonify({"msg": "Invalid input types"}), 400

    if any(v < 0 for v in [income, expenses, age]) or not (1 <= risk <= 5):
        return jsonify({"msg": "Invalid values"}), 400

    # -------------------------
    # Enhanced ML Allocation with Live Data
    # -------------------------
    try:
        allocation = enhanced_ml_advisor.predict_enhanced_allocation(income, expenses, age, risk)
        print(f"[INFO] Using enhanced ML allocation with market conditions")
    except Exception as e:
        print("[WARN] Enhanced ML model not available, trying basic model:", e)
        try:
            allocation = predict_allocation(income, expenses, age, risk)
        except Exception as e2:
            print("[WARN] Basic ML model not loaded, using fallback allocation:", e2)
            allocation = {"SIP": income * 0.3, "FD": income * 0.3, "Stocks": income * 0.4, "Total": income}

    # Save record
    record_id = len(records_table) + 1
    records_table.insert({
        "id": record_id,
        "income": income,
        "expenses": expenses,
        "age": age,
        "risk": risk,
        "sip": allocation.get("SIP", 0),
        "fd": allocation.get("FD", 0),
        "stocks": allocation.get("Stocks", 0),
        "created_at": datetime.utcnow().isoformat()
    })

    # -------------------------
    # KB Context
    # -------------------------
    try:
        kb_ctx = retrieve(f"Recommended strategy for user: income {income}, expenses {expenses}, age {age}, risk {risk}", top_k=3)
        kb_text = "\n\n".join([f"{k['source']}: {k['text']}" for k in kb_ctx])
    except Exception as e:
        print("[ERROR] KB retrieval failed:", e)
        kb_text = ""

    # -------------------------
    # Build enhanced prompt for Ollama
    # -------------------------
    savings = income - expenses
    savings_rate = (savings / income) * 100 if income > 0 else 0

    prompt = f"""You are an expert financial advisor with 20+ years of experience. Provide personalized investment advice based on the following user profile:

USER PROFILE:
- Monthly Income: ₹{income:,.0f}
- Monthly Expenses: ₹{expenses:,.0f}
- Monthly Savings: ₹{savings:,.0f} ({savings_rate:.1f}% savings rate)
- Age: {age} years
- Risk Tolerance: {risk}/5 ({'Conservative' if risk <= 2 else 'Moderate' if risk == 3 else 'Aggressive'})

ML-PREDICTED ALLOCATION:
- SIP (Systematic Investment Plan): ₹{allocation['SIP']:,.0f} ({allocation['SIP']/savings*100:.0f}% of savings)
- Fixed Deposits: ₹{allocation['FD']:,.0f} ({allocation['FD']/savings*100:.0f}% of savings)
- Stocks/Equity: ₹{allocation['Stocks']:,.0f} ({allocation['Stocks']/savings*100:.0f}% of savings)

FINANCIAL KNOWLEDGE CONTEXT:
{kb_text}

INSTRUCTIONS:
1. Analyze the user's financial situation and risk profile
2. Explain why this allocation makes sense for their age and risk tolerance
3. Provide specific actionable advice for each investment category
4. Mention any risks or considerations
5. Keep the advice practical and easy to understand
6. Use a professional but friendly tone
7. Limit response to 4-6 sentences

Generate personalized investment advice:"""

    # -------------------------
    # Get enhanced advice with stock recommendations
    # -------------------------
    try:
        user_profile = {
            'income': income,
            'expenses': expenses,
            'age': age,
            'risk_tolerance': risk
        }
        stock_recommendations = enhanced_ml_advisor.get_stock_recommendations(user_profile, limit=5)

        advice = enhanced_ml_advisor.generate_investment_advice(user_profile, allocation, stock_recommendations)
        allocation['stock_recommendations'] = stock_recommendations

    except Exception as e:
        print(f"[WARN] Enhanced advice generation failed: {e}")
        advice = get_ollama_advice(prompt)
        if not advice:
            print("[INFO] Using enhanced fallback advice system")
            advice = get_enhanced_advice(income, expenses, age, risk, allocation, kb_text)

    return jsonify({"allocation": allocation, "advice": advice})

# ---------------------------------------
# 1️⃣ GOAL-BASED PLANNING
# ---------------------------------------
@app.route("/goal-plan", methods=["POST"])
def goal_plan():
    data = request.get_json(force=True)
    goal_name = data.get("goal_name")
    goal_cost = float(data.get("goal_cost", 0))
    years = int(data.get("years", 1))
    expected_return = 0.12  # 12% average SIP return

    if goal_cost <= 0 or years <= 0:
        return jsonify({"error": "Invalid values"}), 400

    months = years * 12
    monthly_rate = expected_return / 12

    try:
        # SIP formula:  FV = SIP * [((1+r)^n -1)/r]
        sip_needed = goal_cost / (((1 + monthly_rate)**months - 1) / monthly_rate)
    except:
        sip_needed = goal_cost / months

    return jsonify({
        "goal_name": goal_name,
        "goal_cost": goal_cost,
        "years": years,
        "monthly_sip_required": round(sip_needed, 2),
        "message": f"To achieve '{goal_name}', invest ₹{round(sip_needed,2)} per month."
    })

# ---------------------------------------
# 2️⃣ EXPENSE ANALYZER
# ---------------------------------------
@app.route("/expense-analyze", methods=["POST"])
def expense_analyzer():
    data = request.get_json(force=True)
    income = float(data.get("income", 0))
    expenses = float(data.get("expenses", 0))

    if income <= 0:
        return jsonify({"error": "Income must be greater than 0"}), 400

    savings = income - expenses
    savings_rate = (savings / income) * 100

    suggestions = []
    if savings_rate < 10:
        suggestions.append("Your savings rate is low — reduce discretionary spending.")
    elif savings_rate < 20:
        suggestions.append("Moderate savings — try budgeting 50-30-20 rule.")
    else:
        suggestions.append("Excellent savings habit — increase SIP amount for faster growth!")

    return jsonify({
        "income": income,
        "expenses": expenses,
        "savings": savings,
        "savings_rate": round(savings_rate, 2),
        "suggestions": suggestions
    })

# ---------------------------------------
# 3️⃣ FINANCIAL HEALTH SCORE
# ---------------------------------------
@app.route("/health-score", methods=["POST"])
def financial_health_score():
    data = request.get_json(force=True)
    income = float(data.get("income", 0))
    expenses = float(data.get("expenses", 0))
    age = int(data.get("age", 0))
    risk = int(data.get("risk", 3))

    savings = income - expenses
    savings_rate = (savings / income * 100) if income > 0 else 0

    # Score components
    score = 0
    score += min(40, savings_rate * 2)         # max 40 points
    score += 30 if risk >= 3 else 20           # risk profile
    score += 30 if age < 40 else 20            # age advantage

    category = (
        "Needs Improvement 😟" if score < 40 else
        "Growing Investor 🚀" if score < 70 else
        "Smart Wealth Builder 💰"
    )

    return jsonify({
        "score": round(score),
        "category": category,
        "savings_rate": round(savings_rate, 2),
        "message": f"Your Financial Health Score is {round(score)} — {category}"
    })

# ---------------------------------------
# 4️⃣ BEGINNER LEARNING HUB
## 4️⃣ BEGINNER LEARNING HUB
# ---------------------------------------
@app.route("/learning-hub", methods=["GET"])
def learning_hub():
    topics = get_learning_topics()
    return jsonify({"topics": topics})

# -------------------------
# History & Report
# -------------------------
@app.route("/history", methods=["GET"])
def history():
    user_records = records_table.all()
    user_records.sort(key=lambda r: r["created_at"], reverse=True)
    return jsonify(user_records)

@app.route("/report/<int:rec_id>", methods=["GET"])
def get_report(rec_id):
    record = next((r for r in records_table.all() if r["id"] == rec_id), None)
    if not record:
        return jsonify({"msg": "Not found"}), 404

    allocation = {
        "SIP": record["sip"],
        "FD": record["fd"],
        "Stocks": record["stocks"],
        "Total": record["sip"] + record["fd"] + record["stocks"]
    }
    user_info = {
        "income": record["income"],
        "expenses": record["expenses"],
        "age": record["age"],
        "risk": record["risk"]
    }

    report_path = create_report(
        allocation, user_info, advice="See dashboard",
        out_path=os.path.join(UPLOADS_DIR, f"report_{rec_id}.pdf")
    )
    return send_file(report_path, as_attachment=True)

# ---------------------------------------
# 5️⃣ GOAL MANAGEMENT (works with React Goal Wizard)
# ---------------------------------------
goals_table = db.table("goals")

def serialize_goal(g):
    # return a shallow copy and attach 'id' from tinydb document id
    try:
        copy = dict(g)
    except Exception:
        copy = g or {}
    copy["id"] = getattr(g, "doc_id", copy.get("id"))
    return copy

# CREATE GOAL
@app.route("/api/goals", methods=["POST"])
@app.route("/api/goals/", methods=["POST"])
def create_goal_api():
    data = request.get_json(force=True) or {}

    # sanitize inputs and provide defaults
    name = data.get("name", "Unnamed Goal")
    try:
        target = float(data.get("target", 0)) if data.get("target") is not None else 0
    except Exception:
        target = 0
    try:
        months = int(data.get("months", 0))
    except Exception:
        months = 0
    try:
        currentSaved = float(data.get("currentSaved", 0))
    except Exception:
        currentSaved = 0
    risk = data.get("risk", "Medium")
    try:
        sip = int(data.get("sip", 0))
    except Exception:
        sip = 0

    goal_id = goals_table.insert({
        "name": name,
        "target": target,
        "months": months,
        "currentSaved": currentSaved,
        "risk": risk,
        "sip": sip,
        "projection": data.get("projection", []),
        "milestones": data.get("milestones", []),
        "createdAt": datetime.utcnow().isoformat(),
    })

    goal = goals_table.get(doc_id=goal_id)
    return jsonify(serialize_goal(goal)), 201

# Backward-compatible simple save (some frontends used /goals)
@app.route("/goals", methods=["POST"])
@app.route("/goals/", methods=["POST"])
def save_goal_simple():
    data = request.get_json(force=True) or {}

    goal_id = goals_table.insert({
        "name": data.get("name", "Unnamed Goal"),
        "target": data.get("target", 0),
        "months": data.get("months", 0),
        "currentSaved": data.get("currentSaved", 0),
        "risk": data.get("risk", "Medium"),
        "sip": data.get("sip", 0),
        "projection": data.get("projection", []),
        "milestones": data.get("milestones", []),
        "createdAt": datetime.utcnow().isoformat(),
    })

    return jsonify({"status": "ok", "goal_id": goal_id}), 201

# GET ALL GOALS
@app.route("/api/goals", methods=["GET"])
@app.route("/api/goals/", methods=["GET"])
def get_goals_api():
    all_goals = [serialize_goal(g) for g in goals_table.all()]
    return jsonify(all_goals)

# UPDATE GOAL
@app.route("/api/goals/<int:goal_id>", methods=["PUT"])
@app.route("/api/goals/<int:goal_id>/", methods=["PUT"])
def update_goal_api(goal_id):
    data = request.get_json(force=True) or {}
    goals_table.update(data, doc_ids=[goal_id])
    return jsonify({"message": "Goal updated successfully"})

# DELETE GOAL
@app.route("/api/goals/<int:goal_id>", methods=["DELETE"])
@app.route("/api/goals/<int:goal_id>/", methods=["DELETE"])
def delete_goal_api(goal_id):
    goals_table.remove(doc_ids=[goal_id])
    return jsonify({"message": "Goal deleted successfully"})
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    question = data.get("question", "")

    # Build advanced prompt
    prompt = f"""
    You are an AI financial advisor. User asked:
    {question}

    Give simple, practical financial guidance.
    """

    # 🔥 Use your existing llama / fallback system
    answer = get_ollama_advice(prompt)

    if not answer:
        answer = "I'm here to help! Try asking about SIP, FD, or investment planning."

    return jsonify({"answer": answer})

# MAIN
# -------------------------
if __name__ == "__main__":
    print(f"TinyDB path: {DB_FILE}")
    app.run(port=5500, debug=True)
