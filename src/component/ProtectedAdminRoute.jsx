import { Navigate } from "react-router-dom";
import { useEcommerceAuth } from "../contexts/EcommerceAuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useEcommerceAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
