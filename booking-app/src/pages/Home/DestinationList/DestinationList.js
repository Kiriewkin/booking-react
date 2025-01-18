import { useSelector } from "react-redux";
import { Col, Carousel, Spin } from "antd";

import DestinationItem from "./DestinationItem";

import styles from "./index.module.scss";

export default function DestinationList() {
    const { loading, destination } = useSelector((state) => state.destination);

    if (loading) {
        return (
            <div className={styles.loading}>
                <Spin size="large" />
                <p>Loading destinations...</p>
            </div>
        );
    }

    const carouselSettings = {
        slidesToShow: 5,
        slidesToScroll: 2,
        dots: false,
        infinite: true,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className={styles.carouselContainer}>
            <Carousel {...carouselSettings}>
                {destination.map((city) => (
                    <Col key={`${city.label}--${city.value}`} className={styles.carouselItem}>
                        <DestinationItem city={city} />
                    </Col>
                ))}
            </Carousel>
            {destination.length === 0 && <p className={styles.emptyMessage}>No destinations available!</p>}
        </div>
    );
}
