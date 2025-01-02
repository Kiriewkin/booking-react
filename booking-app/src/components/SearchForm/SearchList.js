import { useSelector } from "react-redux"
import { Col, Row, Spin } from 'antd';

import SearchItem from "./SearchItem";

export default function SearchList() {
    const { loading, destination } = useSelector((state) => (state.destination))
    if (loading) {
        return <div><p>Loading...</p><Spin size="large" /></div>;
    }
    return (
        <Row gutter={[16,32]}>
            {destination.map((city) => (
                <Col key={`${city.label}--${city.value}`} span={8}>
                    <SearchItem city={city} />
                </Col>
            ))}
            {destination.length === 0 && <p>Destination is empty!</p>}
        </Row>
    )
}