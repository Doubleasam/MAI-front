import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://mai-backend-g0ayt50vt-doubleasams-projects.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;