import { Card, Form, Input, Button, Typography, Divider, message } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/thunks/authThunk";
import { RootState, AppDispatch } from "../../store";
import GoogleAuth from "./GoogleAuth";
import { useEffect } from "react";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const isLoginPage = location.pathname === "/booking-react/login";
    const [form] = Form.useForm();
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token) {
            message.success(t("Auth Success"));
            navigate("/booking-react");
        }
    }, [token, navigate, t]);

    const handleSubmit = async (values: { email: string; password: string; fullName?: string }) => {
        try {
            if (isLoginPage) {
                await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();
            } else {
                await dispatch(registerUser({ name: values.fullName!, email: values.email, password: values.password })).unwrap();
            }
        } catch (error) {
            if (error === "User already exists") {
                message.error("A user with this email already exists");
            } else if (error === "Invalid credentials") {
                message.error("Invalid email or password");
            } else {
                message.error(error as string);
            }
        }
    };


    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
            background: "#f0f2f5"
        }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    {isLoginPage ? t("login") : t("signUp")}
                </Typography.Title>

                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    {!isLoginPage && (
                        <Form.Item
                            label={t("fullName")}
                            name="fullName"
                            rules={[{ required: true, message: t("enterYourName") }]}
                        >
                            <Input placeholder={t("enterYourName")} />
                        </Form.Item>
                    )}

                    <Form.Item
                        label={t("email")}
                        name="email"
                        rules={[{ required: true, type: "email", message: t("enterValidEmail") }]}
                    >
                        <Input placeholder={t("enterYourEmail")} />
                    </Form.Item>

                    <Form.Item
                        label={t("password")}
                        name="password"
                        rules={[{ required: true, message: t("enterYourPassword") }]}
                    >
                        <Input.Password placeholder={t("enterYourPassword")} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block size="large">
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
