import { store } from "../store";
import { fetchHotels } from "../store/thunks/hotelsThunk";

export const hotelsLoader = async () => {
    try {
        const lang = store.getState().languages.currentLang;
        const sortOrder = store.getState().hotels.sortOrder;
        const page = store.getState().hotels.currentPage;
        const result = store.dispatch(fetchHotels({ lang, sortOrder, page }));
        return (await result).payload;
    } catch (error) {
        console.error("Failed to load hotels:", error);
        throw new Error("Could not fetch hotels.");
    }
};