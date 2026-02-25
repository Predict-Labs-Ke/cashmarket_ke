"use client";

import React, { createContext, useContext, useState } from "react";

type AuthModalMode = "login" | "signup";

interface AuthModalContextType {
  isOpen: boolean;
  mode: AuthModalMode;
  openModal: (mode?: AuthModalMode) => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("login");

  const openModal = (m: AuthModalMode = "login") => {
    setMode(m);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
