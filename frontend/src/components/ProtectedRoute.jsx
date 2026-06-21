import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoadingScreen = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <p className="text-gray-600">Loading...</p>
  </div>
);

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
