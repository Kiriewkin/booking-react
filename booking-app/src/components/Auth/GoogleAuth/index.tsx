import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../../store/slices/authSlice';

interface GoogleJwtPayload {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

export default function GoogleAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse: any) => {
        if (credentialResponse.credential) {
            const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);

            const user = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                img: decoded.picture,
            };

            const token = credentialResponse.credential;

            dispatch(setUser({ user, token }));

            setMessage('Вы успешно вошли в аккаунт!');
            setIsLoggedIn(true);

            setTimeout(() => {
                navigate('/booking-react');
            }, 1500);
        } else {
            console.error("No credential received");
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                setMessage('');
            }, 1500);
        }
    }, [isLoggedIn]);

    return (
        <div>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />
            {message && <p>{message}</p>}
        </div>
    );
}
