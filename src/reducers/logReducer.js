import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
  loading: false,
  current: null,
  error: null,
};

// Get logs from server
export const getLogs = createAsyncThunk("getLogs", async (name, thunkAPI) => {
  try {
    const res = await fetch("/api/logs");
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      });
  },
});

export const {} = logSlice.actions;

export default logSlice.reducer;
