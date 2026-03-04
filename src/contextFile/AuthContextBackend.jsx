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

export default function AuthProviderBackend({ children }) {
  const [user, setUser] = useState(null);
  const [idName, setIdName] = useState("");
  const navigate = useNavigate();

  // Restore user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIdName(userData.name?.charAt(0).toUpperCase() || "");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIdName("");
    navigate('/login');
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
