import { createAsyncThunk } from "@reduxjs/toolkit";

const destinationUrl = 'http://localhost:3001/destination'

export const fetchDestination = createAsyncThunk('destination/fetchDestination', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(destinationUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch destination');
        }

        return await response.json();
    } catch (e) {
        return rejectWithValue(e.message || 'Failed to fetch destination');
    }
});