"use client";

import { AddEmployee } from "@/components/employee-form";
import { EmployeeTable } from "@/components/employee-table";
import { useI18n } from "@/lib/i18n/context";

export default function EmployeesPage() {
  const { t } = useI18n();

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {t("employees.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("employees.subtitle")}</p>
        </div>
        <AddEmployee />
      </div>
      <EmployeeTable />
    </div>
  );
}
