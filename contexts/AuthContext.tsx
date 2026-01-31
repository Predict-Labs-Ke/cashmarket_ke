"use client";

import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string, userType: string = 'user') => {
    const result = await signIn('credentials', {
      email,
      password,
      userType,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const user = session?.user ? {
    name: session.user.name || '',
    email: session.user.email || '',
    avatar: session.user.image || undefined,
    role: (session.user as any).role || 'user',
  } : null;

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: status === "authenticated", 
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
