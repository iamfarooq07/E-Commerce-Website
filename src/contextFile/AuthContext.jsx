import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/supabase/Supabase";

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

  // 🔹 Page refresh par user restore
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        setIdName(
          data.session.user.email.slice(0, 1).toUpperCase()
        );
      }
    };
    getSession();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIdName("");
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
