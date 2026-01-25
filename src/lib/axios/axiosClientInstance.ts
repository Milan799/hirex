"use client";

import axios from "axios";
import { attachAbortController, clearAbortController } from "./abortManager";
import { handleLogout } from "./logout";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 20000,
});

// REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return attachAbortController(config);
  },
  (error) => Promise.reject(error)
);

// RESPONSE
axiosClient.interceptors.response.use(
  (response) => {
    clearAbortController(response.config);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn("Request cancelled:", error.message);
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
