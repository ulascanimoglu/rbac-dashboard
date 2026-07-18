"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, ShieldCheck, UserCog, type LucideIcon } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/lib/auth/store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useI18n } from "@/lib/i18n/context";
import { roleLabelKey } from "@/lib/i18n/labels";
import type { MessageKey } from "@/lib/i18n/dictionaries";
import type { Role } from "@/lib/types";

const ROLE_CARDS: { role: Role; icon: LucideIcon; hint: MessageKey }[] = [
  { role: "admin", icon: UserCog, hint: "role.admin.hint" },
  { role: "manager", icon: ShieldCheck, hint: "role.manager.hint" },
  { role: "viewer", icon: Eye, hint: "role.viewer.hint" },
];

const DEMO_USERS: Record<Role, { name: string; email: string }> = {
  admin: { name: "Alex Morgan", email: "alex.morgan@acme.example" },
  manager: { name: "Sam Rivera", email: "sam.rivera@acme.example" },
  viewer: { name: "Jordan Lee", email: "jordan.lee@acme.example" },
};

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const hydrated = useHydrated();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    if (hydrated && user) router.replace("/dashboard");
  }, [hydrated, user, router]);

  function signIn(role: Role) {
    login({ role, ...DEMO_USERS[role] });
    router.push("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute right-4 top-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {t("login.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("login.subtitle")}</p>
        </div>

        <div className="space-y-3">
          {ROLE_CARDS.map(({ role, icon: Icon, hint }) => (
            <button
              key={role}
              type="button"
              onClick={() => signIn(role)}
              className="group flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-foreground/25 hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-foreground">
                  {t("login.continue", { role: t(roleLabelKey[role]) })}
                </div>
                <div className="text-sm text-muted-foreground">{t(hint)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
