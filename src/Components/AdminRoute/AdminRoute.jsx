import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAdmin from "../useAdmin/useAdmin";



const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isUserAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56 text-orange-600"></progress>
    }

    if (user && isUserAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;