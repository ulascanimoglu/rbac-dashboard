"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { usePermissions } from "@/lib/auth/permissions";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/dictionaries";
import type { Permission } from "@/lib/types";

interface NavItem {
  href: string;
  label: MessageKey;
  icon: LucideIcon;
  permission?: Permission;
}

const NAV: NavItem[] = [
  { href: "/dashboard", label: "nav.dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "nav.employees", icon: Users, permission: "employees:read" },
  { href: "/users", label: "nav.users", icon: ShieldCheck, permission: "users:read" },
  { href: "/settings", label: "nav.settings", icon: Settings, permission: "settings:manage" },
];

function useNavItems() {
  const { can } = usePermissions();
  return NAV.filter((item) => !item.permission || can(item.permission));
}

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const items = useNavItems();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <span className="font-display text-base font-semibold tracking-tight">{t("app.name")}</span>
      </div>
      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const items = useNavItems();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {t(item.label)}
          </Link>
        );
      })}
    </nav>
  );
}
