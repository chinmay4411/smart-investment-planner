import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔍 Test connection (optional, keep during debugging)
API.get("/predict")
  .then(res => console.log("Backend response:", res.data))
  .catch(err => console.error("API error:", err));

// CREATE goal
export const saveGoal = (goal) => API.post("/goals", goal);

// GET all goals
export const getGoals = () => API.get("/goals");

// DELETE goal
export const deleteGoal = (id) => API.delete(`/goals/${id}`);

// UPDATE goal
export const updateGoal = (id, updatedGoal) =>
  API.put(`/goals/${id}`, updatedGoal);
