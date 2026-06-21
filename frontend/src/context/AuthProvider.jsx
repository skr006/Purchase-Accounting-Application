import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { apiFetch } from "../lib/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch("/api/v1/users/profile")
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = ({ token, user: nextUser }) => {
    localStorage.setItem("token", token);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (nextUser) => {
    setUser(nextUser);
  };

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateUser,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
