"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { RoleSwitcher } from "@/components/role-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/lib/auth/store";
import { useI18n } from "@/lib/i18n/context";

export function Header() {
  const router = useRouter();
  const { t } = useI18n();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">{user?.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <RoleSwitcher />
        <LanguageToggle />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("header.signOut")}
          title={t("header.signOut")}
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
