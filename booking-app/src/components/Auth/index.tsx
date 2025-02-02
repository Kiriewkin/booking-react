import { Card, Form, Input, Button, Typography, Divider } from "antd";
import GoogleAuth from "./GoogleAuth";
import { NavLink, useLocation } from "react-router-dom";

export default function AuthPage() {
    const location = useLocation();

    const isLoginPage = location.pathname === "/booking-react/login";

    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
            background: "#f0f2f5"
        }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    {isLoginPage ? "Login" : "Sign Up"}
                </Typography.Title>

                <Form layout="vertical">
                    {!isLoginPage && (
                        <Form.Item label="Full Name" name="fullName"
                            rules={[{ required: true, message: "Please enter your name!" }]}>
                            <Input placeholder="Enter your name" />
                        </Form.Item>
                    )}

                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item label="Password" name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Button type="primary" block size="large">
                        {isLoginPage ? "Login" : "Sign Up"}
                    </Button>
                </Form>

                <Divider>or</Divider>

                <GoogleAuth />

                <Divider />
                <Typography.Text type="secondary">
                    {isLoginPage ? (
                        <>Don't have an account? <NavLink to="/booking-react/register">Sign up here</NavLink></>
                    ) : (
                        <>Already have an account? <NavLink to="/booking-react/login">Login here</NavLink></>
                    )}
                </Typography.Text>
            </Card>
        </div>
    );
}
