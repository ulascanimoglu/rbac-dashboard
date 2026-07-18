"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import type { EmployeeStatus } from "@/lib/types";
import type { MessageKey } from "@/lib/i18n/dictionaries";

const tone: Record<EmployeeStatus, "success" | "warning" | "neutral"> = {
  active: "success",
  on_leave: "warning",
  invited: "neutral",
};

const label: Record<EmployeeStatus, MessageKey> = {
  active: "status.active",
  on_leave: "status.on_leave",
  invited: "status.invited",
};

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  const { t } = useI18n();
  return (
    <Badge dot tone={tone[status]}>
      {t(label[status])}
    </Badge>
  );
}
