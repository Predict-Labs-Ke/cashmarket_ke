"use client";

import React, { createContext, useContext, useState } from "react";
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
  // Initialize state from localStorage on mount
  const getInitialAuthState = () => {
    if (typeof window === "undefined") {
      return {
        isLoggedIn: false,
        user: null,
        status: "unauthenticated" as const,
      };
    }
    
    const savedAuth = localStorage.getItem("cashmarket_auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        return {
          user: authData.user,
          isLoggedIn: true,
          status: "authenticated" as const,
        };
      } catch {
        return {
          isLoggedIn: false,
          user: null,
          status: "unauthenticated" as const,
        };
      }
    }
    return {
      isLoggedIn: false,
      user: null,
      status: "unauthenticated" as const,
    };
  };

  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    user: typeof MOCK_USER | null;
    status: "loading" | "authenticated" | "unauthenticated";
  }>(getInitialAuthState);
  const router = useRouter();

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
      
      setAuthState({
        user: userData,
        isLoggedIn: true,
        status: "authenticated",
      });
      
      // Save to localStorage
      localStorage.setItem("cashmarket_auth", JSON.stringify({ user: userData }));
    } else {
      throw new Error("Email and password are required");
    }
  };

  const logout = async () => {
    setAuthState({
      user: null,
      isLoggedIn: false,
      status: "unauthenticated",
    });
    localStorage.removeItem("cashmarket_auth");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: authState.isLoggedIn, 
      user: authState.user, 
      login, 
      logout,
      status: authState.status 
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
