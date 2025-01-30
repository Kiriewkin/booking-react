import { useNavigate } from "react-router-dom";

import "./index.scss";

export default function NotFound() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
