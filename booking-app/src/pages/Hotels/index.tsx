import { useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "../../store";
import { handleCitySelection, fetchHotels } from "../../store/thunks/hotelsThunk";
import { capitalizeFirstLetter } from "../../utils/helpers";
import HotelsList from "./HotelsList";

import "./index.scss"

export default function Hotels() {
    const { city } = useParams();
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(fetchHotels(currentLang));
        if (city) {
            dispatch(handleCitySelection({ city, lang: currentLang }));
        }
    }, [dispatch, currentLang, city]);
    

    if (loading) {
        return <div><p>{t("loading")}</p><Spin size="large" /></div>;
    }

    return (
        <div style={{ padding: "30px 0px" }}>
            <h1 style={{ marginBottom: 20 }} className="h1-hotel">
                {city ? `${t("hotelsIn")} ${capitalizeFirstLetter(city)} :` : t("allHotels")}
            </h1>
            <HotelsList />
        </div>
    );
}
