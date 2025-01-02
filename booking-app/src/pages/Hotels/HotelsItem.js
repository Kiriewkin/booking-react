import { Card, Rate } from "antd";

import "./index.scss"

export default function HotelsItem({ hotel }) {
    return (
        <div>
            <Card hoverable>
                <img src={hotel.img} alt="Hotel" style={{ width: "100%", height: "50%" }} />
                <p className="title-hotel">{hotel.name}</p>
                <p>Address: {hotel.address}</p>
                <p>City: {hotel.city}</p>
                <p>Country Code: {hotel.country_code}</p>
                {hotel.phone_number && <a href={`tel:${hotel.phone_number}`}>Phone: {hotel.phone_number}</a>}
                {hotel.website && <a href={`${hotel.website}`}>Website</a>}
                <Rate disabled defaultValue={hotel.hotel_rating} />
            </Card>
        </div>
    )
}
