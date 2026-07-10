"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RoleGate } from "@/components/role-gate";
import { useCreateEmployee } from "@/lib/api/employees";
import { employeeCreateSchema, type EmployeeCreateInput } from "@/lib/schemas/employee";
import { DEPARTMENTS, STATUSES, type EmployeeStatus } from "@/lib/types";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/dictionaries";

const statusLabel: Record<EmployeeStatus, MessageKey> = {
  active: "status.active",
  on_leave: "status.on_leave",
  invited: "status.invited",
};

export function AddEmployee() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <RoleGate permission="employees:create">
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        {t("employees.add")}
      </Button>
      {open ? <EmployeeDialog onClose={() => setOpen(false)} /> : null}
    </RoleGate>
  );
}

function EmployeeDialog({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const create = useCreateEmployee();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeCreateInput>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: { name: "", email: "", department: "Engineering", title: "", status: "active" },
  });

  async function onSubmit(values: EmployeeCreateInput) {
    await create.mutateAsync(values);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("form.heading")}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-fade-in rounded-lg border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">{t("form.heading")}</h2>
            <p className="text-sm text-muted-foreground">{t("form.hint")}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label={t("form.cancel")} onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label={t("form.field.name")} error={errors.name?.message}>
            <Input {...register("name")} autoFocus />
          </Field>
          <Field label={t("form.field.email")} error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label={t("form.field.department")} error={errors.department?.message}>
              <Select {...register("department")}>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("form.field.status")} error={errors.status?.message}>
              <Select {...register("status")}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {t(statusLabel[s])}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label={t("form.field.jobTitle")} error={errors.title?.message}>
            <Input {...register("title")} />
          </Field>

          {create.isError ? (
            <p className="text-sm text-danger">{(create.error as Error).message}</p>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={onClose}>
              {t("form.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("form.saving") : t("form.submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {error ? <span className="block text-xs text-danger">{error}</span> : null}
    </label>
  );
}
