"use client";

import { useState, useMemo } from "react";

/**
 * Simulation Mode Banner
 * 
 * Displays a prominent banner when the app is in simulation mode
 * to remind users that all data and transactions are simulated.
 */
export default function SimulationBanner() {
  const [dismissed, setDismissed] = useState(false);
  
  // Calculate simulation mode - memoized to avoid recalculation on every render
  const isSimulation = useMemo(() => {
    return process.env.NEXT_PUBLIC_SIMULATION_MODE === 'true' || 
           process.env.NODE_ENV === 'development';
  }, []);

  // Don't show banner if simulation mode is disabled or user dismissed it
  if (!isSimulation || dismissed) {
    return null;
  }

  return (
    <div className="bg-amber-500/20 border-b-2 border-amber-500/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <span className="text-2xl">🧪</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900 dark:text-amber-100">
                SIMULATION MODE
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-200 mt-0.5">
                You are using sample data. All transactions are simulated and no real money is involved.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              DEMO MODE
            </span>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
              aria-label="Dismiss simulation banner"
            >
              <svg
                className="w-4 h-4 text-amber-900 dark:text-amber-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
