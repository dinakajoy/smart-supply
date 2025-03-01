import { useState, useEffect, useCallback } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import { AuthContext } from "./AuthContext";
import CircularLoader from "../../components/Loaders/Circular";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to check if the session is valid on page load
  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/session`, {
        method: "GET",
        credentials: "include", // Important to send cookies with request
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
    logout: handleLogout,
    refreshSession: checkSession, // Allows re-fetching session manually
  };


  // Don't render children until session check completes
  if (loading) return <CircularLoader />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
