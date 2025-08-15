"use client";

import { validateSession } from "@/actions/auth";
import { User } from "@/lib/types";

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

interface AuthContext {
  user: User | null;
  setUser: ((user: User) => void) | null;
  loading: boolean;
}

const initialContext: AuthContext = {
  user: null,
  setUser: null,
  loading: false,
};

const AuthContext = createContext(initialContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const validateUser = useCallback(async () => {
    if (initialized) return; // Prevent multiple calls

    setLoading(true);
    try {
      const { user } = await validateSession();
      setUser(user);
    } catch (error: unknown) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
