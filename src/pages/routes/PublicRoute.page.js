import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import NavBar from "../../components/nav/NavBar.component";

const PublicRoute = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default PublicRoute;