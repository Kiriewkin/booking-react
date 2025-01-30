import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHotels, handleCitySelection, handleHotelSelection } from "../thunks/hotelsThunk";

type Hotel = {
  id: number;
  name: string;
  city: string;
  address: string;
  state: string;
  country_code: string;
  hotel_rating: number;
  phone_number: string | null;
  website: string | null;
  img: string;
};

type City = {
  id: number;
  value: number;
  label: string;
  img: string;
}

type HotelsState = {
  hotels: Hotel[];
  city: City[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string;
};

const initialState: HotelsState = {
  hotels: [],
  city: [],
  selectedHotel: null,
  loading: false,
  error: '',
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    resetCity: (state) => {
      state.city = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.loading = false;
        state.error = '';
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch hotels";
      })
      .addCase(handleCitySelection.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleCitySelection.fulfilled, (state, action: PayloadAction<City[]>) => {
        state.loading = false;
        state.error = '';
        state.city = action.payload;
      })
      .addCase(handleCitySelection.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch city";
      })
      .addCase(handleHotelSelection.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleHotelSelection.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.loading = false;
        state.error = '';
        state.selectedHotel = action.payload[0];
      })
      .addCase(handleHotelSelection.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch hotel";
      });
  },
});

export const { resetCity } = hotelsSlice.actions;
export default hotelsSlice.reducer;
