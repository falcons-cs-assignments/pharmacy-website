import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
	const auth = document.cookie.slice(0, 3) === "jwt";

	return auth ? <Outlet /> : <Navigate to='/login-signup' />;
}

export default ProtectedRoutes;
