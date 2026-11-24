#!/usr/bin/env bash
# GitHub Pages uchun statik build. Faqat CI (yoki toza nusxa) ichida ishga tushiring:
# server qismlari (middleware, API) o'chiriladi.
set -euo pipefail
BASE="${PAGES_BASE_PATH:-}"

rm -f src/middleware.ts
rm -rf src/app/api "src/app/[locale]/[...rest]"

STATIC_EXPORT=1 NEXT_PUBLIC_STATIC=1 PAGES_BASE_PATH="$BASE" npx next build

# Bosh sahifa: brauzer tiliga qarab /uz, /oz yoki /ru ga yo'naltirish
cat > out/index.html <<HTML
<!doctype html><html lang="uz"><head><meta charset="utf-8"><title>VELNOR</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>
  var l = (document.cookie.match(/NEXT_LOCALE=(uz|oz|ru)/) || [])[1];
  if (!l) l = (navigator.language || "").toLowerCase().indexOf("ru") === 0 ? "ru" : "uz";
  location.replace("${BASE}/" + l + "/");
</script>
<noscript><meta http-equiv="refresh" content="0; url=${BASE}/uz/"></noscript>
</head><body style="background:#05060b"></body></html>
HTML

# Noma'lum manzil -> til prefiksi bilan qayta urinish, aks holda bosh sahifa
cat > out/404.html <<HTML
<!doctype html><html><head><meta charset="utf-8"><title>404 · VELNOR</title>
<script>
  var b = "${BASE}", p = location.pathname.slice(b.length);
  if (!/^\/(uz|oz|ru)(\/|$)/.test(p)) location.replace(b + "/uz" + p);
  else location.replace(b + "/" + p.split("/")[1] + "/");
</script></head><body style="background:#05060b"></body></html>
HTML

touch out/.nojekyll
echo "Static site ready in ./out (basePath: '${BASE}')"
