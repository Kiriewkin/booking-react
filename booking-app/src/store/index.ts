import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./slices/hotelsSlice";
import destinationReducer from "./slices/destinationSlice"

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        destination: destinationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;