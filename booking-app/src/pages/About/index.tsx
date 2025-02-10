import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ContactsForm from "./ContactForm";

import styles from "./index.module.scss";

export default function About() {
    const { t } = useTranslation()
    return (
        <div className={styles["about-container"]}>
            <div style={{ paddingLeft: 14 }}>
                <h1 className={styles["h1-about"]}>{t("aboutUs")}</h1>
            </div>
            <div className={styles["navigation-container"]}>
                <div className={styles["about-menu"]}>
                    <ul>
                        <li>
                            <NavLink
                                to="aboutbooking"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                {t("aboutBookingtm")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="legal"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                {t("legal")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="contact"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                {t("contactUs")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="terms"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                {t("terms")}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div style={{ width: "70%" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export function AboutBooking() {
    const { t } = useTranslation()
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>{t("aboutBookingtm")}</h1>
            <div className={styles["legal-content"]}>
                <p>{t("aboutBooking1")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("aboutBooking2")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("aboutBooking3")}</p>
            </div>
        </div>
    )
}

export function Legal() {
    const { t } = useTranslation()
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>{t("legalInformation")}</h1>
            <div className={styles["legal-content"]}>
                <p>{t("legal1")}</p>
                <p>{t("legal2")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("legal3")}</p>
                <p>{t("legal4")}</p>
            </div>
        </div>
    );
}

export function Contact() {
    const { t } = useTranslation()
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>{t("contactUs")}</h1>
            <div className={styles["legal-content"]}>
                <ContactsForm />
            </div>
        </div>
    )
}

export function Terms() {
    const { t } = useTranslation()
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>{t("terms")}</h1>
            <div className={styles["legal-content"]}>
                <p>{t("terms1")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("terms2")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("terms3")}</p>
                <hr className={styles["legal-divider"]} />
                <p>{t("terms4")}</p>
            </div>
        </div>
    );
}
