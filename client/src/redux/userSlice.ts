import { IUser } from "@/intefaces/IUser";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  user: IUser | null;
  loading: boolean;
  error: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      return initialState;
      //? or you can say this way too
      //   state.user = null;
      //   state.loading = false;
      //   state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } = userSlice.actions;

export default userSlice.reducer;
