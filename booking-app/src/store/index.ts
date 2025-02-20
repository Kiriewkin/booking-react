import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./slices/hotelsSlice";
import destinationReducer from "./slices/destinationSlice"
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        destination: destinationReducer,
        languages: languageReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;