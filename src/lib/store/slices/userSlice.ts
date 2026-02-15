import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "@/lib/axios/axiosClientInstance";

// Backend auth routes: baseURL is http://localhost:5000/api → auth/*
const AUTH_BASE = "auth";
const AUTH_ENDPOINTS = {
  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
  requestOtp: `${AUTH_BASE}/request-otp`,
  verifyOtp: `${AUTH_BASE}/verify-otp`,
  resetPassword: `${AUTH_BASE}/reset-password`,
} as const;

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (
    { payload, onSuccess, onError }: { payload?: object; onSuccess?: (d: unknown) => void; onError?: (e: unknown) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.get("/posts", { params: payload });
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      const e = err as { message?: string; response?: { data?: unknown } };
      if (e.message === "UNAUTHORIZED") {
        return rejectWithValue("Session expired");
      }
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: {
      payload: { email: string; password: string };
      onSuccess?: (d: unknown) => void;
      onError?: (e: unknown) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(AUTH_ENDPOINTS.login, payload);
      const data = res.data as { token?: string; user?: unknown };
      if (data.token && typeof window !== "undefined") {
        window.localStorage.setItem("token", data.token);
      }
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      console.log("Login error:", err);
      const e = err as { message?: string; response?: { data?: unknown } };
      if (e.message === "UNAUTHORIZED") {
        return rejectWithValue("Session expired");
      }
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: {
      payload: { fullName: string; email: string; password: string; role?: string };
      onSuccess?: (d: unknown) => void;
      onError?: (e: unknown) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(AUTH_ENDPOINTS.register, payload);
      const data = res.data as { token?: string; user?: unknown };
      if (data.token && typeof window !== "undefined") {
        window.localStorage.setItem("token", data.token);
      }
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      const e = err as { message?: string; response?: { data?: unknown } };
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "user/requestOtp",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: {
      payload: { email: string };
      onSuccess?: (d: unknown) => void;
      onError?: (e: unknown) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(AUTH_ENDPOINTS.requestOtp, payload);
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } };
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: {
      payload: { email: string; otp: string };
      onSuccess?: (d: unknown) => void;
      onError?: (e: unknown) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(AUTH_ENDPOINTS.verifyOtp, payload);
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } };
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: {
      payload: { email: string; otp: string; password: string };
      onSuccess?: (d: unknown) => void;
      onError?: (e: unknown) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(AUTH_ENDPOINTS.resetPassword, payload);
      onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } };
      onError?.(err);
      return rejectWithValue(e.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
