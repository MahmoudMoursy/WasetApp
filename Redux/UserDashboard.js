import { createSlice } from "@reduxjs/toolkit";

export const UserDashboardSlice = createSlice({
  name: "UserDashboard",
  initialState: {
    value: null,
  },
  reducers: {
    setUserDashboard: (state, action) => {
      state.value = action.payload;
    },
    deleteUserDashboard: (state) => {
      state.value =null;
    },
  },
});

export const { setUserDashboard , deleteUserDashboard} = UserDashboardSlice.actions;
export default UserDashboardSlice.reducer;