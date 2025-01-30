import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const destinationUrl = process.env.REACT_APP_DESTINATION_GET_URL ?? "";

type Destination = {
    id: number;
    value: number;
    label: string;
    img: string;
  }

export const fetchDestination = createAsyncThunk<Destination[],void, { rejectValue: string } >(
    'destination/fetchDestination',
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(destinationUrl);
        return response.data;
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        return rejectWithValue(errorMessage);
    }
});
