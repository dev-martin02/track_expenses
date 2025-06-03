import { checkAuth } from "@/features/auth/api/api";
import { applicationStore } from "../Store";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setUser } = applicationStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // First check if we're authenticated
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        setUser(isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};