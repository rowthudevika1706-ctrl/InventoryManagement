import axios from "axios";

const BASE_URL = "http://localhost:9191/dashboard";

export const getDashboardStats = () => {
  return axios.get(`${BASE_URL}/stats`);
};