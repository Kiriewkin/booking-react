import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Hotel } from "../../types/hotels";

const hotelsUrl = process.env.REACT_APP_HOTELS_GET_URL ?? "";
const addHotel = process.env.REACT_APP_ADD_HOTEL_TO_PROFILE_POST_URL ?? "";
const reservedHotel = process.env.REACT_APP_RESERVED_HOTELS_POST_URL ?? "";
const hotelUrl = process.env.REACT_APP_HOTEL_GET_URL ?? "";

type City = {
    id: number;
    value: number;
    label: string;
    img: string;
}

export const fetchHotels = createAsyncThunk<
    { hotels: Hotel[]; total: number },
    { lang: string; sortOrder: string; page: number },
    { rejectValue: string }
>(
    "hotels/fetchHotels",
    async ({ lang = "en", sortOrder, page}, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${hotelsUrl}?lang=${lang}&sort=${sortOrder}&page=${page}`
            );
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
);

export const handleCitySelection = createAsyncThunk<
    { hotels: City[]; total: number },
    { city: string; lang: string; sortOrder: string; page: number },
    { rejectValue: string }
>(
    'hotels/handleCitySelection',
    async ({ city, lang, sortOrder, page }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelsUrl}/city/${city}?lang=${lang}&sort=${sortOrder}&page=${page}`);
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

export const saveHotelToUserDB = createAsyncThunk(
    'hotels/saveHotelToUserDB',
    async (hotelId: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(addHotel, { hotelId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)

export const fetchReservedHotel = createAsyncThunk(
    'hotels/fetchreservedHotel',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(reservedHotel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
)


export const fetchHotelById = createAsyncThunk<
    Hotel,
    { id: number, lang: string },
    { rejectValue: string }
>(
    'hotels/fetchHotelById',
    async ({ id, lang }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${hotelUrl}/${id}?lang=${lang}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);
