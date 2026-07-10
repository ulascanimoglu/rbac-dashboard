"use client";

import { PageHeader } from "@/components/page-header";
import { PermissionGuard } from "@/components/permission-guard";
import { useI18n } from "@/lib/i18n/context";

export default function SettingsPage() {
  const { t } = useI18n();

  return (
    <PermissionGuard permission="settings:manage">
      <PageHeader title={t("settings.title")} subtitle={t("settings.subtitle")} />
      <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        {t("settings.placeholder")}
      </div>
    </PermissionGuard>
  );
}
