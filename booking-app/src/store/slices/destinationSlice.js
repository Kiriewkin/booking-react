import { createSlice } from "@reduxjs/toolkit";
import { fetchDestination } from "../thunks/destinationThunk";

const initialState = {
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
      .addCase(fetchDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default destinationSlice.reducer;
