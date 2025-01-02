import { createSlice } from "@reduxjs/toolkit";
import { fetchHotels, handleCitySelection } from "../thunks/hotelsThunk";

const initialState = {
  hotels: [],
  city: [],
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
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleCitySelection.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleCitySelection.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.city = action.payload;
      })
      .addCase(handleCitySelection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export const { resetCity } = hotelsSlice.actions;
export default hotelsSlice.reducer;
