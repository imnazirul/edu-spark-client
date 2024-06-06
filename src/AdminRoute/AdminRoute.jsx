/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import useRole from "../CustomHooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <div className="h-20 w-20 md:w-24 md:h-24 border-[6px] md:border-[8px] border-dashed rounded-full animate-spin border-primary-1"></div>
      </div>
    );
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/dashboard/profile"></Navigate>;
};

export default AdminRoute;
