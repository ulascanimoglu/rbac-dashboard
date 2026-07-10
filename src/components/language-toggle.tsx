"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={t("lang.toggle")}
      title={t("lang.toggle")}
      onClick={() => setLocale(locale === "en" ? "tr" : "en")}
      className="gap-1.5 font-mono uppercase"
    >
      <Languages className="h-4 w-4" />
      {locale}
    </Button>
  );
}
