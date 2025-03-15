import { useEffect, useState } from "react";
import { fetchReservedHotel, fetchHotelById } from "../../store/thunks/hotelsThunk";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ReservedList() {
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
    };

    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const reservedHotels = useSelector((state: RootState) => state.hotels.reservedHotels?.favoriteHotels || []);
    const [hotelData, setHotelData] = useState<Hotel[]>([]);
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const error = useSelector((state: RootState) => state.hotels.error);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);

    useEffect(() => {
        dispatch(fetchReservedHotel());
    }, [dispatch]);

    useEffect(() => {
        if (reservedHotels.length > 0) {

            const fetchHotels = async () => {
                try {
                    const hotelData = await Promise.all(
                        reservedHotels.map((hotel: Hotel) => {
                            const hotelId = typeof hotel === 'number' ? hotel : hotel.id;
                            return dispatch(fetchHotelById({ id: hotelId, lang: currentLang }));
                        })
                    );

                    const hotels = hotelData.map((action: any) => action.payload);
                    setHotelData(hotels);
                } catch (err) {
                    console.error("Error loading hotel data:", err);
                }
            };


            fetchHotels();
        }
    }, [reservedHotels, currentLang, dispatch]);

    if (loading) {
        return <p>Loading reserved hotels...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>{t("reservedHotels")}</h2>
            {hotelData.length > 0 ? (
                <ul>
                    {hotelData.map((hotel, index) => (
                        <li key={index}>Hotel Name: {hotel.name} City: {hotel.city}</li>
                    ))}
                </ul>
            ) : (
                <p>No reserved hotels.</p>
            )}
        </div>
    );
}
