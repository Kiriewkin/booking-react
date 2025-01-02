import { createAsyncThunk } from "@reduxjs/toolkit";

const hotelsUrl = 'http://localhost:3001/hotels'

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(hotelsUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch hotels');
        }

        return await response.json();
    } catch (e) {
        return rejectWithValue(e.message || 'Failed to fetch hotels');
    }
});

export const handleCitySelection = createAsyncThunk('hotels/handleCitySelection', async (city, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3001/hotels/${city}`);

        if (!response.ok) {
            throw new Error("Failed to fetch hotels");
        }

        return await response.json();
    } catch (e) {
        return rejectWithValue(e.message || 'Failed to fetch hotels');
    }
});