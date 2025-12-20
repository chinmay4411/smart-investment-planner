import axios from "axios";

export const saveGoalSimple = (goal) => {
  return axios.post("http://localhost:5500/goals", goal);
};
