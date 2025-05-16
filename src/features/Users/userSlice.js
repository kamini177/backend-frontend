import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const server = "http://localhost:8000/api/users";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const register = createAsyncThunk("user/register", async (user) => {
  try {
    const response = await fetch(server, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      console.log(user);
      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Kirjautuminen epäonnistui")
      }
        
      return data;

    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Verkkovirhe kirjautuessa")
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Kirjautuminen epäonnistui";
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
