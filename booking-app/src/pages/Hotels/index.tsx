import { useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Spin, Pagination } from "antd";
import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "../../store";
import { handleCitySelection, fetchHotels } from "../../store/thunks/hotelsThunk";
import { capitalizeFirstLetter } from "../../utils/helpers";
import HotelsList from "./HotelsList";
import SortHotels from "../../components/SortHotels";
import { setPage } from "../../store/slices/hotelsSlice";

import "./index.scss"

export default function Hotels() {
    const { city } = useParams();
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const currentLang = useSelector((state: RootState) => state.languages.currentLang);
    const sortOrder = useSelector((state: RootState) => state.hotels.sortOrder)
    const currentPage = useSelector((state: RootState) => state.hotels.currentPage)
    const totalHotels = useSelector((state: RootState) => state.hotels.totalHotels)
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(fetchHotels({ lang: currentLang, sortOrder, page: currentPage }));
        if (city) {
            dispatch(handleCitySelection({ city, lang: currentLang, sortOrder, page: currentPage }));
        }
    }, [dispatch, currentLang, city, sortOrder, currentPage]);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page))
    }

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p>{t("loading")}</p><Spin size="large" /></div>;
    }

    return (
        <div style={{ padding: "30px 0px" }}>
            <h1 style={{ marginBottom: 20 }} className="h1-hotel">
                {city ? `${t("hotelsIn")} ${capitalizeFirstLetter(city)} :` : t("allHotels")}
            </h1>
            <SortHotels />
            <HotelsList />
            <Pagination
                style={{marginTop: 30}}
                align="center"
                current={currentPage}
                total={totalHotels}
                pageSize={12}
                onChange={handlePageChange}
            />
        </div>
    );
}
