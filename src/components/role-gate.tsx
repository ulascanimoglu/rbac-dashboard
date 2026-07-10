"use client";

import { type ReactNode } from "react";
import { usePermissions } from "@/lib/auth/permissions";
import type { Permission } from "@/lib/types";

/** Renders children only when the signed-in user holds the given permission. */
export function RoleGate({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { can } = usePermissions();
  return <>{can(permission) ? children : fallback}</>;
}
