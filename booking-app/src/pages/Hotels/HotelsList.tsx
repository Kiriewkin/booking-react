import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "antd";
import { RootState } from "../../store";

import HotelsItem from "./HotelsItem";
import { Review } from "../../types/hotels";

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
    price: number;
    reviews: Review[];
};

export default function HotelsList() {
    const { city } = useParams();
    const { hotels, city: cityHotels } = useSelector((state: RootState) => state.hotels);

    const hotelsToRender = city ? cityHotels : hotels;
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <Row gutter={[16, 32]}>
            {hotelsToRender
                .filter((hotel): hotel is Hotel => "name" in hotel)
                .map((hotel) => (
                    <Col key={`${hotel.id}--${hotel.name}`} xs={24} sm={12} md={8}>
                        <HotelsItem hotel={hotel} />
                    </Col>
                ))}

            {hotelsToRender.length === 0 && (
                <div className="no-hotels-container">
                    <p className="no-hotels-message">
                        {city ? `In ${city} no hotels!` : "No hotels available!"}
                    </p>
                    <Button onClick={goBack}>Back</Button>
                </div>
            )}
        </Row>
    );
}
