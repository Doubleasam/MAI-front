import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mai-backend-g0ayt50vt-doubleasams-projects.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Add request interceptor to handle errors
axiosInstance.interceptors.request.use(
  config => {
    // You can add auth tokens here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error("Backend returned error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;