// src/api/goalService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5500/api/goals",
});


// CREATE goal  
export const saveGoal = (goal) => API.post("/", goal);

// GET all goals  
export const getGoals = () => API.get("/");

// DELETE goal  
export const deleteGoal = (id) => API.delete(`/${id}`);

// UPDATE goal  
export const updateGoal = (id, updatedGoal) => API.put(`/${id}`, updatedGoal);
