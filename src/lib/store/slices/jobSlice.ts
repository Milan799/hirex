import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios/axiosClientInstance";

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async (
        params: { keyword?: string; location?: string; skip?: number; limit?: number; employerId?: string },
        { rejectWithValue }
    ) => {
        try {
            // Backend base URI strips /api/auth, leaving /api, so this calls /api/jobs
            const res = await axiosClient.get("/jobs", { params });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        total: 0,
        status: "idle",
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload.jobs;
                state.total = action.payload.total;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default jobSlice.reducer;
