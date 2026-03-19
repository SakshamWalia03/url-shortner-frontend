import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAccessToken } from "./store/authSlice";

const PrivateRoute = ({ children, publicPage }) => {
  const token = useSelector(selectAccessToken);
  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
