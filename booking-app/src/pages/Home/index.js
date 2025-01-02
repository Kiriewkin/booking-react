import SearchComponent from "../../components/SearchForm";

import styles from './index.module.scss';

export default function Home () {
    return (
        <div className={styles['home-container']}>
            <h1 className={styles['home-title']}>
                Travel with <span className={styles['home-title-span']}>Booking</span>
            </h1>
            <SearchComponent />
        </div>
    )
};