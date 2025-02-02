import { useSelector } from "react-redux";
import { Carousel, Spin } from "antd";
import { RootState } from "../../../store";
import DestinationItem from "./DestinationItem";
import styles from "./index.module.scss";

export default function DestinationList() {
    const { loading, destination } = useSelector((state: RootState) => state.destination);

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
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className={styles.carouselContainer}>
            <Carousel {...carouselSettings}>
                {destination.map((city) => (
                    <div key={`${city.label}--${city.value}`} className={styles.carouselItem}>
                        <DestinationItem city={city} />
                    </div>
                ))}
            </Carousel>
            {destination.length === 0 && <p className={styles.emptyMessage}>No destinations available!</p>}
        </div>
    );
}
