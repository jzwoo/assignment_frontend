import React from "react";
import useUser from "../hooks/useUser";
import {Navigate, Outlet} from "react-router-dom";

const RequireAuth: React.FC = () => {
    const {user} = useUser();

    return (
        user.name ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default RequireAuth