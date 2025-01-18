import { Card, Rate, Spin } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleHotelSelection } from "../../store/thunks/hotelsThunk";

export default function HotelsDetails() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const hotelArray = useSelector((state) => state.hotels.selectedHotel);
    const loading = useSelector((state) => state.hotels.loading);
    const hotel = hotelArray?.[0];

    useEffect(() => {
        if (name) {
            dispatch(handleHotelSelection(name));
        }
    }, [dispatch, name]);

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
        <Card hoverable style={{height: "100%"}}>
        <img src={hotel.img} alt="Hotel" style={{ width: 300, height: 200 }} />
        <p className="hotel-title">{hotel.name}</p>
        <p className="hotel-address">Address: {hotel.address}</p>
        <p className="hotel-city">City: {hotel.city}</p>
        <p className="hotel-country-code">Country Code: {hotel.country_code}</p>
        {hotel.phone_number && <a href={`tel:${hotel.phone_number}`} className="hotel-phone">Phone: {hotel.phone_number}</a>}
        {hotel.website && <a href={`${hotel.website}`} className="hotel-website">Website</a>}
        <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
    </Card>
    );
}
