import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Popover } from "antd";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";
import HotelsItem from "../Hotels/HotelsItem";

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

export default function FavoritesList() {
    const [favorites, setFavorites] = useState<Hotel[]>([]);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = getLocalStorage<Hotel[]>("likes", []);
        setFavorites(storedFavorites);
    }, []);

    const clearFavorites = () => {
        clearLocalStorage("likes");
        setFavorites([]);
        setShowPopover(true);
        setTimeout(() => setShowPopover(false), 2000);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Popover content="Favorites cleared!" open={showPopover} placement="bottom">
                <Button onClick={clearFavorites} style={{ marginBottom: 15 }}>
                    Clear Favorites
                </Button>
            </Popover>
            <Row gutter={[16, 32]}>
                {favorites.map((hotel) => (
                    <Col key={`${hotel.id}--${hotel.name}`} xs={24} sm={12} md={8}>
                        <HotelsItem hotel={hotel} />
                    </Col>
                ))}
            </Row>

            {favorites.length === 0 && (
                <div className="no-hotels-container">
                    <p className="no-hotels-message">No favorite</p>
                    <Button onClick={goBack}>Back</Button>
                </div>
            )}
        </div>
    );
}
