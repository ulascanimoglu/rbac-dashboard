"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import type { EmployeeStatus } from "@/lib/types";
import type { MessageKey } from "@/lib/i18n/dictionaries";

const tone: Record<EmployeeStatus, "success" | "warning" | "primary"> = {
  active: "success",
  on_leave: "warning",
  invited: "primary",
};

const label: Record<EmployeeStatus, MessageKey> = {
  active: "status.active",
  on_leave: "status.on_leave",
  invited: "status.invited",
};

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  const { t } = useI18n();
  return <Badge tone={tone[status]}>{t(label[status])}</Badge>;
}
