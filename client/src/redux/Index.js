import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        theme: "light",
        user: "",
        token: null,
        selectedHostel: {}
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = state.theme === "light-theme" ? "dark-theme" : "light-theme"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = "";
            state.token = null;
        },
        selectHostel: (state, action) => {
            state.selectedHostel = action.payload.hostel;
        }
    }
})

export const { setTheme, setLogin, setLogout, selectHostel } = authSlice.actions;
export default authSlice.reducer;
