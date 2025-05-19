import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { app } from "@/lib/firebase";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="flex space-x-2" role="status">
          <LoaderCircle
            className="animate-spin"
            aria-hidden="true"
            focusable="false"
          />
          <span>Проверка авторизации...</span>
        </div>
      </section>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
