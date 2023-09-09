import Axios from "axios";

// Create an axios instance with your baseURL
const axios = Axios.create({
  baseURL: "https://dashboard-hrm-system-backend.vercel.app/",
  // baseURL: "http://localhost:5000/",
});

// Set default headers for the axios instance
axios.defaults.headers.common["Authorization"] =
  "Bearer " + document.cookie?.split(';')?.find(cookie => cookie?.includes('token'))?.split('=')[1];
  // "Bearer " + localStorage.getItem("access-token");

export default axios;