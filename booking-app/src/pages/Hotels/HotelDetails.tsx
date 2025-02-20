import { Card, Rate, Spin, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { RootState, AppDispatch } from "../../store";
import { handleHotelSelection } from "../../store/thunks/hotelsThunk";
import { saveHotelToUserDB } from "../../store/thunks/hotelsThunk";

import "./index.scss";

export default function HotelsDetails() {
    const { name } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const hotel = useSelector((state: RootState) => state.hotels.selectedHotel);
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);

    useEffect(() => {
        if (name) {
            dispatch(handleHotelSelection({ name, lang: currentLang }));
        }
    }, [dispatch, name, currentLang]);

    const handleAddToFavorites = () => {
        if (hotel?.id) {
            dispatch(saveHotelToUserDB(hotel.id))
                .unwrap()
                .then(() => {
                    message.success("Added");
                })
                .catch((error) => {
                    if(error === "Hotel is already reserved"){
                        message.error("Hotel is already reserved");
                    } else if(error === "Error adding hotel to favorites"){
                        message.error("Error adding hotel to favorites")
                    } else {
                        message.error(error as string);
                    }
                    
                });
        } else {
            message.error("Hotel ID is missing");
        }
    };
    


    if (loading) {
        return (
            <div className="loading">
                <Spin size="large" />
                <p>Loading hotel details...</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="no-data-container">
                <p>No hotel details available.</p>
            </div>
        );
    }

    return (
        <Card hoverable style={{ height: "100%" }}>
            <img src={hotel.img} alt="Hotel" style={{ width: 300, height: 200 }} />
            <p className="hotel-title">{hotel.name}</p>
            <p className="hotel-address">Address: {hotel.address}</p>
            <p className="hotel-city">City: {hotel.city}</p>
            <p className="hotel-country-code">Country Code: {hotel.country_code}</p>
            {hotel.phone_number && <a href={`tel:${hotel.phone_number}`} className="hotel-phone">Phone: {hotel.phone_number}</a>}
            {hotel.website && <a href={`${hotel.website}`} className="hotel-website">Website</a>}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
                <Button onClick={handleAddToFavorites}>Reserve</Button>
            </div>
        </Card>
    );
}
