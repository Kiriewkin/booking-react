import React, { useState, useEffect } from "react";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { Row, Col, Button, Popover } from "antd";
import HotelsItem from "../Hotels/HotelsItem";
import { useNavigate } from "react-router-dom";

export default function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = getLocalStorage("likes") || [];
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
            <Popover
                content="Favorites cleared!"
                open={showPopover}
                placement="bottom"
            >
                <Button onClick={clearFavorites} style={{marginBottom: 15}}>Clear Favorites</Button>
            </Popover>
            <Row gutter={[16, 32]}>
                {favorites.map((hotel) => (
                    <Col key={`${hotel.id}--${hotel.name}`} span={8}>
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
