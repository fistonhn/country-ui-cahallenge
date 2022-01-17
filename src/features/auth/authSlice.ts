import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the auth slice
const initialState = {
  isLoading: false,
  error: "" as any,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { saveUser } = authSlice.actions;
export const userSelector = (state: any) => state.auth;

export default authSlice.reducer;
