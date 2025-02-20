import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser, logout } from "../slices/authSlice";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    name: string;
}

const registerUrl = process.env.REACT_APP_REGISTER_POST_URL ?? "";
const loginUrl = process.env.REACT_APP_LOGIN_POST_URL ?? "";
const updateUrl = process.env.REACT_APP_UPDATE_POST_URL ?? "";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData: LoginData, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(loginUrl, loginData);
            const { user, token } = response.data;
            dispatch(setUser({ user, token }));
            return response.data;
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (registerData: RegisterData, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(registerUrl, registerData);
            const { user, token } = response.data;

            dispatch(setUser({ user, token }));
            return response.data;
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        dispatch(logout());
    }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async (formData: FormData, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(updateUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const { user } = response.data;
            dispatch(setUser({ user, token }));
            return user;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
);

