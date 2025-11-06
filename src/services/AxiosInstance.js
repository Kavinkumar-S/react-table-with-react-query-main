// src/api/AxiosInstance.js
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
});

// Optional: Add request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or modify config before sending the request
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect on 401)
    if (error.response && error.response.status === 401) {
      // Example: Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
