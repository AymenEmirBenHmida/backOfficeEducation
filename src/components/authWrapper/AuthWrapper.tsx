import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requiredRoles,
}) => {
  const { role } = useAuth();
  if (!role) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
