import DestinationList from "./DestinationList/DestinationList";
import SearchForm from "../../components/SearchForm";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

export default function Home() {

    const { t } = useTranslation();

    return (
        <div className={styles["home-container"]}>
            <h1 className={styles["home-title"]}>
                {t("travelWith")} <span className={styles["home-title-span"]}>{t("booking")}</span>
            </h1>
            <SearchForm />
            <h2 className={styles["find-destination"]}>{t("findDestination")}</h2>
            <DestinationList />
        </div>
    )
};