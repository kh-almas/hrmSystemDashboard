import Axios from "axios";

// Create an axios instance with your baseURL

const axios = Axios.create({
  baseURL: "https://hrm-system-backend.vercel.app",
  // baseURL: "http://localhost:5000",
});

// Set default headers for the axios instance
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access-token");
// "Bearer " + document.cookie?.split(";")?.find((cookie) => cookie?.includes("token"))?.split("=")[1];
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
// "Bearer " + localStorage.getItem("access-token");

export default axios;
