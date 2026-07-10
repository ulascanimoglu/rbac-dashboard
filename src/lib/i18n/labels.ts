import type { MessageKey } from "@/lib/i18n/dictionaries";
import type { EmployeeStatus, Permission, Role } from "@/lib/types";

export const roleLabelKey: Record<Role, MessageKey> = {
  admin: "role.admin",
  manager: "role.manager",
  viewer: "role.viewer",
};

export const statusLabelKey: Record<EmployeeStatus, MessageKey> = {
  active: "status.active",
  on_leave: "status.on_leave",
  invited: "status.invited",
};

export const permissionLabelKey: Record<Permission, MessageKey> = {
  "employees:read": "permission.employees_read",
  "employees:create": "permission.employees_create",
  "employees:delete": "permission.employees_delete",
  "users:read": "permission.users_read",
  "settings:manage": "permission.settings_manage",
};
