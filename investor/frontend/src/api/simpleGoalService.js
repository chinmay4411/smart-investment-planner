import axios from "axios";

export const saveGoalSimple = (goal) => {
  return axios.post(
    "https://smartinvestmentplanner-11.onrender.com/goals",
    goal
  );
};
