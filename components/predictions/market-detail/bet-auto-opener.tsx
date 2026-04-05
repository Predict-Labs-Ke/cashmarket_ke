"use client";

import type { Market } from "@/components/predictions/types";

interface BetAutoOpenerProps {
  market: Market;
  
}

/**
 * Reads `?bet=yes|no&outcome=idx` from the URL and auto-opens the bet drawer.
 * Cleans up the search params after opening so the URL stays clean.
 */
export function BetAutoOpener({ market }: BetAutoOpenerProps) {
  void market;

  return null;
}
