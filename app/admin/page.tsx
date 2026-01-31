"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

export default function AdminDashboard() {
  const { isLoggedIn, user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (status !== 'loading' && (!isLoggedIn || user?.role !== 'admin')) {
      router.push("/");
    }
  }, [isLoggedIn, user, status, router]);

  // Don't render if not authorized
  if (status === 'loading' || !isLoggedIn || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage markets, users, and platform settings
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Market Management */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Markets</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Create, manage, and resolve prediction markets
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>

          {/* User Management */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-info/10 rounded-xl">
                <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Users</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              View users, manage KYC, and review activity
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>

          {/* Liquidity Pool */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Liquidity</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Monitor and manage platform liquidity pool
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>

          {/* Audit Logs */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-warning/10 rounded-xl">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Audit Logs</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Review all admin actions and system events
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>

          {/* Platform Controls */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-destructive/10 rounded-xl">
                <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Controls</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Platform settings, fees, and trading controls
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>

          {/* Statistics */}
          <div className="bg-card border border-card-border rounded-2xl p-6 hover:bg-card-hover transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Analytics</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Platform statistics and performance metrics
            </p>
            <p className="text-sm text-muted-foreground italic">Coming soon</p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-info/10 border border-info/20 rounded-xl p-4">
          <p className="text-sm text-info">
            <strong>Note:</strong> Admin dashboard features are under development. 
            All API endpoints are already functional and can be accessed programmatically.
            See API_DOCUMENTATION.md for details.
          </p>
        </div>
      </main>
    </div>
  );
}
