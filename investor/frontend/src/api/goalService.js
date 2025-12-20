import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 best practice
});

// CREATE goal
export const saveGoal = (goal) => API.post("/goals", goal);

// GET all goals
export const getGoals = () => API.get("/goals");

// DELETE goal
export const deleteGoal = (id) => API.delete(`/goals/${id}`);

// UPDATE goal
export const updateGoal = (id, updatedGoal) =>
  API.put(`/goals/${id}`, updatedGoal);
