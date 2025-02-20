import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Auth/authSlice";
import signUpSlice from "../store/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
