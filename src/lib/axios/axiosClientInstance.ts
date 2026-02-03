"use client";

import axios from "axios";
import { attachAbortController, clearAbortController } from "./abortManager";
import { handleLogout } from "./logout";

// Base URL only (e.g. http://localhost:5000) for /api/* routes; strip /api/auth if present
const raw = process.env.NEXT_PUBLIC_API_URL || "";
const baseURL = raw.replace(/\/api\/auth\/?$/, "") || raw;

const axiosClient = axios.create({
  baseURL,
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

// Public auth endpoints: do NOT trigger logout on 401/403 (e.g. wrong OTP on reset-password)
const isPublicAuthRequest = (url?: string) => {
  if (!url) return false;
  const path = typeof url === "string" ? url : (url as { pathname?: string }).pathname ?? "";
  return /(\/|^)auth\/(login|register|request-otp|verify-otp|reset-password)/i.test(path);
};

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
    const requestUrl = error.config?.url ?? "";

    if ((status === 401 || status === 403) && !isPublicAuthRequest(requestUrl)) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
