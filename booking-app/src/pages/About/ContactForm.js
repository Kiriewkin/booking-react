import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import styles from "./index.module.scss"

export default function ContactsForm() {
    const initialValues = {
        name: '',
        email: '',
        message: '',
    }

    const handleSubmit = (values, { resetForm }) => {
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

            <p>Leave a message using the form below:</p>

            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                <Form className={styles["contact-form"]}>
                    <Field type="text" name="name" placeholder="Your Name" />
                    <ErrorMessage name="name" component="span" className={styles["error"]} />

                    <Field type="email" name="email" placeholder="Your Email" />
                    <ErrorMessage name="email" component="span" className={styles["error"]} />

                    <Field
                        as="textarea"
                        name="message"
                        placeholder="Your Message"
                        rows="4"
                        cols="50"
                        style={{resize: "vertical"}}
                    />
                    <ErrorMessage name="message" component="span" className={styles["error"]} />
                    <button type="submit">Submit</button>

                </Form>
            </Formik></>
    );
}
