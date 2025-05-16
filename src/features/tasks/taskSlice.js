import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const server = "http://localhost:8000/api/tasks";

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(server, {
        method: "GET",
        signal: thunkAPI.signal,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task) => {
    try {
      const response = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => {
    try {
      await fetch(`${server}/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateTaskReminder = createAsyncThunk(
  "tasks/updateTaskReminder",
  async (task) => {
    const updatedTask = { ...task, reminder: !task.reminder };

    try {
      const response = await fetch(`${server}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)



const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks = action.payload

      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks.push(action.payload)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(updateTaskReminder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, reminder: action.payload.reminder }
            : task
        );
      })
  } 
})

export default taskSlice.reducer