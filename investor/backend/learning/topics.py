# topics.py
# ---------------------------
# Comprehensive Learning Hub topics (Beginner -> Advanced)
# Returns a list of topic dicts with title, level, image, description and HTML details
# ---------------------------

from tkinter import Y


def get_learning_topics():
    topics = [
        {
            "title": "What is SIP?",
            "level": "beginner",
            "image": "https://imgs.search.brave.com/MZaCeUcMii4KbdQUFPT1CeCMzWibR76L50SSVAoi5VI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXhpc2JhbmsuY29t/L2ltYWdlcy9kZWZh/dWx0LXNvdXJjZS9w/cm9ncmVzcy13aXRo/LXVzX25ldy90b3At/Ny1iZW5lZml0cy1v/Zi1zaXAuanBn",
            "description": "Systematic Investment Plan: invest a fixed amount monthly to build wealth steadily.",
            "details": """
                <h2>📘 What is SIP?</h2>
                <p>SIP stands for Systematic Investment Plan, a disciplined method of investing a fixed amount regularly into mutual funds at intervals such as monthly or quarterly, rather than investing a lump sum all at once. This approach helps investors build wealth gradually by leveraging the power of compounding and rupee cost averaging, where more units are bought when the Net Asset Value (NAV) is low and fewer when it is high, thereby reducing the average cost per unit over time. SIPs are automated, convenient, and flexible, allowing investors to start with small amounts—sometimes as low as ₹100 per month—and adjust or stop contributions based on their financial situation. They are particularly effective for long-term financial goals, promoting investment discipline and reducing the stress of market timing..</p>

                <h3>✅ Benefits</h3>
                <ul>
                Key Benefits
                <li>Rupee Cost Averaging
By investing regularly, SIPs reduce the average cost per unit over time. This strategy minimizes the risk of investing a large sum at a market peak and helps cushion against market volatility.</li>
                <li>Power of Compounding
Returns earned on investments also generate returns over time. The longer the investment horizon, the greater the potential for wealth accumulation, making SIPs ideal for long-term goals like retirement or children's education.</li>
                 <li>Disciplined Investing
Automation fosters financial discipline, turning investing into a consistent habit without the need to time the market.</li>
                  <li>Flexibility and Convenience
Investors can start, pause, increase, or decrease contributions based on cash flow. SIPs can begin with small amounts—sometimes as low as ₹500—making them accessible to a wide range of investors.</li>
                   <li>Types of SIPs
Top-Up SIP (Step-Up SIP): Allows periodic increases in investment amount, ideal for salaried individuals expecting income growth.
Flexible SIP (Flex SIP): Permits variable investment amounts based on cash flow or market outlook.
Perpetual SIP: Continues indefinitely without a fixed end date, offering full control over redemption.
Trigger SIP: Enables setting conditions (e.g., market index levels) to initiate additional investments or partial redemptions.</li>
                </ul>

                <h3>📈 Example (quick)</h3>
                <p>₹1,000/month for 10 years at 12% → ~₹2.3L (you invest ₹1.2L)</p>

                <h3>🔧 Tips</h3>
                <ul>
                  <li>Keep SIPs running through market ups and downs</li>
                  <li>Prefer direct plans for lower expense ratio</li>
                </ul>
                  <h3>Important Considerations</h3>
                <ul>
                  <li>Market Risk: SIPs do not guarantee returns; performance depends on the underlying mutual fund.
Scheme Selection Risk: Choosing an unsuitable or poorly managed fund can impact returns.
No Protection in Bear Markets: While rupee cost averaging helps, it doesn't prevent losses during prolonged market downturns.</li>
               
                </ul>

                <h3>🔁 Visual: Rupee-Cost Averaging</h3>
                <img src="https://imgs.search.brave.com/UY6xxAZQtikjwrQeu-BgqCa9S-ubcriv1NH2Wp93pk0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucGJjZG4uaW4v/Y2RuL2ltYWdlcy9i/dS9pbnZlc3RtZW50/L2ZlYXR1cmVzLW9m/LXNpcC1pbnZlc3Rt/ZW50LXBsYW5zLW5l/dy1kZXNrdG9wLnBu/Zw" alt="Rupee cost averaging" style="width:100%;border-radius:8px;"/>
            """
        },
   
{
    "title": "What Are Mutual Funds?",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/Mq5gpt_nvTx8iz2rE0xIOvZ-n9MqIEj1a28mNucbbgY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tdXR1/YWwtZnVuZHMtZmlu/YW5jZS1tb25leS1j/b25jZXB0LWZvY3Vz/LW11dHVhbC1mdW5k/LWludmVzdGluZy1p/bnRlcm5ldC1kYXRh/LXRlY2hub2xvZ3kt/ODI3MzcyODkuanBn",
    "description": "Mutual funds pool money from many investors and invest in diversified assets like equity, debt, or hybrid instruments.",
    "details": """
        <h2>📘 What Are Mutual Funds?</h2>
        <p>
        A mutual fund is a professionally managed investment vehicle that collects money from multiple investors 
        and invests it into a diversified portfolio of securities such as equity shares, bonds, government securities, 
        or a combination of these. Investors receive units of the mutual fund, and the value of each unit is calculated 
        as the NAV (Net Asset Value). Diversification lowers risk and allows even small investors to invest with ease.
        </p>

        <h3>🧩 Key Features</h3>
        <ul>
            <li><b>Diversification:</b> Spreads risk across multiple assets.</li>
            <li><b>Professional Management:</b> Experts manage the portfolio.</li>
            <li><b>Low Minimum Investment:</b> Start with as low as ₹100.</li>
            <li><b>Liquidity:</b> Easy to buy and redeem units (except ELSS).</li>
            <li><b>Regulated by SEBI:</b> Ensures investor protection.</li>
        </ul>

        <h3>📊 Types of Mutual Funds</h3>
        <ul>
            <li><b>Equity Funds:</b> High risk, high return; invest in shares.</li>
            <li><b>Debt Funds:</b> Low risk; invest in bonds and fixed-income instruments.</li>
            <li><b>Hybrid Funds:</b> Combination of equity + debt.</li>
            <li><b>Index Funds:</b> Track indices like NIFTY 50 or Sensex.</li>
            <li><b>ELSS Funds:</b> Tax-saving funds with 3-year lock-in.</li>
        </ul>

        <h3>📉 How Mutual Funds Work (Flowchart)</h3>
        <img src="https://imgs.search.brave.com/mHwY5QaXVawfv9BcZmsbXli-NnI8bDTeu7Uuw_7H8sU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y29ycG9yYXRlZmlu/YW5jZWluc3RpdHV0/ZS5jb20vYXNzZXRz/L211dHVhbC1mdW5k/cy5wbmc"
             alt="Mutual fund flowchart"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>💡 Why Investors Choose Mutual Funds</h3>
        <ol>
            <li>Convenience and ease of investing.</li>
            <li>Low cost compared to directly buying stocks.</li>
            <li>Suitable for both beginners and advanced investors.</li>
            <li>Better risk control due to diversification.</li>
        </ol>

        <h3>⚠️ Risks</h3>
        <ul>
            <li>Market risk affecting NAV.</li>
            <li>Interest rate risk (for debt funds).</li>
            <li>Credit risk if bonds default.</li>
            <li>High expense ratio in some schemes.</li>
        </ul>

        <h3>📈 Example</h3>
        <p>
        If you invest ₹2,000 per month in an equity mutual fund giving 12% annual returns,  
        after 15 years your corpus becomes <b>~₹10.40 Lakhs</b> (total invested = ₹3.6 Lakhs).
        </p>

        <h3>✨ Final Summary</h3>
        <p>
        Mutual funds are ideal for beginners because they offer diversification, professional management, 
        and long-term wealth creation with controlled risk.
        </p>
    """
},


   {
    "title": "Introduction to Stocks",
    "level": "intermediate",
    "image": "https://imgs.search.brave.com/XM7x5AP8zhhxHdaCCZhGyU3nYLjiRJQlDYN6misyPos/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zMy5h/cC1zb3V0aC0xLmFt/YXpvbmF3cy5jb20v/am1mc3dlYnNpdGUv/dXBsb2Fkcy9tZWRp/YS8yMDI1LzYvMy9t/ZWRpYV8xNzQ4OTMy/Mzg1MDQ5LmpwZw",
    "description": "Stocks represent ownership in a company. Learn how they create wealth.",
    "details": """
        <h2>📘 What Are Stocks?</h2>
        <p>
        Stocks represent partial ownership in a company. When you buy a stock, you become a 
        shareholder and own a piece of the business. As the company grows, its stock price 
        increases, allowing you to profit.
        </p>

        <h3>💰 How You Earn From Stocks</h3>
        <ul>
            <li><b>Capital Gains:</b> Stock price rises over time.</li>
            <li><b>Dividends:</b> Company profits shared with investors.</li>
        </ul>

        <h3>📉 Why Stock Prices Move</h3>
        <ul>
            <li>Company performance</li>
            <li>Market news</li>
            <li>Economic policy</li>
            <li>Global events</li>
        </ul>

        <h3>📈 Stock Market Flowchart</h3>
        <img src="https://imgs.search.brave.com/wIPQykxFf06NbuUWpVmjg9kYnuVJybfqcpuVAtEcSJM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzg0LzczLzI2/LzM2MF9GXzM4NDcz/MjY0M19WUDZBUzFm/OE9jeG1vbVk4ZDFC/cENMdFJtTlJZUXdK/bC5qcGc"
             alt="stock flow" style="width:100%;border-radius:8px;" />

        <h3>📌 Beginner Tips</h3>
        <ul>
            <li>Start with blue-chip companies</li>
            <li>Avoid penny stocks</li>
            <li>Invest for long-term (5+ years)</li>
            <li>Never invest based on hype</li>
        </ul>

        <h3>⚠️ Risks</h3>
        <ul>
            <li>High volatility</li>
            <li>Company-specific risk</li>
            <li>Market crashes</li>
        </ul>

        <h3>✨ Example</h3>
        <p>
        If you invested ₹10,000 in Infosys in 1993,  
        today it would be worth <b>₹1.5+ Crore</b>.  
        Long-term investing creates wealth.
        </p>
    """
},
{
    "title": "What Are Index Funds?",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/k8jhAaAq_yVFxbC7Tyux8ts1wS-hrOPJWGl6d6gjQmg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/Ym9yLmZvcmJlcy5j/b20vdGh1bWJvci9m/aXQtaW4vOTAweDUx/MC9odHRwczovL3d3/dy5mb3JiZXMuY29t/L2Fkdmlzb3IvaW4v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvc2h1dHRlcnN0/b2NrXzU2OTYyOTIx/My1Dcm9wcGVkLTEu/anBn",
    "description": "Index funds passively track market indices like NIFTY 50 or Sensex, making them ideal for beginners.",
    "details": """
        <h2>📘 What Are Index Funds?</h2>
        <p>
        Index funds are mutual funds that aim to replicate the performance of a stock market index 
        such as <b>NIFTY 50</b> or <b>S&P BSE Sensex</b>. Instead of trying to outperform the market, 
        these funds simply follow the index. They buy the same stocks, in the same proportions, as the index.
        </p>

        <h3>🔍 Why Index Funds?</h3>
        <ul>
            <li>Low-cost: Very low expense ratio compared to active funds.</li>
            <li>Beginner-friendly: No need to analyze stocks.</li>
            <li>Low risk: Because they track large diversified indices.</li>
            <li>Market-matching returns: You get what the market delivers.</li>
        </ul>

        <h3>📊 How Index Funds Work (Flowchart)</h3>
        <img src="https://imgs.search.brave.com/sMLgDsY2hFog6HWK72WypSlOPsTZ0D0PacxaS-5LIrE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuYXNhbmEuYml6/L3RyYW5zZm9ybS9k/YWFiNjY1ZC03MzU5/LTQ0ZTctOTE3ZS01/MjI2NmY5YjNjZjcv/aW5saW5lLXByb2pl/Y3QtbWFuYWdlbWVu/dC13aGF0LWlzLWEt/Zmxvdy1jaGFydC0x/LTJ4P2lvPXRyYW5z/Zm9ybTpmaWxsLHdp/ZHRoOjI1NjAmZm9y/bWF0PXdlYnA"
             alt="index fund flowchart"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🧩 Example</h3>
        <p>
        If the <b>NIFTY 50</b> index grows by 10%, your index fund will also grow around 10% 
        (minus a small expense ratio).
        </p>

        <h3>📌 Types of Index Funds</h3>
        <ul>
            <li><b>NIFTY 50 Index Fund</b>  Tracks top 50 Indian companies.</li>
            <li><b>SENSEX Index Fund</b>  Tracks top 30 companies.</li>
            <li><b>NIFTY Next 50</b> Emerging large companies.</li>
            <li><b>International Index Funds</b>S&P 500, Nasdaq 100.</li>
        </ul>

        <h3>🏦 Cost Benefits</h3>
        <p>
        Index funds are <b>passive funds</b>, meaning they do not require expensive fund managers or 
        active research teams. This reduces the <b>expense ratio</b> significantly, increasing long-term returns.
        </p>

        <h3>⚠️ Risks</h3>
        <ul>
            <li>Market Risk – If the index falls, your fund falls too.</li>
            <li>No Outperformance – You only get market returns.</li>
            <li>Tracking Error – Small return difference vs index.</li>
        </ul>

        <h3>✨ Final Summary</h3>
        <p>
        Index funds are perfect for beginners because they offer low-cost investing, diversification, 
        and stable market returns without requiring deep financial knowledge.
        </p>
    """
},
{
    "title": "What is NAV?",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/bFOEKLmmtnnBv6c70q9PE91LJd0Aml4F0DojMVIED9k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aWNpY2liYW5rLmNv/bS9jb250ZW50L2Rh/bS9pY2ljaWJhbmsv/aW5kaWEvbWFuYWdl/ZC1hc3NldHMvaW1h/Z2VzL2Jsb2cvd2hh/dC1pcy1uYXYtZC53/ZWJw",
    "description": "NAV (Net Asset Value) represents the per-unit price of a mutual fund, calculated daily.",
    "details": """
        <h2>📘 What is NAV?</h2>
        <p>
        NAV stands for <b>Net Asset Value</b>. It is the price of one unit of a mutual fund.
        Every mutual fund is divided into units, and the value of each unit is determined 
        once every day after the market closes. NAV helps investors know how many units 
        they will get when they invest.
        </p>

        <h3>📌 Formula for NAV</h3>
        <p style="font-size:18px; font-weight:bold;">
            NAV = (Total Assets – Total Liabilities) ÷ Total Number of Units
        </p>

        <p>
        It reflects the <b>current market value</b> of all the assets the fund holds.
        </p>

        <h3>📊 Example (Simple)</h3>
        <ul>
            <li>Total Value of Fund Assets = ₹100 Crores</li>
            <li>Total Fund Liabilities = ₹2 Crores</li>
            <li>Total Units = 10 Crores</li>
        </ul>

        <p><b>So, NAV = (100 – 2) / 10 = ₹9.8 per unit</b></p>

        <h3>🔁 How NAV is Calculated Daily (Flowchart)</h3>
        <img src="https://imgs.search.brave.com/8jSCbadbfma-i_Xi0CQj75XYj8Mp_dtM61FR2RuDLv0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y29uY2VwdGRyYXcu/Y29tL0hvdy1Uby1H/dWlkZS9waWN0dXJl/L01BUktFVElORy1U/YXJnZXQtYW5kLUNp/cmN1bGFyLURpYWdy/YW1zLVRoZS1Jbm5v/dmF0aW9uLUxpZmUt/Q3ljbGUucG5n"
             alt="NAV flowchart"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🧠 Why NAV Matters?</h3>
        <ul>
            <li><b>Determines how many units you get</b> when you invest.</li>
            <li><b>Used to track fund performance.</b></li>
            <li><b>Helps compare different mutual funds.</b></li>
        </ul>

        <h3>📌 Common Misconception</h3>
        <p>
        A <b>lower NAV does NOT mean the fund is cheaper</b> or better.  
        NAV only represents unit price, not fund quality.
        </p>

        <h3>⚠️ Important Points for Beginners</h3>
        <ul>
            <li>NAV changes daily based on market movement.</li>
            <li>SIP investments are purchased at the day's NAV.</li>
            <li>High NAV ≠ Expensive fund; Low NAV ≠ Cheap fund.</li>
            <li>Returns depend on percentage growth, not NAV value.</li>
        </ul>

        <h3>✨ Final Summary</h3>
        <p>
        NAV simply tells you the value of one unit of a mutual fund.  
        It helps calculate how many units you get, but it <b>does not indicate performance</b>.  
        The fund's underlying assets and long-term returns matter much more.
        </p>
    """
},
{
    "title": "Types of Mutual Funds",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/oM3MCppeO71XUE-EZlYybAzaVIruRFZA6xA0WCGg7g4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c21hbGxjYXNlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wNS9TRU9fVHlw/ZXMtb2YtTXV0dWFs/LUZ1bmRzLnBuZz94/NTc3OTg",
    "description": "Mutual funds can be equity, debt, hybrid, index, ELSS, sectoral, and more. Each type has different risk and return levels.",
    "details": """
        <h2>📘 Types of Mutual Funds</h2>
        <p>
        Mutual funds are categorized based on where they invest—equity, debt, hybrid, or specific themes/sectors. 
        Understanding these types helps investors choose the right fund based on risk, return expectations, and financial goals.
        </p>

        <h3>📊 Visual Overview</h3>
        <img src="https://imgs.search.brave.com/fxXK6xgitXVn271poBAysL3eHMDGJg9fklWLkBSeMSo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cmFtc2V5c29sdXRp/b25zLm5ldC9tZWRp/YS9ibG9nL3JldGly/ZW1lbnQvaW52ZXN0/aW5nL2NvbW1vbi10/eXBlcy1vZi1tdXR1/YWwtZnVuZHMucG5n"
             alt="types of mutual funds"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🔍 1️⃣ Equity Mutual Funds</h3>
        <p>Invest primarily in stocks (shares of companies). Suitable for long-term goals.</p>
        <ul>
            <li>High return potential</li>
            <li>High risk (market volatility)</li>
            <li>Best for 5+ years investment horizon</li>
        </ul>

        <b>Sub-categories:</b>
        <ul>
            <li>Large Cap Funds – Stable, less volatile</li>
            <li>Mid Cap Funds – Balance of risk and return</li>
            <li>Small Cap Funds – High risk, high return</li>
            <li>Multi Cap & Flexi Cap Funds</li>
            <li>Sector/Thematic Funds (IT, Pharma, Banking)</li>
        </ul>

        <h3>🔍 2️⃣ Debt Mutual Funds</h3>
        <p>Invest in bonds, government securities, treasury bills, corporate debt.</p>
        <ul>
            <li>Low-to-moderate risk</li>
            <li>Stable returns</li>
            <li>Good for short-term goals (1–3 years)</li>
        </ul>

        <b>Debt categories:</b>
        <ul>
            <li>Liquid Funds</li>
            <li>Short Duration Funds</li>
            <li>Corporate Bond Funds</li>
            <li>Gilt Funds (Govt bonds)</li>
        </ul>

        <h3>🔍 3️⃣ Hybrid Mutual Funds</h3>
        <p>Invest in both equity + debt.</p>
        <ul>
            <li>Balanced risk</li>
            <li>Suitable for medium-term investors</li>
        </ul>

        <b>Types:</b>
        <ul>
            <li>Aggressive Hybrid – More equity</li>
            <li>Conservative Hybrid – More debt</li>
            <li>Dynamic Asset Allocation Funds</li>
        </ul>

        <h3>🔍 4️⃣ Index Funds</h3>
        <p>Passive funds that track indices such as NIFTY 50 or Sensex.</p>
        <ul>
            <li>Low cost</li>
            <li>Beginner-friendly</li>
            <li>Market returns</li>
        </ul>

        <h3>🔍 5️⃣ ELSS (Equity Linked Savings Scheme)</h3>
        <p>Tax-saving mutual funds with 3-year lock-in under Section 80C.</p>
        <ul>
            <li>High return potential</li>
            <li>Shortest lock-in among tax-saving options</li>
        </ul>

        <h3>🔍 6️⃣ Sectoral/Thematic Funds</h3>
        <p>Invest in a specific industry or theme (Banking, IT, Pharma, EVs).</p>
        <ul>
            <li>Very high risk</li>
            <li>Suitable only for experienced investors</li>
        </ul>

        <h3>📌 How to Choose the Right Type?</h3>
        <ul>
            <li><b>Short-term goals (up to 3 yrs):</b> Debt Funds</li>
            <li><b>Medium-term goals (3–5 yrs):</b> Hybrid Funds</li>
            <li><b>Long-term goals (5+ yrs):</b> Equity Funds / Index Funds</li>
            <li><b>Tax saving:</b> ELSS</li>
        </ul>

        <h3>⚠️ Risks to Consider</h3>
        <ul>
            <li>Equity funds → Market risk</li>
            <li>Debt funds → Interest rate & credit risk</li>
            <li>Sectoral funds → Concentration risk</li>
        </ul>

        <h3>✨ Summary</h3>
        <p>
        Mutual funds come in different types to match different financial goals. 
        Beginners should focus on equity, debt, hybrid, and index funds before exploring advanced categories.
        </p>
    """
},
{
    "title": "Power of Compounding",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/-5AzA-bwmEGZd0qS-AS1YG8a_Dpbrg-SOaZh7fbdJX0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ta3Qu/bmp3ZWJuZXN0Lmlu/L2hlYWRsZXNzL25q/d2VhbHRoX2Jsb2cv/YWRtaW4vdXBsb2Fk/cy9wb3dlcm9mY29t/cG91bmRpbmctYmxv/Zy5qcGc",
    "description": "Compounding means earning returns on your previous returns, helping your money grow exponentially over time.",
    "details": """
        <h2>📘 What is the Power of Compounding?</h2>
        <p>
        The <b>Power of Compounding</b> is the process where the money you invest earns returns,
        and then those returns themselves begin to earn more returns over time.  
        This creates a <b>snowball effect</b>, where wealth grows faster the longer you stay invested.
        </p>

        <h3>📌 Simple Definition</h3>
        <p><b>Compounding = Earning interest on interest.</b></p>

        <h3>💡 Why Compounding is Important?</h3>
        <ul>
            <li>Helps money grow exponentially, not linearly.</li>
            <li>Best results come with long-term investing.</li>
            <li>Even small amounts grow significantly over time.</li>
            <li>Works best when investments are consistent (like SIPs).</li>
        </ul>

        <h3>🔢 Example (Very Simple)</h3>
        <p>
        If you invest ₹10,000 at 10% interest annually:<br><br>
        Year 1: ₹10,000 → ₹11,000<br>
        Year 2: ₹11,000 → ₹12,100 (interest earned on both ₹10,000+₹1,000)<br>
        Year 3: ₹12,100 → ₹13,310<br>
        <b>This is compounding.</b>
        </p>

        <h3>📊 Visual: Compounding Growth Curve</h3>
        <img src="https://imgs.search.brave.com/2LPzAkVp6GhvXUO12nrwDBnW4ns0Zux_ciexYTerolY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdG9y/YWdlLmdvb2dsZWFw/aXMuY29tL2Utb2Jq/ZWN0LTQwOTAwMy5m/aXJlYmFzZXN0b3Jh/Z2UuYXBwL2V4cG9u/ZW50aWFsLWdyb3d0/aC1jdXJ2ZS1hbmFs/eXNpcy1uYXh3cjVn/Yi5qcGc"
             alt="compounding graph"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🔁 Formula for Compound Interest</h3>
        <p style="font-size:16px; font-weight:bold;">
            A = P (1 + r/n) <sup>n × t</sup>
        </p>
        <ul>
            <li>P = Principal amount</li>
            <li>r = Interest rate</li>
            <li>t = Time</li>
            <li>n = Number of compounding periods</li>
        </ul>

        <h3>📌 Rule of 72 (Shortcut)</h3>
        <p>
        To estimate how long your money takes to double:<br>
        <b>Time to Double = 72 ÷ Interest Rate</b><br><br>
        Example: At 12% return → 72 / 12 = <b>6 years</b>
        </p>

        <h3>🎯 Benefits of Compounding</h3>
        <ul>
            <li>Encourages long-term investing.</li>
            <li>Helps reach financial goals faster.</li>
            <li>Works best with SIPs and regular investments.</li>
            <li>Reduces need for large principal amounts.</li>
        </ul>

        <h3>📉 Flowchart: How Compounding Works</h3>
        <img src="https://imgs.search.brave.com/07ggyhSpQiw9lBbqKfaPa7JYr3ATVgB-PvQAx5bFc1U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iZXR0/ZXJleHBsYWluZWQu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy9p/bnRlcmVzdC9jb21w/b3VuZF9pbnRlcmVz/dC5wbmc"
             alt="compounding flowchart"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>⚠️ New Investor Mistakes</h3>
        <ul>
            <li>Stopping SIPs during market dips.</li>
            <li>Investing only for short term (less than 3 years).</li>
            <li>Expecting quick results.</li>
        </ul>

        <h3>✨ Final Summary</h3>
        <p>
        Compounding is the most powerful tool in investing.  
        The longer you stay invested, the more your money grows.  
        Start early, invest consistently, and let compounding work for you.
        </p>
    """
},{
    "title": "Rupee-Cost Averaging",
    "level": "beginner",
    "image": "https://imgs.search.brave.com/oMyOMMlo-BVDXFgaLbr7PZsBGtePwHjZ8suhSX_0ZQo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZXRpbWcuY29tL3Ro/dW1iL3dpZHRoLTMw/MCxoZWlnaHQtMjI1/LGltZ3NpemUtMTM1/NzY0LHJlc2l6ZW1v/ZGUtNzUsbXNpZC0x/MTgyNzkxODgvd2Vh/bHRoL3BlcnNvbmFs/LWZpbmFuY2UtbmV3/cy9ob3ctY2FuLXJ1/cGVlLWNvc3QtYXZl/cmFnaW5nLXdvcmst/d29uZGVycy1mb3It/YW4taW52ZXN0b3Iv/d2hhdC1pcy1ydXBl/ZS1jb3N0LWF2ZXJh/Z2luZy5qcGc",
    "description": "Rupee-Cost Averaging means investing a fixed amount regularly, helping you buy more units when prices are low and fewer when prices are high.",
    "details": """
        <h2>📘 What is Rupee-Cost Averaging?</h2>
        <p>
        Rupee-Cost Averaging (RCA) is an investment strategy where you invest a <b>fixed amount at regular intervals</b>
        (monthly/weekly), regardless of market conditions. This ensures you buy:
        <b>more units when prices are low</b> and <b>fewer units when prices are high</b>.
        </p>

        <h3>📌 Simple Example</h3>
        <p>
        You invest ₹1,000 every month:<br><br>
        Month 1: NAV = ₹50 → You get 20 units<br>
        Month 2: NAV = ₹40 → You get 25 units<br>
        Month 3: NAV = ₹25 → You get 40 units<br><br>
        <b>You buy more units when NAV is lower — this reduces your average cost.</b>
        </p>

        <h3>📉 Why It Works?</h3>
        <ul>
            <li>Averages out market ups and downs.</li>
            <li>Reduces the risk of entering the market at the wrong time.</li>
            <li>Ideal for volatile markets.</li>
            <li>Encourages disciplined investing.</li>
        </ul>

        <h3>📈 Visual: How Rupee-Cost Averaging Works</h3>
        <img src="https://imgs.search.brave.com/RT8w7k6SxAE-J5z33SCM3mQ_8jy_99raBwQXiioojxQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mYXN0/ZXJjYXBpdGFsLmNv/bS9pL1NJUC12cy0t/THVtcC1TdW0tLVVu/dmVpbGluZy10aGUt/QmVuZWZpdHMtb2Yt/U3lzdGVtYXRpYy1J/bnZlc3RtZW50LVBs/YW5zLS1UaGUtQWR2/YW50YWdlcy1vZi1T/SVBzLW92ZXItTHVt/cC1TdW0tSW52ZXN0/bWVudHMud2VicA"
             alt="RCA example"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🔁 Flowchart: Rupee-Cost Averaging Process</h3>
        <img src="https://imgs.search.brave.com/7mDQp6v8QZ9KXPyFp-EqeMfpoSvJ-cxuwuC2M2CBea8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mYXN0/ZXJjYXBpdGFsLmNv/bS9pL1NJUC12cy0t/THVtcC1TdW0tLVVu/dmVpbGluZy10aGUt/QmVuZWZpdHMtb2Yt/U3lzdGVtYXRpYy1J/bnZlc3RtZW50LVBs/YW5zLS1VbmRlcnN0/YW5kaW5nLVN5c3Rl/bWF0aWMtSW52ZXN0/bWVudC1QbGFucy0t/LVNJUHMtLS53ZWJw"
             alt="RCA flowchart"
             style="width:100%;border-radius:8px;margin:12px 0;" />

        <h3>🎯 Benefits</h3>
        <ul>
            <li><b>Lower average cost per unit</b> over time.</li>
            <li><b>Reduces emotional investing</b> (fear/greed).</li>
            <li><b>Works automatically through SIPs.</b></li>
            <li>Helps in long-term wealth creation.</li>
        </ul>

        <h3>📉 When is RCA most effective?</h3>
        <ul>
            <li>During volatile markets.</li>
            <li>When investing for long-term goals.</li>
            <li>When markets go through corrections.</li>
        </ul>

        <h3>⚠️ Limitations</h3>
        <ul>
            <li>Does not guarantee returns.</li>
            <li>May not maximize profit in a continuously rising market.</li>
            <li>Works best with disciplined long-term investing.</li>
        </ul>

        <h3>✨ Final Summary</h3>
        <p>
        Rupee-Cost Averaging reduces risk by spreading investments over time.  
        It automatically adjusts to market fluctuations and supports long-term wealth building.  
        This is why SIPs are the best way for beginners to start investing.
        </p>
    """
},


    ]
    return topics;
