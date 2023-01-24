import { IUser } from "@/intefaces/IUser";
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
  currentUser: IUser | null;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
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
      state.currentUser = action.payload;
      state.error = false;
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
    subscription: (state, action) => {
      if (state.currentUser?.suscribedUsers.includes(action.payload)) {
        state.currentUser.suscribedUsers.splice(
          state.currentUser.suscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser?.suscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut, subscription } = userSlice.actions;

export default userSlice.reducer;
