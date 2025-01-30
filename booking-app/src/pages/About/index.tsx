import { NavLink, Outlet } from "react-router-dom";

import ContactsForm from "./ContactForm";

import styles from "./index.module.scss";

export default function About() {
    return (
        <div className={styles["about-container"]}>
            <div style={{ paddingLeft: 14 }}>
                <h1 className={styles["h1-about"]}>About us</h1>
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
                                About company Booking
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="legal"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                Legal
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="contact"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                Contact us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="terms"
                                className={({ isActive }) =>
                                    isActive ? styles["about-active-link"] : ""
                                }
                            >
                                Terms & Conditions
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
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>About Booking.com™</h1>
            <div className={styles["legal-content"]}>
                <p>
                    Founded in 1996 in Amsterdam, Booking.com has grown from a small Dutch startup to one of the world’s leading digital travel companies. Part of Booking Holdings Inc.
                    (NASDAQ: BKNG), Booking.com’s mission is to make it easier for everyone to experience the world.
                </p>
                <hr className={styles["legal-divider"]} />
                <p>
                    By investing in the technology that helps take the friction out of travel, Booking.com seamlessly connects millions of travellers with memorable experiences, a range of transport options and incredible places to stay - from homes to hotels and much more. As one of the world’s largest travel marketplaces for both established brands and entrepreneurs of all sizes,
                    Booking.com enables properties all over the world to reach a global audience and grow their businesses.
                </p>
                <hr className={styles["legal-divider"]} />
                <p>
                    Booking.com is available in 43 languages and offers more than 28 million total reported accommodation listings, including over 6.6 million listings alone of homes,
                    apartments and other unique places to stay. No matter where you want to go or what you want to do, Booking.com makes it easy and backs it all up with 24/7 customer support.
                </p>
            </div>
        </div>
    )
}

export function Legal() {
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>Legal Information</h1>
            <div className={styles["legal-content"]}>
                <p>
                    <strong>Booking.com B.V.</strong> (the company behind Booking.com™) is registered and based in Amsterdam, the Netherlands ("Booking.com", "we", "us" or "our"),
                    from where it renders an online accommodation reservation service (the "Service") on its website (the "Website"),
                    and is supported internationally by its local group companies (the "support companies").
                </p>
                <p>
                    The support companies provide only internal support to Booking.com B.V. The support companies do not render the Service
                    and do not own, operate, or manage the Website or any other website.
                </p>
                <hr className={styles["legal-divider"]} />
                <p>
                    For all questions about Booking.com, the Service (i.e., the online accommodation reservation service), the Website, or if you wish to send or serve any documents,
                    correspondence, notices, or other communications in respect of Booking.com, the Service, or the Website, please contact Booking.com B.V. directly.
                </p>
                <p>
                    <strong>Press Enquiries:</strong> Please direct press-related questions to the appropriate department via the contact form on our website.
                </p>
            </div>
        </div>
    );
}

export function Contact() {
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>Contact us</h1>
            <div className={styles["legal-content"]}>
                <ContactsForm />
            </div>
        </div>
    )
}

export function Terms() {
    return (
        <div className={styles["legal-container"]}>
            <h1 className={styles["legal-title"]}>Terms & Conditions</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, urna ut efficitur vehicula, sapien arcu dictum nunc,
                ut egestas lacus ligula sit amet justo. Quisque facilisis,
                libero a aliquam dictum, nisi velit malesuada nunc, non gravida elit metus a justo. Integer tempus.
            </p>
        </div>
    );
}
