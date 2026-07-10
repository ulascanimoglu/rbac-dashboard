import type { Permission, Role } from "@/lib/types";
import { useAuthStore } from "@/lib/auth/store";

/** The single source of truth for what each role is allowed to do. */
export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: ["employees:read", "employees:create", "employees:delete", "users:read", "settings:manage"],
  manager: ["employees:read", "employees:create"],
  viewer: ["employees:read"],
};

export const ROLES: readonly Role[] = ["admin", "manager", "viewer"];

export const ALL_PERMISSIONS: readonly Permission[] = [
  "employees:read",
  "employees:create",
  "employees:delete",
  "users:read",
  "settings:manage",
];

export function hasPermission(role: Role | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

/** Permission checks bound to the currently signed-in user. */
export function usePermissions() {
  const role = useAuthStore((s) => s.user?.role ?? null);
  return {
    role,
    can: (permission: Permission) => hasPermission(role, permission),
  };
}
