import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store";

const ProtectedRouter = () => {
    const isAuth = useSelector((state : RootState) => state.auth.token);
    const location = useLocation();

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="register" state={{ from: location }} replace />
    );
};

export default ProtectedRouter;
