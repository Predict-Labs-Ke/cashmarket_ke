"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null;
  login: (email: string, password: string, userType?: string) => Promise<void>;
  logout: () => Promise<void>;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const MOCK_USER = {
  name: "Demo User",
  email: "demo@cashmarket.ke",
  avatar: undefined,
  role: "user",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("cashmarket_auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setUser(authData.user);
        setIsLoggedIn(true);
        setStatus("authenticated");
      } catch {
        setStatus("unauthenticated");
      }
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const login = async (email: string, password: string, userType: string = 'user') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple mock authentication - accepts any email/password
    if (email && password) {
      const userData = {
        ...MOCK_USER,
        email: email,
        role: userType,
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      setStatus("authenticated");
      
      // Save to localStorage
      localStorage.setItem("cashmarket_auth", JSON.stringify({ user: userData }));
    } else {
      throw new Error("Email and password are required");
    }
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    setStatus("unauthenticated");
    localStorage.removeItem("cashmarket_auth");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login, 
      logout,
      status 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
