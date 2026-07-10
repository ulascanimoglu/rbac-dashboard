"use client";

import { useRouter } from "next/navigation";
import { usePermissions } from "@/lib/auth/permissions";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { roleLabelKey } from "@/lib/i18n/labels";
import type { Permission } from "@/lib/types";

export function PermissionGuard({
  permission,
  children,
}: {
  permission: Permission;
  children: React.ReactNode;
}) {
  const { can, role } = usePermissions();
  const { t } = useI18n();
  const router = useRouter();

  if (can(permission)) return <>{children}</>;

  const roleName = role ? t(roleLabelKey[role]) : "";
  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-8 text-center">
      <h2 className="font-display text-lg font-semibold text-foreground">{t("rbac.denied.title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("rbac.denied.body", { role: roleName })}</p>
      <Button variant="secondary" className="mt-5" onClick={() => router.push("/dashboard")}>
        {t("rbac.denied.back")}
      </Button>
    </div>
  );
}
