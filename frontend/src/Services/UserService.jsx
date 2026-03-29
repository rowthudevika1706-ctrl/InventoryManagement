import axios from "axios";

const BASE_URL = "http://localhost:9191/invent";

export const getUserDetails = () => {
  return axios.get(`${BASE_URL}/login`, { withCredentials: true });
};