import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Typography, notification, Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

const { Title } = Typography;

interface PaymentFormProps {
    saveToUserDb: () => void;
    setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

type PaymentFormValues = {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    CVV: string;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ saveToUserDb, setIsOpenPopUp }) => {
    const { t } = useTranslation();

    const initialValues: PaymentFormValues = {
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        CVV: "",
    };

    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required(t("cardNumberRequired"))
            .matches(/^\d{16}$/, t("cardNumberInvalid")),
        cardHolder: Yup.string()
            .required(t("nameOnCardRequired"))
            .min(2, t("nameTooShort")),
        expiryDate: Yup.string()
            .required(t("expiryRequired"))
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, t("expiryInvalid")),
        CVV: Yup.string()
            .required("CVV is required")
            .matches(/^\d{3,4}$/, "Invalid CVV"),
    });

    const handleSubmit = (values: PaymentFormValues, { resetForm }: FormikHelpers<PaymentFormValues>) => {
        notification.success({
            message: t("paymentWasSuccessful"),
            description: t("yourPaymentProcessed"),
        });
        saveToUserDb();
        setIsOpenPopUp(false);
        resetForm();
    };

    return (
        <div className={styles["payment-form-popup"]}>
            <div style={{ padding: "40px", borderRadius: "8px", backgroundColor: "#f7f7f7", width: 350 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={2}>{t("payment")}</Title>
                    <CloseCircleOutlined style={{ fontSize: 18 }} onClick={() => setIsOpenPopUp(false)} />
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                        <Form>
                            <div style={{ marginBottom: "16px" }}>
                                <label>{t("cardNumber")}</label>
                                <Input
                                    name="cardNumber"
                                    placeholder={t("cardNumber")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cardNumber}
                                    status={touched.cardNumber && errors.cardNumber ? "error" : ""}
                                />
                                {touched.cardNumber && errors.cardNumber && (
                                    <div className={styles["error-message"]}>{errors.cardNumber}</div>
                                )}
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label>{t("nameOnCard")}</label>
                                <Input
                                    name="cardHolder"
                                    placeholder={t("nameOnCard")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cardHolder}
                                    status={touched.cardHolder && errors.cardHolder ? "error" : ""}
                                />
                                {touched.cardHolder && errors.cardHolder && (
                                    <div className={styles["error-message"]}>{errors.cardHolder}</div>
                                )}
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label>{t("expirationDate")}</label>
                                <Input
                                    name="expiryDate"
                                    placeholder={t("expirationDate")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expiryDate}
                                    status={touched.expiryDate && errors.expiryDate ? "error" : ""}
                                />
                                {touched.expiryDate && errors.expiryDate && (
                                    <div className={styles["error-message"]}>{errors.expiryDate}</div>
                                )}
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label>CVV</label>
                                <Input
                                    name="CVV"
                                    placeholder="CVV"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.CVV}
                                    status={touched.CVV && errors.CVV ? "error" : ""}
                                />
                                {touched.CVV && errors.CVV && (
                                    <div className={styles["error-message"]}>{errors.CVV}</div>
                                )}
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isSubmitting}
                                style={{ marginTop: "10px" }}
                            >
                                {t("pay")}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PaymentForm;
