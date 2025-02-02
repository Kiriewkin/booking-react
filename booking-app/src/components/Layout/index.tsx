import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MenuOutlined, CloseCircleOutlined, MailTwoTone } from "@ant-design/icons";
import { Flex, Layout } from "antd";

import { resetCity } from "../../store/slices/hotelsSlice";
import { AppDispatch } from "../../store";

import logo from '../../assets/icons/logo.svg'

import styles from "./index.module.scss"

const MyLayout: React.FC = () => {
    const { Header, Content, Footer } = Layout;

    const dispatch: AppDispatch = useDispatch();

    const handleHotelsClick = () => {
        dispatch(resetCity());
        handleLinkClick()
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header className={styles['header-container']}>
                    <div className={`wrapper ${styles['header-content']}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <NavLink to="" >
                                <img src={logo} alt="logo" className={styles['main-logo']} />
                            </NavLink>
                        </div>
                        <div className={styles['header-links']}>
                            <NavLink to="" className={styles.navlink} >Home</NavLink>
                            <NavLink to="hotels" className={styles.navlink} onClick={handleHotelsClick} >Hotels</NavLink>
                            <NavLink to="favorites" className={styles.navlink}>Favorites</NavLink>
                            <NavLink to="aboutus/aboutbooking" className={styles.navlink} >About us</NavLink>
                            <NavLink to="register" className={styles.navlink} >Register</NavLink>
                        </div>
                        <div className={styles['menu-icon']}>
                            <MenuOutlined onClick={() => setIsMenuOpen(true)} />
                            {isMenuOpen && (
                                <div className={styles['popup-menu-overlay']}>
                                    <CloseCircleOutlined onClick={() => setIsMenuOpen(false)} />
                                    <ul className={styles['popum-menu-list']}>
                                        <li><NavLink to="" className={styles.navlink} onClick={handleLinkClick}>Home</NavLink></li>
                                        <li><NavLink to="hotels" className={styles.navlink} onClick={handleHotelsClick}>Hotels</NavLink></li>
                                        <li><NavLink to="favorites" className={styles.navlink} onClick={handleLinkClick}>Favorites</NavLink></li>
                                        <li><NavLink to="aboutus/aboutbooking" className={styles.navlink} onClick={handleLinkClick}>About us</NavLink></li>
                                        <li className={styles['contact-link']}>
                                            <MailTwoTone className={styles['mail-icon']} />
                                            <NavLink to="aboutus/contact" className={styles.navlink} onClick={handleLinkClick}>Contact Us</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </Header >
                <Content style={{ minHeight: "100vh" }}>
                    <div className="wrapper">
                        <Outlet />
                    </div>
                </Content>
                <Footer className={styles['footer-container']}>
                    <div className="wrapper" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={styles['footer-links']}>
                                <div>
                                    <h3>About Us</h3>
                                    <ul>
                                        <li><Link to="aboutus/aboutbooking">Company</Link></li>
                                        <li><a href="team">Team</a></li>
                                        <li><a href="careers">Careers</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Support</h3>
                                    <ul>
                                        <li><a href="help">Help Center</a></li>
                                        <li><a href="faq">FAQs</a></li>
                                        <li><Link to="aboutus/contact">Contact us</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Legal</h3>
                                    <ul>
                                        <li><Link to="aboutus/terms">Terms & Conditions</Link></li>
                                        <li><Link to="aboutus/legal">Legal</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles['footer-socials']}>
                                <h3>Follow Us</h3>
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
                            <p>© 2024 Booking. All rights reserved.</p>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </Flex>
    )
}

export default MyLayout