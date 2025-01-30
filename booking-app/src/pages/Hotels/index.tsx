import { useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Spin } from "antd";

import { AppDispatch,RootState } from "../../store";
import { handleCitySelection } from "../../store/thunks/hotelsThunk";
import { capitalizeFirstLetter } from "../../utils/helpers";
import HotelsList from "./HotelsList";

import "./index.scss"

export default function Hotels() {
    const { city } = useParams();
    const loading = useSelector((state: RootState) => state.hotels.loading);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (city) {
            dispatch(handleCitySelection(city));
        }
    }, [dispatch, city]);

    if (loading) {
        return <div><p>Loading...</p><Spin size="large" /></div>;
    }

    return (
        <div style={{ padding: "30px 0px" }}>
            <h1 style={{ marginBottom: 20 }} className="h1-hotel">
                {city ? `Hotels in ${capitalizeFirstLetter(city)} :` : "All Hotels"}
            </h1>
            <HotelsList />
        </div>
    );
}
