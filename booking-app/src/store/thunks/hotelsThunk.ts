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

export const fetchHotels = createAsyncThunk<
    Hotel[],
    string,
    { rejectValue: string }
>(
    'hotels/fetchHotels',
    async (lang = "en", { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelsUrl}?lang=${lang}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
)

export const handleCitySelection = createAsyncThunk<
    City[],
    { city: string; lang: string },
    { rejectValue: string }
>(
    'hotels/handleCitySelection',
    async ({ city, lang }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelsUrl}/city/${city}?lang=${lang}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const handleHotelSelection = createAsyncThunk<
    Hotel[],
    { name: string, lang: string },
    { rejectValue: string }>(
        'hotels/handleHotelSelection',
        async ({ name, lang }, { rejectWithValue }) => {
            try {
                const response = await axios.get(`${hotelsUrl}/name/${name}?lang=${lang}`);
                return response.data;
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
                return rejectWithValue(errorMessage);
            }
        }
    );

