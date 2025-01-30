import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const hotelsUrl = process.env.REACT_APP_HOTELS_GET_URL ?? "";

type Hotel = {
    id: number;
    name: string;
    city: string;
    address: string;
    state: string;
    country_code: string;
    hotel_rating: number;
    phone_number: string | null
    website: string | null;
    img: string;
};

type City = {
    id: number;
    value: number;
    label: string;
    img: string;
}

export const fetchHotels = createAsyncThunk<Hotel[], void, { rejectValue: string }>(
    'hotels/fetchHotels',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(hotelsUrl);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const handleCitySelection = createAsyncThunk<City[], string, { rejectValue: string }>(
    'hotels/handleCitySelection',
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelsUrl}/city/${city}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const handleHotelSelection = createAsyncThunk<Hotel[], string, { rejectValue: string }>(
    'hotels/handleHotelSelection',
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelsUrl}/name/${name}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);
