import axios from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://127.0.0.1:5500", // Update if your backend URL/port changes
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true,
});






// Add JWT token automatically if exists in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor to handle 401/403 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

// ⭐ Correct API functions
export const saveGoal = (goal) => API.post("/", goal);
export const getGoals = () => API.get("/");
export const deleteGoal = (id) => API.delete(`/${id}`);
export const updateGoal = (id, goal) => API.put(`/${id}`, goal);


export default API;
