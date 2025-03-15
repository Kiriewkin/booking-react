import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MenuOutlined, CloseCircleOutlined, MailTwoTone } from "@ant-design/icons";
import { Flex, Layout } from "antd";
import { useTranslation } from "react-i18next";

import { resetCity } from "../../store/slices/hotelsSlice";
import { AppDispatch, RootState } from "../../store";
import { setLanguage } from "../../store/slices/languageSlice";
import { logout } from "../../store/slices/authSlice";

import logo from '../../assets/icons/logo.svg';
import uaLang from '../../assets/icons/Ua@3x.png';
import enLang from '../../assets/icons/Gb@3x.png';
import worldLang from '../../assets/icons/worldLang.svg';

import styles from "./index.module.scss"

const MyLayout: React.FC = () => {
    const { Header, Content, Footer } = Layout;
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const handleHotelsClick = () => {
        dispatch(resetCity());
        handleLinkClick()
    };

    const [isOpen, setIsOpen] = useState(false)

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const { t, i18n } = useTranslation();
    const changeLanguage = (language: "en" | "ua") => (
        i18n.changeLanguage(language)
    )

    const handleChangeLanguage = (language: "en" | "ua") => {
        changeLanguage(language);
        dispatch(setLanguage(language));
        setIsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Flex gap="middle" wrap>
            <Layout style={{minHeight: "100vh"}}>
                <Header className={styles['header-container']}>
                    <div className={`wrapper ${styles['header-content']}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <NavLink to="" >
                                <img src={logo} alt="logo" className={styles['main-logo']} />
                            </NavLink>
                        </div>
                        <div className={styles['header-links']}>
                            <NavLink to="" className={styles.navlink} >{t("home")}</NavLink>
                            <NavLink to="hotels" className={styles.navlink} onClick={handleHotelsClick} >{t("hotels")}</NavLink>
                            <NavLink to="favorites" className={styles.navlink}>{t("favorites")}</NavLink>
                            <NavLink to="aboutus/aboutbooking" className={styles.navlink} >{t("aboutUs")}</NavLink>
                            {token ? (
                                <NavLink to="profile" className={styles.navlink}>
                                    {t("profile")}
                                </NavLink>
                            ) : (
                                null
                            )
                            }
                            {token ? (
                                <NavLink to="" onClick={handleLogout} className={styles.navlink}>
                                    {t("logout")}
                                </NavLink>
                            ) : (
                                <NavLink to="register" className={styles.navlink}>
                                    {t("register")}
                                </NavLink>
                            )}
                            <div className={styles['language-wrapper']}
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                <button className={styles['world-button']}>
                                    <img src={worldLang} alt="world Language" />
                                </button>

                                {isOpen && (
                                    <div className={styles['language-menu-container']}>
                                        <div className={styles['language-menu']}>
                                            <button onClick={() => handleChangeLanguage("ua")} className={styles.navlink}>
                                                <img src={uaLang} alt="Українська" /> Українська
                                            </button>
                                            <button onClick={() => handleChangeLanguage("en")} className={styles.navlink}>
                                                <img src={enLang} alt="English" /> English
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles['menu-icon']}>
                            <MenuOutlined onClick={() => setIsOpen(true)} />
                            {isOpen && (
                                <div className={styles['popup-menu-overlay']}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", fontSize: 24 }}>
                                        <CloseCircleOutlined onClick={() => setIsOpen(false)} />
                                    </div>
                                    <ul className={styles['popum-menu-list']}>
                                        <NavLink to="" className={styles.navlink} onClick={handleLinkClick}>{t("home")}</NavLink>
                                        <NavLink to="hotels" className={styles.navlink} onClick={handleHotelsClick} >{t("hotels")}</NavLink>
                                        <NavLink to="favorites" className={styles.navlink} onClick={handleLinkClick}>{t("favorites")}</NavLink>
                                        <NavLink to="aboutus/aboutbooking" className={styles.navlink} onClick={handleLinkClick} >{t("aboutUs")}</NavLink>
                                        {token ? (
                                            <NavLink to="profile" className={styles.navlink} onClick={handleLinkClick}>
                                                {t("profile")}
                                            </NavLink>
                                        ) : (
                                            null
                                        )
                                        }
                                        {token ? (
                                            <NavLink to="" onClick={() => { handleLogout(); handleLinkClick(); }} className={styles.navlink}>
                                                {t("logout")}
                                            </NavLink>
                                        ) : (
                                            <NavLink to="register" className={styles.navlink} onClick={handleLinkClick}>
                                                {t("register")}
                                            </NavLink>
                                        )}
                                        <li className={styles['contact-link']}>
                                            <NavLink to="aboutus/contact" className={styles.navlink} onClick={handleLinkClick}>
                                                <MailTwoTone className={styles['mail-icon']} />
                                                {t("contactUs")}
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div className={styles['language-menu']}>
                                        <button onClick={() => { handleChangeLanguage("ua"); handleLinkClick(); }} className={styles.navlink}>
                                            <img src={uaLang} alt="Українська" /> Українська
                                        </button>
                                        <button onClick={() => { handleChangeLanguage("en"); handleLinkClick(); }} className={styles.navlink}>
                                            <img src={enLang} alt="English" /> English
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Header >
                <Content style={{ background: "#f0f2f5", paddingTop: 20, paddingBottom: 100 }}>
                    <div className="wrapper">
                        <Outlet />
                    </div>
                </Content>
                <Footer className={styles['footer-container']}>
                    <div className="wrapper" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={styles['footer-links']}>
                                <div>
                                    <h3>{t("aboutUs")}</h3>
                                    <ul>
                                        <li><Link to="aboutus/aboutbooking">{t("company")}</Link></li>
                                        <li><a href="team">{t("team")}</a></li>
                                        <li><a href="careers">{t("careers")}</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>{t("support")}</h3>
                                    <ul>
                                        <li><a href="help">{t("helpCenter")}</a></li>
                                        <li><a href="faq">{t("faq")}</a></li>
                                        <li><Link to="aboutus/contact">{t("contactUs")}</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>{t("legal")}</h3>
                                    <ul>
                                        <li><Link to="aboutus/terms">{t("terms")}</Link></li>
                                        <li><Link to="aboutus/legal">{t("legal")}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles['footer-socials']}>
                                <h3>{t("followUs")}</h3>
                                <div className={styles['social-icons']}>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FacebookOutlined />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <TwitterOutlined />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <InstagramOutlined />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={styles['footer-bottom']}>
                            <p>{t("allRightsReserved")}</p>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </Flex>
    )
}

export default MyLayout