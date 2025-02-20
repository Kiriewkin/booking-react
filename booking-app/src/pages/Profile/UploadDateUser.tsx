import { Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateUserProfile } from "../../store/thunks/authThunk";

import styles from "./index.module.scss";

const validationSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string(),
    oldPassword: Yup.string(),
    newPassword: Yup.string().test('password-required', 'New password is required', function(value) {
        const { oldPassword } = this.parent;
        if (oldPassword && oldPassword.length > 0) {
            return Yup.string().required("New password is required").isValidSync(value);
        }
        return true;
    }),
});

const initialValues = {
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
};

export default function ProfileForm({ onClose }: { onClose: () => void }) {
    const { t } = useTranslation()
    const [file, setFile] = useState<File | null>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (values: { name: string; email: string; oldPassword: string; newPassword: string }, { resetForm }: any) => {
        const formData = new FormData();

        if (values.name) formData.append("name", values.name);
        if (values.email) formData.append("email", values.email);
        if (values.oldPassword) formData.append("oldPassword", values.oldPassword);
        if (values.newPassword) formData.append("newPassword", values.newPassword);
        if (file) formData.append("avatar", file);

        try {
            await dispatch(updateUserProfile(formData));
            notification.success({
                message: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
            resetForm();
        } catch (error) {
            notification.error({
                message: "Update Failed",
                description: "There was an error updating your profile.",
            });
        }
        onClose();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, isSubmitting }) => (
                <FormikForm className={styles["contact-form"]}>
                    <Field
                        type="text"
                        name="name"
                        placeholder={t("newName")}
                        className={styles["input-field"]}
                    />
                    <ErrorMessage name="name" component="span" className={styles["error"]} />

                    <Field
                        type="email"
                        name="email"
                        placeholder={t("newEmail")}
                        className={styles["input-field"]}
                    />
                    <ErrorMessage name="email" component="span" className={styles["error"]} />

                    <Field
                        type="password"
                        name="oldPassword"
                        placeholder={t("oldPassword")}
                        className={styles["input-field"]}
                    />
                    <ErrorMessage name="oldPassword" component="span" className={styles["error"]} />

                    <Field
                        type="password"
                        name="newPassword"
                        placeholder={t("newPassword")}
                        className={styles["input-field"]}
                    />
                    <ErrorMessage name="newPassword" component="span" className={styles["error"]} />

                    <Upload
                        beforeUpload={(file) => { 
                            setFile(file); 
                            return false; 
                        }}
                    >
                        <Button icon={<UploadOutlined />}>{t("uploadAvatar")}</Button>
                    </Upload>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : t("submitBtn")}
                    </Button>
                </FormikForm>
            )}
        </Formik>
    );
}
