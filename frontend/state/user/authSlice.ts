import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authFormTypes } from "@/types";
import { getUserInformation, loginSubmit, logout } from "@/lib/auth";

type userType = {
  name: string;
  email: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
};

const initialState: userType = {
  name: "",
  email: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk<userType, authFormTypes>(
  "auth/loginAsync",
  async (authFormTypes) => {
    try {
      const user = await loginSubmit(authFormTypes);
      return user;
    } catch (error) {
      console.log(error);
    }
  },
);

export const userAsync = createAsyncThunk<
  userType,
  void,
  { rejectValue: string }
>("auth/userAsync", async (_, thunkAPI) => {
  try {
    const user = await getUserInformation();
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutAsync = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutAsync", async (_, thunkAPI) => {
  try {
    const response = await logout();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(userAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(userAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        return initialState;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
