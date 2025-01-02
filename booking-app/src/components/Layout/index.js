import { Outlet, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { Flex, Layout } from "antd";

import { resetCity } from "../../store/slices/hotelsSlice";

import logo from '../../assets/icons/logo.svg'

import styles from "./index.module.scss"

export default function MyLayout() {
    const { Header, Content, Footer } = Layout;

    const dispatch = useDispatch();
    const handleHotelsClick = () => {
        dispatch(resetCity());
    };

    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header className={styles['header-container']}>
                    <div className="wrapper" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <NavLink to="/" >
                                <img src={logo} alt="logo" className={styles['main-logo']} />
                            </NavLink>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15 }}>
                            <NavLink to="/" className={styles.navlink} >Home</NavLink>
                            <NavLink to="/hotels" className={styles.navlink} onClick={handleHotelsClick} >Hotels</NavLink>
                            <NavLink to="/aboutus" className={styles.navlink} >About us</NavLink>
                            <button className={`${styles.navlink} ${styles['button-theme']}`}>Change Theme</button>
                        </div>
                    </div>
                </Header >
                <Content style={{minHeight: "100vh"}}>
                    <div className="wrapper">
                        <Outlet />
                    </div>
                </Content>
                <Footer className={styles['footer-container']}>
                    <div className="wrapper" style={{ display: "flex", flexDirection:"column", gap: 15 }}>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div className={styles['footer-links']}>
                                <div>
                                    <h3>About Us</h3>
                                    <ul>
                                        <li><a href="/about">Company</a></li>
                                        <li><a href="/team">Team</a></li>
                                        <li><a href="/careers">Careers</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Support</h3>
                                    <ul>
                                        <li><a href="/help">Help Center</a></li>
                                        <li><a href="/faq">FAQs</a></li>
                                        <li><a href="/contact">Contact Us</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Legal</h3>
                                    <ul>
                                        <li><a href="/terms">Terms & Conditions</a></li>
                                        <li><a href="/privacy">Privacy Policy</a></li>
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