"use client";

import { Check, Minus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PermissionGuard } from "@/components/permission-guard";
import { Badge } from "@/components/ui/badge";
import { ALL_PERMISSIONS, hasPermission, ROLES } from "@/lib/auth/permissions";
import { useI18n } from "@/lib/i18n/context";
import { permissionLabelKey, roleLabelKey } from "@/lib/i18n/labels";

export default function UsersPage() {
  const { t } = useI18n();

  return (
    <PermissionGuard permission="users:read">
      <PageHeader title={t("users.title")} subtitle={t("users.subtitle")} />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">{t("users.role")}</th>
                {ALL_PERMISSIONS.map((permission) => (
                  <th key={permission} className="px-4 py-3 text-center font-medium">
                    {t(permissionLabelKey[permission])}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Badge>{t(roleLabelKey[role])}</Badge>
                  </td>
                  {ALL_PERMISSIONS.map((permission) => (
                    <td key={permission} className="px-4 py-3 text-center">
                      {hasPermission(role, permission) ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PermissionGuard>
  );
}
