import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const destinationUrl = process.env.REACT_APP_DESTINATION_GET_URL ?? "";

type Destination = {
    id: number;
    value: number;
    label: string;
    img: string;
  }

export const fetchDestination = createAsyncThunk<
    Destination[],
    string,
    { rejectValue: string }
>(
    "destination/fetchDestination",
    async (lang = "en", { rejectWithValue }) => {
        try {
            const response = await axios.get(`${destinationUrl}?lang=${lang}`);
            return response.data;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
);
