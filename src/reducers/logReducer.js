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
    // console.log(name);
    const res = await fetch("/api/logs");
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// Add new log
export const addLog = createAsyncThunk("addLog", async (log, thunkAPI) => {
  try {
    const res = await fetch("/api/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Delete log from server
export const deleteLog = createAsyncThunk("deleteLog", async (id, thunkAPI) => {
  try {
    const res = await fetch(`/api/logs/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Update log on server
export const updateLog = createAsyncThunk(
  "updateLog",
  async (log, thunkAPI) => {
    try {
      const res = await fetch(`/api/logs/${log.id}`, {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setCurrent(state, action) {
      state.current = action.payload;
    },
  },
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
      })
      .addCase(addLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.push(action.payload);
      })
      .addCase(addLog.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      })
      .addCase(deleteLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.filter((log) => log.id !== action.payload);
      })
      .addCase(deleteLog.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      })
      .addCase(updateLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        );
      })
      .addCase(updateLog.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      });
  },
});

export const { setCurrent } = logSlice.actions;

export default logSlice.reducer;
