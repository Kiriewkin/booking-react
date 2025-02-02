import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

type City = {
    id: number;
    value: number;
    label: string;
    img: string;
}

type CityProps = {
    city : City;
}

const DestinationItem : React.FC<CityProps> =({ city }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`hotels/${city.label}`);
    }

    return (
        <div className={styles.cardItem} onClick={handleCardClick}>
            <div className={styles.imageContainer} style={{ padding: 0, height: "100%" }}>
                <img src={city.img} alt={city.label} />
                <p className={styles.cityLabel}>{city.label}</p>
            </div>
        </div>
    );
}

export default DestinationItem