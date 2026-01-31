"use client";

/**
 * Simple wrapper component (no longer uses next-auth)
 * Kept for compatibility with existing layout structure
 */
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
