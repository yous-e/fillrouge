import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, register as registerApi, getProfile, logout as logoutApi } from "../api/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await loginApi({ email, password });
    localStorage.setItem("token", data.token);
    await fetchProfile();
    return data;
  };

  const register = async (payload) => {
    const { data } = await registerApi(payload);
    localStorage.setItem("token", data.token);
    await fetchProfile();
    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
