import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, Rate, Button, Input, DatePicker, InputNumber, message } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { handleHotelSelection } from "../../store/thunks/hotelsThunk";
import { AppDispatch, RootState } from "../../store";
import { saveHotelToUserDB } from "../../store/thunks/hotelsThunk";
import PaymentForm from "./PaymentForm";

import styles from "./index.module.scss";

export default function PurchaseForm() {
    type InitialValues = {
        name: string;
        surname: string;
        email: string;
        adults: number;
        children: number;
        rooms: number;
        checkInDate: any;
        checkOutDate: any;
    };

    const initialValues: InitialValues = {
        name: "",
        surname: "",
        email: "",
        adults: 1,
        children: 0,
        rooms: 1,
        checkInDate: null,
        checkOutDate: null,
    };

    const { name } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const hotel = useSelector((state: RootState) => state.hotels.selectedHotel);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);
    const { t } = useTranslation()
    const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (name) {
            dispatch(handleHotelSelection({ name, lang: currentLang }));
        }
    }, [dispatch, name, currentLang]);

    const handleCardClick = () => {
        navigate(`/booking-react/hotel/${hotel?.name}`);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required(t("nameRequired")).min(2, "Мінімум 2 символи"),
        surname: Yup.string().required(t("surnameRequired")).min(2, "Мінімум 2 символи"),
        email: Yup.string().required(t("emailRequired")).email("Некоректний email"),
        adults: Yup.number().min(1, t("min1Adult")).required(),
        children: Yup.number().min(0).required(),
        rooms: Yup.number().min(1, t("min1Room")).required(),
        checkInDate: Yup.mixed().required(t("selectInDate")),
        checkOutDate: Yup.mixed().required(t("selectOutDate")),
    });

    const saveToUserDb = () => {
        if (hotel?.id) {
            dispatch(saveHotelToUserDB(hotel.id))
                .unwrap()
                .catch((error) => {
                    if (error === "Hotel is already reserved") {
                        message.error("Hotel is already reserved");
                    } else if (error === "Error adding hotel to favorites") {
                        message.error("Error adding hotel to favorites")
                    } else {
                        message.error(error as string);
                    }

                });
        } else {
            message.error("Hotel ID is missing");
        }
    };

    if (!hotel) {
        return (
            <div className="no-data-container">
                <p>{t("noHotelDetails")}</p>
            </div>
        );
    }

    return (
        <div>
            <p className="h1-hotel">{t("bookingForm")}</p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "flex-start", marginTop: 15 }}>
                <Card onClick={handleCardClick} hoverable style={{ width: "200px", padding: "10px", flexGrow: 1 }}>
                    <img src={hotel.img} alt="Hotel" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
                    <p className="hotel-title" style={{ fontWeight: "bold", margin: "5px 0" }}>{hotel.name}</p>
                    <p className="hotel-city" style={{ fontSize: "12px", color: "#666" }}>City: {hotel.city}</p>
                    <p className="hotel-price" style={{ fontSize: "14px", fontWeight: "bold", margin: "5px 0" }}>{t("priceForNight")} {hotel.price}$</p>
                    <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
                </Card>
                <div style={{ flexGrow: 2 }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={() => {
                            setIsOpenPopUp(true)
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, values, setFieldValue }) => {
                            const nights = values.checkInDate && values.checkOutDate
                                ? dayjs(values.checkOutDate).diff(dayjs(values.checkInDate), "day")
                                : 0;

                            const totalPrice = nights * values.rooms * hotel.price;

                            return (
                                <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div>
                                        <label>{t("name")}</label>
                                        <Field as={Input} name="name" placeholder={t("enterYourName")} onChange={handleChange} value={values.name} />
                                        <ErrorMessage name="name" component="span" className={styles["error-message"]} />
                                    </div>

                                    <div>
                                        <label>{t("lastName")}</label>
                                        <Field as={Input} name="surname" placeholder={t("EnterYourSurname")} onChange={handleChange} value={values.surname} />
                                        <ErrorMessage name="surname" component="span" className={styles["error-message"]} />
                                    </div>

                                    <div>
                                        <label>{t("email")}</label>
                                        <Field as={Input} type="email" name="email" placeholder={t("enterYourEmail")} onChange={handleChange} value={values.email} />
                                        <ErrorMessage name="email" component="span" className={styles["error-message"]} />
                                    </div>

                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div>
                                            <label>{t("adults")}</label>
                                            <Field as={InputNumber} min={1} name="adults" onChange={(value: number | null) => setFieldValue("adults", value)} />
                                            <ErrorMessage name="adults" component="span" className={styles["error-message"]} />
                                        </div>

                                        <div>
                                            <label>{t("children")}</label>
                                            <Field as={InputNumber} min={0} name="children" onChange={(value: number | null) => setFieldValue("children", value)} />
                                            <ErrorMessage name="children" component="span" className={styles["error-message"]} />
                                        </div>

                                        <div>
                                            <label>{t("rooms")}</label>
                                            <Field as={InputNumber} min={1} name="rooms" onChange={(value: number | null) => setFieldValue("rooms", value)} />
                                            <ErrorMessage name="rooms" component="span" className={styles["error-message"]} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div>
                                            <label>{t("checkInDate")}</label>
                                            <DatePicker onChange={(date) => setFieldValue("checkInDate", date)} />
                                            <ErrorMessage name="checkInDate" component="div" className={styles["error-message"]} />
                                        </div>

                                        <div>
                                            <label>{t("checkOutDate")}</label>
                                            <DatePicker onChange={(date) => setFieldValue("checkOutDate", date)} />
                                            <ErrorMessage name="checkOutDate" component="div" className={styles["error-message"]} />
                                        </div>
                                    </div>

                                    <p><strong>{t("numbersNights")}</strong> {nights > 0 ? nights : t("selectDates")}</p>
                                    <p><strong>{t("totalPrice")}</strong> {nights > 0 ? `${totalPrice}$` : t("selectDates")}</p>

                                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "100%" }}>
                                        {t("purchase")}
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            {isOpenPopUp && <PaymentForm key={hotel.id} saveToUserDb={saveToUserDb} setIsOpenPopUp={setIsOpenPopUp} />}
        </div>
    );
}
