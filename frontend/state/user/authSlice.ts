import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authFormTypes } from "@/types";
import { getUserInformation, loginSubmit, logout } from "@/lib/auth";

type userType = {
  name: string;
  email: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: boolean;
};

const initialState: userType = {
  name: "",
  email: "",
  isAuthenticated: false,
  loading: true,
  error: false,
};

export const loginAsync = createAsyncThunk<
  userType,
  authFormTypes,
  { rejectValue: string }
>("auth/loginAsync", async (authFormTypes, thunkAPI) => {
  try {
    const user = await loginSubmit(authFormTypes);
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message ?? error);
  }
});

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
        state.loading = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log(action.payload ?? "SOmething went wrong");
        throw new Error(action.payload ?? "Something went wrong");
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
        console.log(action.payload ?? "SOmething went wrong");
        state.error = true;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.name = "";
        state.email = "";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload ?? "SOmething went wrong");
        state.error = true;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
