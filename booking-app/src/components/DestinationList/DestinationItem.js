import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import "./slider.scss";

export default function DestinationItem({ city }) {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/hotels/${city.label}`);
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

DestinationItem.propTypes = {
    city: PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
};
