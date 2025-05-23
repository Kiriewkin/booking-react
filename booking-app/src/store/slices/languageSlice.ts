import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LanguageState = {
    currentLang: "en" | "ua";
};

const initialState: LanguageState = {
    currentLang: localStorage.getItem("currentLang") as "en" | "ua" || "en",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<LanguageState["currentLang"]>) => {
            state.currentLang = action.payload;
            localStorage.setItem("currentLang", action.payload);
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
