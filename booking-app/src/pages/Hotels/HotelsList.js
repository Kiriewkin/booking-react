import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "antd";

import HotelsItem from "./HotelsItem";

export default function HotelsList() {
    const { city } = useParams();
    const hotels = useSelector((state) => state.hotels.hotels);
    const cityHotels = useSelector((state) => state.hotels.city);

    const hotelsToRender = city ? cityHotels : hotels;

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    
    return (
        <Row gutter={[16, 32]}>
            {hotelsToRender.map((hotel) => (
                <Col key={`${hotel.id}--${hotel.name}`} span={8}>
                    <HotelsItem hotel={hotel} />
                </Col>
            ))}

            {hotelsToRender.length === 0 && (
                <div className="no-hotels-container">
                    <p className="no-hotels-message">{city ? `In ${city} no hotels!` : "No hotels available!"}</p>
                    <Button onClick={goBack}>Back</Button>
                </div>
            )}
        </Row>
    );
}
