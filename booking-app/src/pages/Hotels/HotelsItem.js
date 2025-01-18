import React, { useState, useEffect } from "react";
import { Card, Popover, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import PropTypes from "prop-types";

import "./index.scss";

export default function HotelsItem({ hotel = { hotel_rating: 0, phone_number: null, website: null } }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = getLocalStorage("likes") || [];
        const isInFavorites = storedFavorites.some((likedHotel) => likedHotel.id === hotel.id);
        setIsFavorite(isInFavorites);
    }, [hotel.id]);

    const handleLike = (e) => {
        e.stopPropagation();
        const storedFavorites = getLocalStorage("likes") || [];
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = storedFavorites.filter((likedHotel) => likedHotel.id !== hotel.id);
        } else {
            updatedFavorites = [...storedFavorites, hotel];
        }

        setLocalStorage("likes", updatedFavorites);
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        navigate(`/hotel/${hotel.name}`);
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

HotelsItem.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country_code: PropTypes.string.isRequired,
        hotel_rating: PropTypes.number,
        phone_number: PropTypes.string,
        website: PropTypes.string,
    }).isRequired,
};
