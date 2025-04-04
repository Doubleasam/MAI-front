import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // send cookies to the server
  Credentials: "include", // send cookies to the server
});

export default axiosInstance;