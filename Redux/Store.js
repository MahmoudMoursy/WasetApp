import { configureStore, current } from "@reduxjs/toolkit";
import { CurrentUserSlice } from "./CurrentUser";
import { UserDashboardSlice } from "./UserDashboard";
export const store = configureStore({
    reducer: {
        currentUser : CurrentUserSlice.reducer,
        UserDashboard : UserDashboardSlice.reducer,
    }
});
export default store;