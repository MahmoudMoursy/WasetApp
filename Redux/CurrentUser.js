import { createSlice } from "@reduxjs/toolkit";

export const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    value: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = action.payload;
    },
    deleteCurrentUser: (state) => {
      state.value =null;
    },
  },
});

export const { setCurrentUser,deleteCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;