"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/lib/types";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      setRole: (role) => set((s) => (s.user ? { user: { ...s.user, role } } : s)),
    }),
    { name: "rbac-dashboard.auth" },
  ),
);
