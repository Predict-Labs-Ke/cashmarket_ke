import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import SimulationBanner from "@/components/SimulationBanner";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "CashMarket KE - Kenya's Prediction Market",
  description: "Trade on real-world events. From politics to sports, economy to tech — put your knowledge to work and earn from your predictions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProviderWrapper>
          <AuthProvider>
            <SimulationBanner />
            {children}
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
