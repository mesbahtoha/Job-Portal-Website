import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;