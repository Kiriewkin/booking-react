import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Popover } from "antd";
import { useTranslation } from "react-i18next";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";
import HotelsItem from "../Hotels/HotelsItem";
import { Hotel } from "../../types/hotels";

export default function FavoritesList() {
    const [favorites, setFavorites] = useState<Hotel[]>([]);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation()

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
                    {t("clearfavorites")}
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
