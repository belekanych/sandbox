import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

// Define a type for the slice state
interface State {
  currentUser: User | null;
}

// Define the initial state using that type
const initialState: State = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
  },
});

export const { setCurrentUser } = authSlice.actions;

export const { selectCurrentUser } = authSlice.selectors;

export default authSlice.reducer;
