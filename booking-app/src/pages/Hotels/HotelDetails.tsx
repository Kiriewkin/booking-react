import { Card, Rate, Spin, Button, Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { RootState, AppDispatch } from "../../store";
import { handleHotelSelection } from "../../store/thunks/hotelsThunk";

import ReviewCard from "./ReviewCard";

import "./index.scss";

export default function HotelsDetails() {
    const { name } = useParams();
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const hotel = useSelector((state: RootState) => state.hotels.selectedHotel);
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);

    useEffect(() => {
        if (name) {
            dispatch(handleHotelSelection({ name, lang: currentLang }));
        }
    }, [dispatch, name, currentLang]);

    const navigate = useNavigate();

    const navigateToPurchase = () => {
        if (hotel) navigate(`/booking-react/purchase/${hotel.name}`);
    };

    if (loading) {
        return (
            <div className="loading">
                <Spin size="large" />
                <p>{t("loadingHotelDetails")}</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="no-data-container">
                <p>{t("noHotelDetails")}</p>
            </div>
        );
    }

    const carouselSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        infinite: hotel.reviews && hotel.reviews.length > 3,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                <Card hoverable style={{ height: "100%" }}>
                    <img src={hotel.img} alt="Hotel" style={{ width: 300, height: 200 }} />
                    <p className="hotel-title">{hotel.name}</p>
                    <p className="hotel-address">Address: {hotel.address}</p>
                    <p className="hotel-city">City: {hotel.city}</p>
                    <p className="hotel-country-code">Country Code: {hotel.country_code}</p>
                    {hotel.phone_number && (
                        <a href={`tel:${hotel.phone_number}`} className="hotel-phone">
                            Phone: {hotel.phone_number}
                        </a>
                    )}
                    {hotel.website && (
                        <a href={`${hotel.website}`} className="hotel-website" target="_blank" rel="noreferrer">
                            Website
                        </a>
                    )}
                    <p className="hotel-price">
                        {t("priceForNight")} {hotel.price}$
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
                        <Button onClick={navigateToPurchase}>{t("reserve")}</Button>
                    </div>
                </Card>
            </div>
            <div>
                <h1 style={{ marginBottom: 20, fontSize: 24, paddingLeft: 24 }} className="h1-hotel">{t("hotelReviews")}:</h1>
                {hotel.reviews && hotel.reviews.length > 0 ? (
                    <Carousel {...carouselSettings}>
                        {hotel.reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </Carousel>
                ) : (
                    <p>{t("noReviews")}</p>
                )}
            </div>
        </div>
    );
}
