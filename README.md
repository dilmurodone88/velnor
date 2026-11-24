# VELNOR IT Solutions — korporativ sayt

Next.js 15 · React 19 · Tailwind CSS 4 · Motion · Prisma + MySQL · Iconsax · Docker · Kubernetes

## Lokal ishga tushirish
```bash
cp .env.example .env        # DATABASE_URL ni o'zingizning MySQL'ga moslang
npm install
npx prisma migrate deploy   # jadvallarni yaratadi
npm run dev                 # http://localhost:3000
```

## Docker (MySQL bilan birga)
```bash
docker-compose up -d --build
```
Sayt: http://localhost:3005 (`WEB_PORT` bilan o'zgartiriladi), MySQL: `localhost:3307` (`MYSQL_PORT`).

## Kubernetes
```bash
docker build --target runner   -t velnor/it-service:latest .
docker build --target migrator -t velnor/it-service-migrator:latest .
kubectl apply -k k8s/
```
`k8s/secret.yaml` va `k8s/ingress.yaml` dagi parol va domenni almashtiring.

## Tahrirlash
- Kompaniya nomi, telefon, manzil: `src/lib/site.ts`
- Yo'nalishlar, xizmatlar, guruhlar, audit narxlari, rasmlar: `src/lib/data.ts`
- Brend rangi: `src/app/globals.css` (`--color-brand-*`)
- Arizalar `Lead` jadvaliga yoziladi; `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` berilsa Telegramga ham keladi.

## Tillar
- `/uz` — o'zbek (lotin, asl manba), `/oz` — o'zbek (kirill, lotindan avtomatik), `/ru` — rus.
- Qoidalar: `src/i18n/README.md`. UI matnlari `src/i18n/ui/*.ts`, rus tarjimasi `src/i18n/ru/*.ts`.

## Yuridik ma'lumotlar
- `src/lib/legal.ts` — rekvizitlar (hozircha TEST qiymatlar), oferta, maxfiylik siyosati, xizmat qoidalari. `isTest: false` qilsangiz "test" belgilari yo'qoladi.
