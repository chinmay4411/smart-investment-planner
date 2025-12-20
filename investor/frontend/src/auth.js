// auth.js

// Save token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token (for logout)
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect after logout
};

// Check if logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
