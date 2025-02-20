import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    img: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User, token: string | null }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            if (action.payload.token) {
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
