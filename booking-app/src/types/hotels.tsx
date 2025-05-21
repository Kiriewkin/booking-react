export type Review = {
    id: number;
    firstName: string;
    lastName: string;
    rating: number;
    date: string; 
    comment: string;
};

export type Hotel = {
    id: number;
    name: string;
    city: string;
    address: string;
    state: string | null;
    country_code: string;
    hotel_rating: number;
    phone_number: string | null;
    website: string | null;
    img: string;
    price: number;
    reviews?: Review[];
};

export type HotelProps = {
    hotel: Hotel;
};