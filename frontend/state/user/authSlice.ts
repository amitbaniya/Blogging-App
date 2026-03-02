import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authFormTypes, userDataTypes } from "@/types";
import { getUserInformation, loginSubmit, logout, saveUser } from "@/lib/auth";

type userType = {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  bio: string;
  linkedin: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: boolean;
};

const initialState: userType = {
  _id: "",
  name: "",
  email: "",
  imageUrl: "string",
  bio: "",
  linkedin: "",
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

export const updateAsync = createAsyncThunk<
  userType,
  userDataTypes,
  { rejectValue: string }
>("auth/updateAsync", async (userDataTypes, thunkAPI) => {
  try {
    const user = await saveUser(userDataTypes);
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message ?? error);
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
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.bio = action.payload.bio;
        state.linkedin = action.payload.linkedin;
        state.imageUrl = action.payload.imageUrl;
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
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.bio = action.payload.bio;
        state.linkedin = action.payload.linkedin;
        state.imageUrl = action.payload.imageUrl;
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
        state.bio = "";
        state.linkedin = "";
        state.imageUrl = "";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload ?? "SOmething went wrong");
        state.error = true;
      })
      .addCase(updateAsync.pending, (state, action) => {
        const { name, email, bio, linkedin } = action.meta.arg;
        state.name = name;
        state.email = email;
        state.bio = bio;
        state.linkedin = linkedin;

        state.loading = true;
        state.error = false;
      })
      .addCase(updateAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        console.log(action.payload ?? "Something went wrong");
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
