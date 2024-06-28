import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useSeller from "../useSeller/useSeller";
import { Navigate, useLocation } from "react-router-dom";


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller,isSellerLoading] = useSeller();
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <progress className="progress w-56 text-orange-500"></progress>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;