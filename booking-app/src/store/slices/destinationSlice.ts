import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDestination } from "../thunks/destinationThunk";

type Destination = {
  id: number;
  value: number;
  label: string;
  img: string;
}

type DestinationState = {
  destination : Destination[];
  loading: boolean;
  error: string;
}

const initialState: DestinationState = {
  destination: [],
  loading: false,
  error: '',
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestination.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.destination = action.payload;
      })
      .addCase(fetchDestination.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch destination";
      })
  },
});

export default destinationSlice.reducer;
