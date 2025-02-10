import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./slices/hotelsSlice";
import destinationReducer from "./slices/destinationSlice"
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        destination: destinationReducer,
        languages: languageReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;