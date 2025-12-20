// src/api/goalService.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://smartinvestmentplanner-11.onrender.com",
});


// CREATE goal  
export const saveGoal = (goal) => API.post("/", goal);

// GET all goals  
export const getGoals = () => API.get("/");

// DELETE goal  
export const deleteGoal = (id) => API.delete(`/${id}`);

// UPDATE goal  
export const updateGoal = (id, updatedGoal) => API.put(`/${id}`, updatedGoal);
