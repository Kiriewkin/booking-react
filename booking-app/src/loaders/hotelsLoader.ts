import { store } from "../store";
import { fetchHotels } from "../store/thunks/hotelsThunk";

export const hotelsLoader = async () => {
    try {
        const lang = store.getState().languages.currentLang;
        const result = store.dispatch(fetchHotels(lang));
        return (await result).payload;
    } catch (error) {
        console.error("Failed to load hotels:", error);
        throw new Error("Could not fetch hotels.");
    }
};