# i18n shartnomasi (uz / oz / ru)

- Tillar: `uz` (o'zbek lotin, asl manba), `oz` (o'zbek kirill — `uz` dan AVTOMATIK transliteratsiya, qo'lda yozilmaydi), `ru` (rus — qo'lda tarjima).
- URL: `/uz/...`, `/oz/...`, `/ru/...`. `src/middleware.ts` prefikssiz manzillarni yo'naltiradi.

## Komponentlarda
- Client komponent: `const c = useContent()` (`@/i18n/I18nProvider`). Matnli ma'lumotlar: `c.site`, `c.nav`, `c.directions`, `c.groups`, `c.stats`, `c.process`, `c.projects`, `c.testimonials`, `c.faqs`, `c.whyUs`, `c.auditPlans`, `c.extraServices`, `c.legal`, `c.requisites`, `c.legalDocs`, `c.getDirection(slug)`, `c.getLegalDoc(slug)`, `c.locale`.
  Matnsiz narsalar (`unsplash`, `images`, `clients`, `techMarquee`, ikonkalar) `@/lib/data` dan import qilinaveradi yoki `c.images` va h.k.
- UI matnlari: `c.t.<ns>.<key>`. Har bir nomlar fazosi `src/i18n/ui/<ns>.ts` faylida: `export const <ns>Uz = {...}` va `export const <ns>Ru: typeof <ns>Uz = {...}`. O'zgaruvchili matn: `"{n} ta xizmat"` + `fmt()` (`@/i18n/fmt`). Matnga funksiya qo'ymang.
- Server sahifalar (`src/app/[locale]/**/page.tsx`): `params: Promise<{ locale: string }>`, `isLocale()` bilan tekshirib `getContent(locale)` (`@/i18n/content`). Metadata `generateMetadata` orqali tilga mos.
- Havolalar: `import Link from "@/i18n/Link"` (ichki "/..." havolalarga til prefiksini o'zi qo'shadi). Boshqa joyda yo'l kerak bo'lsa `useLocalePath()`.
- `src/lib/data.ts`, `site.ts`, `legal.ts` — o'zbekcha asl matn. Rus tarjimasi `src/i18n/ru/*.ts` da, xuddi shu tuzilma va TARTIBda (massivlar indeks bo'yicha birlashtiriladi).
