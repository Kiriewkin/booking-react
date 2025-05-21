import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal, Form, Input, Rate, message } from "antd";
import axios from "axios";

import { RootState, AppDispatch } from "../../store";
import { Hotel } from "../../types/hotels";
import { fetchReservedHotel, fetchHotelById } from "../../store/thunks/hotelsThunk";
import { setUser } from "../../store/slices/authSlice";

interface UserInfo {
    name: string;
    email: string;
    picture?: string;
    id: string;
    reviews?: number[];
}

interface UserProps {
    user: UserInfo | null;
}

const ReservedList: React.FC<UserProps> = ({ user }) => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const reservedHotels = useSelector((state: RootState) => state.hotels.reservedHotels?.favoriteHotels || []);
    const [hotelData, setHotelData] = useState<Hotel[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const loading = useSelector((state: RootState) => state.hotels.loading);
    const error = useSelector((state: RootState) => state.hotels.error);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);

    useEffect(() => {
        dispatch(fetchReservedHotel());
    }, [dispatch]);

    useEffect(() => {
        if (reservedHotels.length > 0) {

            const fetchHotels = async () => {
                try {
                    const hotelData = await Promise.all(
                        reservedHotels.map((hotel: Hotel) => {
                            const hotelId = typeof hotel === 'number' ? hotel : hotel.id;
                            return dispatch(fetchHotelById({ id: hotelId, lang: currentLang }));
                        })
                    );

                    const hotels = hotelData.map((action: any) => action.payload);
                    setHotelData(hotels);
                } catch (err) {
                    console.error("Error loading hotel data:", err);
                }
            };
            fetchHotels();
        }
    }, [reservedHotels, currentLang, dispatch]);

    const showModal = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        setRating(0);
        setComment("");
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (!selectedHotel) return;

        const review = {
            id: Date.now(),
            firstName: user?.name,
            userId: user?.id,
            rating,
            date: new Date().toISOString().split("T")[0],
            comment
        };

        try {
            const response = await axios.post(`http://localhost:3001/hotels/${selectedHotel.id}/reviews`, {
                review
            });

            console.log("Review submitted:", response.data);
            message.success(`${t("reviewSubmitted")} ${selectedHotel.name}`);
        } catch (error: any) {
            console.error("Ошибка при отправке отзыва:", error?.response?.data || error.message);
            message.error(`${t("reviewSubmitError") || "Помилка надсилання відгуку"}`);
        } finally {
            await dispatch(fetchReservedHotel());

            if (!user) return;

            const updatedUser = await axios.get(`http://localhost:3001/users/${user.id}`);
            const token = localStorage.getItem("token");
            dispatch(setUser({ user: updatedUser.data, token }));
            setIsModalVisible(false);
        }

    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (loading) return <p>Loading reserved hotels...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(hotelData)
    console.log(user)

    const hasUserReviewed = (hotel: Hotel): boolean => {
        if (!user?.reviews || !hotel.reviews) return false;

        const userReviewIds = user.reviews;
        return hotel.reviews.some(review => userReviewIds.includes(review.id));
    };


    return (
        <div>
            <h2>{t("reservedHotels")}</h2>
            {hotelData.length > 0 ? (
                <ul>
                    {hotelData.map((hotel, index) => (
                        <li key={index}>
                            {t("hotelName")}: {hotel.name} | {t("city")}: {hotel.city} —
                            <Button
                                style={{ marginLeft: "10px" }}
                                onClick={() => showModal(hotel)}
                                disabled={hasUserReviewed(hotel)}
                            >
                                {t("addReview")}
                            </Button>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reserved hotels.</p>
            )}
            <Modal
                title={t("addReviewModal")}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={t("submit")}
                cancelText={t("cancel")}
            >
                <Form layout="vertical">
                    <Form.Item label={t("rating")}>
                        <Rate value={rating} onChange={setRating} />
                    </Form.Item>
                    <Form.Item label={t("comment")}>
                        <Input.TextArea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ReservedList;