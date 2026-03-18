import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;