import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mai-backend-g0ayt50vt-doubleasams-projects.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  // Add any auth tokens here if needed
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    console.error("Backend error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Request error:", error.message);
  }
  return Promise.reject(error);
});

export default axiosInstance;