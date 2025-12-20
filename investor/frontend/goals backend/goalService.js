import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/goals",
  headers: { "Content-Type": "application/json" }
});

// Save goal
export const saveGoal = (goal) => API.post("/", goal);

// Get goals
export const getGoals = () => API.get("/");

// Delete goal
export const deleteGoal = (id) => API.delete(`/${id}`);

// Update goal
export const updateGoal = (id, goal) => API.put(`/${id}`, goal);

export default API;
