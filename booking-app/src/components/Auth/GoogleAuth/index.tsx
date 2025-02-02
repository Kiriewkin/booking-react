import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse: any) => {
        if (credentialResponse.credential) {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded);
            
            setMessage('Вы успешно вошли в аккаунт!');
            setIsLoggedIn(true);

            setTimeout(() => {
                navigate('/booking-react');
            }, 3000);
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
            }, 3000);
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
