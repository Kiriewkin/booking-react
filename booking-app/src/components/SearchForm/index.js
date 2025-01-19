import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Select, DatePicker, InputNumber, Button, Space } from "antd";

import { fetchDestination } from "../../store/thunks/destinationThunk";

import styles from "./index.module.scss"

export default function SearchForm() {
    const navigate = useNavigate();
    const { destination } = useSelector((state) => state.destination);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDestination());
    }, [dispatch]);

    const { Option } = Select;
    const { RangePicker } = DatePicker;

    const initialValues = {
        destination: "",
        checkIn: "",
        checkOut: "",
        adults: "",
        children: "",
    };

    const handleSubmit = (values) => {
        const newReq = {
            name: values.destination,
            checkIn: values.checkIn,
            checkOut: values.checkOut,
            adults: values.adults,
            children: values.children,
        };

        console.log(newReq);

        if (values.destination) {
            navigate(`hotels/${values.destination}`);
        } else {
            console.error("Destination not selected!");
        }
    };

    return (
        <div className={styles["form-container"]}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ setFieldValue, handleSubmit }) => (
                    <Form
                        layout="inline"
                        onFinish={handleSubmit}
                        className={styles["search-form"]}
                    >
                        <Form.Item
                            name="destination"
                            rules={[{ required: true, message: "Please select a destination!" }]}
                        >
                            <Select
                                onChange={(value) => setFieldValue("destination", value)}
                                placeholder="Select a destination"
                            > 
                                {destination.map((city) => (
                                    <Option
                                        key={`${city.label}--${city.value}`}
                                        value={city.label}
                                    > 
                                        {city.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <ErrorMessage
                            name="destination"
                            component="span"
                            className="error-message"
                        />
                        <Form.Item name="dateRange">
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    onChange={(dates) => {
                                        setFieldValue(
                                            "checkIn",
                                            dates ? dates[0].format("YYYY-MM-DD") : ""
                                        );
                                        setFieldValue(
                                            "checkOut",
                                            dates ? dates[1].format("YYYY-MM-DD") : ""
                                        );
                                    }}
                                />
                            </Space>
                        </Form.Item>
                        <ErrorMessage name="checkIn" component="span" className="error-message" />
                        <ErrorMessage name="checkOut" component="span" className="error-message" />

                        <Form.Item name="adults">
                            <InputNumber
                                min={1}
                                max={10}
                                placeholder="Adults"
                                onChange={(value) => setFieldValue("adults", value)}
                            />
                        </Form.Item>
                        <ErrorMessage name="adults" component="span" className="error-message" />

                        <Form.Item name="children">
                            <InputNumber
                                min={0}
                                max={10}
                                placeholder="Children"
                                onChange={(value) => setFieldValue("children", value)}
                            />
                        </Form.Item>
                        <ErrorMessage name="children" component="span" className="error-message" />

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Formik>
        </div>
    );
}