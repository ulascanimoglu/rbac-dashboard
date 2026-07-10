"use client";

import { Select } from "@/components/ui/select";
import { ROLES } from "@/lib/auth/permissions";
import { useAuthStore } from "@/lib/auth/store";
import { useI18n } from "@/lib/i18n/context";
import { roleLabelKey } from "@/lib/i18n/labels";
import type { Role } from "@/lib/types";

/** Live role switch — the fastest way to see how RBAC changes the whole UI. */
export function RoleSwitcher() {
  const role = useAuthStore((s) => s.user?.role ?? "viewer");
  const setRole = useAuthStore((s) => s.setRole);
  const { t } = useI18n();

  return (
    <Select
      aria-label={t("users.role")}
      value={role}
      onChange={(e) => setRole(e.target.value as Role)}
      className="h-9 w-auto pr-8"
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {t(roleLabelKey[r])}
        </option>
      ))}
    </Select>
  );
}
