import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const destinationUrl = process.env.REACT_APP_DESTINATION_GET_URL;

export const fetchDestination = createAsyncThunk('destination/fetchDestination', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(destinationUrl);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});
