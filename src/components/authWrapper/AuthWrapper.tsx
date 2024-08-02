import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface AuthWrapperProps {
  route: RouteConfig;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ route, children }) => {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (route.requiredRoles && route.requiredRoles.length > 0) {
    if (!role || !route.requiredRoles.includes(role)) {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthWrapper;
