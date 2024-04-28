import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const authSlice = createSlice({
    name: "index",
    initialState: {
        theme: "light",
        user: "",
        token: null,
        selectedHostel: {},
        booking: {}
    },
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === "light-theme" ? "dark-theme" : "light-theme"
            toast.info((state.theme === "light-theme") ? "Theme changed to Light Mode" : "Theme changed to Dark Mode");
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = "";
            state.token = null;
            state.selectedHostel = {};
            state.booking = {};

            toast.info("User Logged out");
        },
        selectHostel: (state, action) => {
            state.selectedHostel = action.payload.hostel;
        },
        selectBooking: (state, action) => {
            state.booking = action.payload.booking;
        }
    }
})

export const { setTheme, setLogin, setLogout, selectHostel, selectBooking } = authSlice.actions;
export default authSlice.reducer;
