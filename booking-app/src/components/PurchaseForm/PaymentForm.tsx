import React, { useState } from "react";
import { Input, Button, Form, Typography, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import styles from "./index.module.scss"
import { t } from "i18next";

const { Title } = Typography;
interface PaymentFormProps {
    saveToUserDb: () => void;
    setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

const PaymentForm: React.FC<PaymentFormProps> = ({ saveToUserDb, setIsOpenPopUp }) => {
    const [status, setStatus] = useState<string>("");

    const handlePayment = () => {
        setStatus(t("paymentIsBeingProces"));
        setTimeout(() => {
            setStatus(t("paymentWasSuccessful"));
            notification.success({
                message: t("paymentWasSuccessful"),
                description: t("yourPaymentProcessed"),
            });
            setIsOpenPopUp(false)
        }, 2000);
        saveToUserDb()
    };

    return (
        <div className={styles['payment-form-popup']} >
            <Form
                layout="vertical"
                onFinish={handlePayment}
                style={{ padding: "40px", borderRadius: "8px", backgroundColor: "#f7f7f7", width: 350 }}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title level={2} style={{ textAlign: "center" }}>{t("payment")}</Title>
                    <CloseCircleOutlined style={{fontSize: 18}} onClick={() => setIsOpenPopUp(false)} />
                </div>
                <Form.Item label={t("cardNumber")} name="cardNumber" required>
                    <Input placeholder={t("cardNumber")} />
                </Form.Item>
                <Form.Item label={t("nameOnCard")} name="cardHolder" required>
                    <Input placeholder={t("nameOnCard")} />
                </Form.Item>
                <Form.Item label={t("expirationDate")} name="expiryDate" required>
                    <Input placeholder={t("expirationDate")} />
                </Form.Item>
                <Form.Item label="CVV" name="CVV" required>
                    <Input placeholder="CVV" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ marginTop: "10px" }}
                    >
                        {t("pay")}
                    </Button>
                </Form.Item>
                {status && <p style={{ textAlign: "center" }}>{status}</p>}
            </Form>
        </div>
    );
}

export default PaymentForm