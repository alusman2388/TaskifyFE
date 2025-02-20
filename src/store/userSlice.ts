import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  name: String;
  email: String;
  password: String;
  roles: String;
}
const initialState: UserState = {
  name: "",
  email: "",
  password: "",
  roles: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state: any,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      console.log("hiii--->", field, "value:::", value, "stateee ", state);
      state[field] = value; // Update the specific field in the state
    },
    signupSuccess: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.roles = "";
    },
  },
});
export const { setUserData, signupSuccess } = userSlice.actions;

export default userSlice.reducer;
