import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';

import styles from "./index.module.scss"

export default function ContactsForm() {
    const { t } = useTranslation()
    type InitialValues = {
        name: '',
        email: '',
        message: '',
    }

    const initialValues : InitialValues = {
        name: '',
        email: '',
        message: '',
    }

    const handleSubmit = (values: InitialValues, { resetForm } : FormikHelpers<InitialValues>) => {
        console.log('Data sent', values);
        resetForm();
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(1, "The name must contain at least 2 characters."),
        email: Yup.string()
            .required("Email is required")
            .email("Incorrect email"),
        message: Yup.string()
            .required("Message required")
            .min(10, "The message must contain at least 10 characters."),
    })

    return (
        <>

            <p>{t("leaveMessage")}</p>

            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                <Form className={styles["contact-form"]}>
                    <Field type="text" name="name" placeholder={t("yourName")} />
                    <ErrorMessage name="name" component="span" className={styles["error"]} />

                    <Field type="email" name="email" placeholder={t("yourEmail")} />
                    <ErrorMessage name="email" component="span" className={styles["error"]} />

                    <Field
                        as="textarea"
                        name="message"
                        placeholder={t("yourMessage")}
                        rows="4"
                        cols="50"
                        style={{resize: "vertical"}}
                    />
                    <ErrorMessage name="message" component="span" className={styles["error"]} />
                    <button type="submit">{t("submitBtn")}</button>

                </Form>
            </Formik></>
    );
}
