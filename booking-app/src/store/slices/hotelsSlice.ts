import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHotels, handleCitySelection, handleHotelSelection, fetchReservedHotel, fetchHotelById } from "../thunks/hotelsThunk";

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
  price: number;
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
  reservedHotels: {
    favoriteHotels: Hotel[];
  };
  hotelDetails: Hotel | null;
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string;
  sortOrder: string,
  currentPage: number,
  totalHotels: number,
  pageSize: number,
};

const initialState: HotelsState = {
  hotels: [],
  city: [],
  reservedHotels: {
    favoriteHotels: [],
  },
  hotelDetails: null,
  selectedHotel: null,
  loading: false,
  error: '',
  sortOrder: '-rating',
  currentPage: 1,
  totalHotels: 0,
  pageSize: 0
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    resetCity: (state) => {
      state.city = [];
      state.currentPage = 1;
      state.sortOrder = '-rating'
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<{ hotels: Hotel[]; total: number }>) => {
        state.loading = false;
        state.error = '';
        state.hotels = action.payload.hotels;
        state.totalHotels = action.payload.total
      })
      .addCase(fetchHotels.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch hotels";
      })
      .addCase(handleCitySelection.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleCitySelection.fulfilled, (state, action: PayloadAction<{hotels: City[], total: number}>) => {
        state.loading = false;
        state.error = '';
        state.city = action.payload.hotels;
        state.totalHotels = action.payload.total
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
      })
      .addCase(fetchReservedHotel.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchReservedHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.reservedHotels = action.payload;
      })
      .addCase(fetchReservedHotel.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reserved hotels";
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelDetails = action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch hotel details';
      });
  },
});

export const { resetCity, setSortOrder, setPage } = hotelsSlice.actions;
export default hotelsSlice.reducer;
