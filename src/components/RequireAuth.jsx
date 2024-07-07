import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth == null ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : jwtDecode(auth?.token).roles?.find((role) =>
      allowedRoles?.includes(role)
    ) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};
