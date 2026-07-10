"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleGate } from "@/components/role-gate";
import { StatusBadge } from "@/components/status-badge";
import { useDeleteEmployee, useEmployees } from "@/lib/api/employees";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/dictionaries";
import type { SortableField } from "@/lib/types";

const PAGE_SIZE = 8;

const SORT_COLUMNS: { key: SortableField; label: MessageKey; className?: string }[] = [
  { key: "name", label: "table.name" },
  { key: "department", label: "table.department" },
  { key: "status", label: "table.status" },
  { key: "createdAt", label: "table.created" },
];

export function EmployeeTable() {
  const { t, locale } = useI18n();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortableField>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort, order]);

  const query = useEmployees({ page, pageSize: PAGE_SIZE, search: debouncedSearch, sort, order });
  const remove = useDeleteEmployee();

  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  function toggleSort(key: SortableField) {
    if (key === sort) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSort(key);
      setOrder("asc");
    }
  }

  const total = query.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rows = query.data?.rows ?? [];

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("employees.search")}
          className="pl-9"
          aria-label={t("employees.search")}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                {SORT_COLUMNS.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-medium">
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      {t(col.label)}
                      {sort === col.key ? (
                        order === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                      )}
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">{t("table.jobTitle")}</th>
                <RoleGate permission="employees:delete">
                  <th className="px-4 py-3 text-right font-medium">{t("table.actions")}</th>
                </RoleGate>
              </tr>
            </thead>
            <tbody>
              {query.isError ? (
                <tr>
                  <td colSpan={6} className="px-4 py-14">
                    <EmptyState
                      title={t("error.title")}
                      body={t("error.body")}
                      action={
                        <Button variant="secondary" size="sm" onClick={() => query.refetch()}>
                          {t("error.retry")}
                        </Button>
                      }
                    />
                  </td>
                </tr>
              ) : query.isLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td colSpan={6} className="px-4 py-3">
                      <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-14">
                    <EmptyState title={t("empty.title")} body={t("empty.body")} />
                  </td>
                </tr>
              ) : (
                rows.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{employee.email}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{employee.department}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={employee.status} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">
                      {dateFmt.format(new Date(employee.createdAt))}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{employee.title}</td>
                    <RoleGate permission="employees:delete">
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`${t("action.delete")} ${employee.name}`}
                          title={t("action.delete")}
                          disabled={remove.isPending}
                          onClick={() => {
                            if (window.confirm(`${t("action.delete")} — ${employee.name}?`)) {
                              remove.mutate(employee.id);
                            }
                          }}
                          className="hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </RoleGate>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-mono tabular-nums">
          {t("pagination.showing", { page, pages: pageCount })}
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {t("pagination.prev")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            {t("pagination.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <p className="font-medium text-foreground">{title}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
