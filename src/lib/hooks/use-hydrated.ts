"use client";

import { useEffect, useState } from "react";

/** Returns false during SSR and the first client render, true afterwards.
 *  Use to gate anything that depends on localStorage-persisted state. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
