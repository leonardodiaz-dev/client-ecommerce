import { Navigate, useLocation } from "react-router-dom"
import { type ReactNode } from 'react';
import { useAuth } from "../../context/useAuth";

interface MyComponentProps {
  children?: ReactNode;
}
const ProtectedRoute = ({ children }: MyComponentProps) => {

  const { isAuthenticated, loading } = useAuth()
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children
}

export default ProtectedRoute