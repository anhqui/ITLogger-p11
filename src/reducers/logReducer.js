import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
  loading: false,
  current: null,
  error: null,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
});

export const {} = logSlice.actions;

export default logSlice.reducer;
