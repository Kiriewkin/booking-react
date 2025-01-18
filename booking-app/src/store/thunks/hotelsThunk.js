import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const hotelsUrl = process.env.REACT_APP_HOTELS_GET_URL;

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(hotelsUrl);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});

export const handleCitySelection = createAsyncThunk('hotels/handleCitySelection', async (city, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${hotelsUrl}/city/${city}`);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});

export const handleHotelSelection = createAsyncThunk('hotels/handleHotelSelection', async (name, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${hotelsUrl}/name/${name}`);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});