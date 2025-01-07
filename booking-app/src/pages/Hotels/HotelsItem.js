import PropTypes from 'prop-types';
import { Card, Rate } from "antd";

import "./index.scss"

export default function HotelsItem({ hotel = { hotel_rating: 0, phone_number: null, website: null } }){
    return (
            <Card hoverable style={{height: "100%"}}>
                <img src={hotel.img} alt="Hotel" style={{ width: "100%", height: "50%" }} />
                <p className="hotel-title">{hotel.name}</p>
                <p className="hotel-address">Address: {hotel.address}</p>
                <p className="hotel-city">City: {hotel.city}</p>
                <p className="hotel-country-code">Country Code: {hotel.country_code}</p>
                {hotel.phone_number && <a href={`tel:${hotel.phone_number}`} className="hotel-phone">Phone: {hotel.phone_number}</a>}
                {hotel.website && <a href={`${hotel.website}`} className="hotel-website">Website</a>}
                <Rate disabled defaultValue={hotel.hotel_rating} className="hotel-rating" />
            </Card>
    )
}

HotelsItem.propTypes = {
    hotel: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country_code: PropTypes.string.isRequired,
        hotel_rating: PropTypes.number,
        phone_number: PropTypes.string,
        website: PropTypes.string,
    }).isRequired,
};