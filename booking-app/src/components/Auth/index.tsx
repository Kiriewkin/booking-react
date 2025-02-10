import { Card, Form, Input, Button, Typography, Divider } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GoogleAuth from "./GoogleAuth";

export default function AuthPage() {
    const location = useLocation();

    const isLoginPage = location.pathname === "/booking-react/login";
    const { t } = useTranslation()
    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
            background: "#f0f2f5"
        }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    {isLoginPage ? t("login") : t("signUp")}
                </Typography.Title>

                <Form layout="vertical">
                    {!isLoginPage && (
                        <Form.Item label={t("fullName")} name="fullName"
                            rules={[{ required: true, message: "Please enter your name!" }]}>
                            <Input placeholder={t("enterYourName")} />
                        </Form.Item>
                    )}

                    <Form.Item label={t("email")} name="email"
                        rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
                        <Input placeholder={t("enterYourEmail")} />
                    </Form.Item>

                    <Form.Item label={t("password")} name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password placeholder={t("enterYourPassword")} />
                    </Form.Item>

                    <Button type="primary" block size="large">
                        {isLoginPage ? t("login") : t("signUp")}
                    </Button>
                </Form>

                <Divider>{t("or")}</Divider>

                <GoogleAuth />

                <Divider />
                <Typography.Text type="secondary">
                    {isLoginPage ? (
                        <>{t("haventAccount?")} <NavLink to="/booking-react/register">{t("signUpHere")}</NavLink></>
                    ) : (
                        <>{t("haveAccount?")} <NavLink to="/booking-react/login">{t("loginHere")}</NavLink></>
                    )}
                </Typography.Text>
            </Card>
        </div>
    );
}
