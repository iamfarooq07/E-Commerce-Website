import { Navigate, useLocation } from 'react-router-dom';
import { useEcommerceAuth } from '@/contexts/EcommerceAuthContext';

const ProtectedRoute = ({ children, adminOnly = false, vendorOnly = false }) => {
  const { user, loading, isAdmin, isVendor } = useEcommerceAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (vendorOnly && !isVendor && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
