"use client";

import { Mail, Plane, UserCheck, Users } from "lucide-react";
import { DepartmentChart } from "@/components/department-chart";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { useStats } from "@/lib/api/employees";
import { useI18n } from "@/lib/i18n/context";

export default function DashboardPage() {
  const { t } = useI18n();
  const { data, isLoading } = useStats();
  const show = (value: number | undefined) => (isLoading ? "—" : (value ?? 0));

  return (
    <div>
      <PageHeader title={t("dashboard.title")} subtitle={t("dashboard.subtitle")} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("stats.total")} value={show(data?.total)} icon={Users} />
        <StatCard label={t("stats.active")} value={show(data?.active)} icon={UserCheck} />
        <StatCard label={t("stats.onLeave")} value={show(data?.onLeave)} icon={Plane} />
        <StatCard label={t("stats.invited")} value={show(data?.invited)} icon={Mail} />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-medium text-foreground">{t("chart.title")}</h2>
        {data ? (
          <DepartmentChart data={data.byDepartment} />
        ) : (
          <div className="h-64 animate-pulse rounded bg-muted" />
        )}
      </div>
    </div>
  );
}
