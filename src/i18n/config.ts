export const locales = ["uz", "oz", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; og: string }> = {
  uz: { label: "O'zbekcha", short: "UZ", htmlLang: "uz-Latn", og: "uz_UZ" },
  oz: { label: "Ўзбекча", short: "ЎЗ", htmlLang: "uz-Cyrl", og: "uz_UZ" },
  ru: { label: "Русский", short: "RU", htmlLang: "ru", og: "ru_RU" },
};

export const isLocale = (v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v);
