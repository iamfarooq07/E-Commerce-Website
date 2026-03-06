import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idName, setIdName] = useState("");

  // Restore user from localStorage on page refresh (MongoDB auth)
  useEffect(() => {
    const storedUser = localStorage.getItem('ecommerce_user');
    const token = localStorage.getItem('ecommerce_token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIdName(userData.name?.charAt(0).toUpperCase() || userData.email?.charAt(0).toUpperCase() || "");
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Clear invalid data
        localStorage.removeItem('ecommerce_user');
        localStorage.removeItem('ecommerce_token');
      }
    }
  }, []);

  const logout = () => {
    // Clear MongoDB auth tokens
    localStorage.removeItem('ecommerce_token');
    localStorage.removeItem('ecommerce_user');
    localStorage.removeItem('supabase_token');
    setUser(null);
    setIdName("");
    
    // Optional: redirect to login
    // window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        idName,
        setUser,
        setIdName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
