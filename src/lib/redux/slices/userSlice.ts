import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios/axiosClientInstance";

// ─── Async thunk: Axios call happens HERE, result goes into Redux state ───
export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (payload: Record<string, unknown> = {}, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/api/posts", { params: payload });
      return res.data;
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: unknown } };
      if (error.message === "UNAUTHORIZED") {
        return rejectWithValue("Session expired");
      }
      return rejectWithValue(error.response?.data ?? "Request failed");
    }
  }
);

// ─── Slice: Redux state for user (data + status) ───
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null as unknown,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
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

export default userSlice.reducer;
