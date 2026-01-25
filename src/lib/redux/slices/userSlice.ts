import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "@/lib/axios/axiosClientInstance";

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async ({payload, onSuccess,onError}, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/posts",{ params: payload});
      onSuccess(res.data);
      return res.data;
    } catch (err: any) {
      if (err.message === "UNAUTHORIZED") {
        return rejectWithValue("Session expired");
      }
      onError(err);
      return rejectWithValue(err.response?.data);
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
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
