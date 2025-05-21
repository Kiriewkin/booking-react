import React, { useState, useEffect } from "react";
import { Card, Popover, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { t } from "i18next";

import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { HotelProps, Hotel } from "../../types/hotels";

import "./index.scss";

const HotelsItem: React.FC<HotelProps> = ({ hotel }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = getLocalStorage<Hotel[]>("likes", []);
        const isInFavorites = storedFavorites.some((likedHotel) => likedHotel.id === hotel.id);
        setIsFavorite(isInFavorites);
    }, [hotel.id]);

    const handleLike = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        const storedFavorites = getLocalStorage<Hotel[]>("likes", []);
        let updatedFavorites: Hotel[];

        if (isFavorite) {
            updatedFavorites = storedFavorites.filter((likedHotel) => likedHotel.id !== hotel.id);
        } else {
            updatedFavorites = [...storedFavorites, hotel];
        }

        setLocalStorage("likes", updatedFavorites);
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        navigate(`/booking-react/hotel/${hotel.name}`);
    };

    return (
        <Card onClick={handleCardClick} hoverable style={{ height: "100%" }}>
            <img src={hotel.img} alt="Hotel" style={{ width: "100%", height: "50%" }} />
            <p className="hotel-title">{hotel.name}</p>
            <p className="hotel-address">Address: {hotel.address}</p>
            <p className="hotel-city">City: {hotel.city}</p>
            <p className="hotel-country-code">Country Code: {hotel.country_code}</p>
            {hotel.phone_number && <a href={`tel:${hotel.phone_number}`} className="hotel-phone">Phone: {hotel.phone_number}</a>}
            {hotel.website && <a href={`${hotel.website}`} className="hotel-website">Website</a>}
            <p className="hotel-country-code">{t("priceForNight")} {hotel.price}$</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
                <Popover
                    placement="bottomRight"
                    content={isFavorite ? "Delete from favorites" : "Add to favorites"}
                >
                    {isFavorite ? (
                        <HeartFilled
                            style={{
                                fontSize: "32px",
                                color: "red",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onClick={handleLike}
                        />
                    ) : (
                        <HeartOutlined
                            style={{
                                fontSize: "32px",
                                color: "#1890ff",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onClick={handleLike}
                        />
                    )}
                </Popover>
            </div>
        </Card>
    );
}

export default HotelsItem