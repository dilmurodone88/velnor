// Yuridik ma'lumotlar va hujjatlar.
// DIQQAT: barcha rekvizitlar TEST qiymatlar — davlat ro'yxatidan o'tgach haqiqiylariga almashtiring.

export const legal = {
  isTest: true,
  companyName: "\"VELNOR IT SOLUTIONS\" MChJ",
  brand: "VELNOR",
  legalAddress: "100170, Toshkent sh., Mirzo Ulug'bek tumani, Mustaqillik shoh ko'chasi, 00-uy",
  officeAddress: "Toshkent sh., Mirzo Ulug'bek tumani",
  stir: "300 000 000",
  oked: "62010 — Kompyuter dasturlash bo'yicha faoliyat",
  vat: "QQS to'lovchisi, reg. kodi 3260 0000 0000",
  bank: "\"Kapitalbank\" ATB, Mirzo Ulug'bek filiali",
  account: "2020 8000 0000 0000 0001",
  mfo: "00974",
  director: "Bozorov Inomjon Safartosh o'g'li",
  directorPhone: "+998 90 097 49 97",
  registered: "2026-yil, Toshkent sh. Davlat xizmatlari markazi",
  email: "info@velnor.uz",
  phone: "+998 95 064 28 27",
  updated: "24.11.2026",
};

export const requisites = [
  { label: "Tashkilot nomi", value: legal.companyName },
  { label: "Yuridik manzil", value: legal.legalAddress },
  { label: "STIR (INN)", value: legal.stir },
  { label: "OKED", value: legal.oked },
  { label: "QQS", value: legal.vat },
  { label: "Bank", value: legal.bank },
  { label: "Hisob raqam", value: legal.account },
  { label: "MFO", value: legal.mfo },
  { label: "Direktor", value: legal.director },
  { label: "Direktor telefoni", value: legal.directorPhone },
  { label: "Ro'yxatdan o'tgan", value: legal.registered },
];

export type LegalSection = { id: string; title: string; paragraphs?: string[]; items?: string[]; table?: string[][] };
export type LegalDoc = { slug: string; title: string; short: string; intro: string; sections: LegalSection[] };

export const legalDocs: LegalDoc[] = [
  {
    slug: "oferta",
    title: "Ommaviy oferta (xizmat ko'rsatish shartnomasi)",
    short: "Xizmatlarga buyurtma berish, to'lov, topshirish va kafolat shartlari.",
    intro:
      "Ushbu hujjat O'zbekiston Respublikasi Fuqarolik kodeksining 367–369-moddalariga muvofiq ommaviy oferta hisoblanadi. Buyurtmachi ariza yuborishi, hisob-fakturani to'lashi yoki ishni qabul qilishi oferta shartlarini to'liq qabul qilganini (aksept) bildiradi.",
    sections: [
      { id: "atamalar", title: "1. Atamalar", items: [
        "Ijrochi — " + legal.companyName + ".",
        "Buyurtmachi — xizmatga buyurtma bergan yuridik yoki jismoniy shaxs.",
        "Xizmatlar — dasturiy ta'minot ishlab chiqish, AI yechimlar, tizim administratorligi, videokuzatuv, IP-telefoniya, tarmoq, SKUD va IT autsorsing xizmatlari.",
        "Texnik topshiriq (TT) — ish hajmi, muddati va natijasini belgilovchi kelishilgan hujjat.",
        "Dalolatnoma — bajarilgan ishlarni topshirish-qabul qilish hujjati.",
      ] },
      { id: "predmet", title: "2. Shartnoma predmeti", paragraphs: [
        "Ijrochi Buyurtmachining topshirig'iga ko'ra TT, tijorat taklifi yoki hisob-fakturada ko'rsatilgan xizmatlarni ko'rsatadi, Buyurtmachi esa ularni qabul qilib, haqini to'laydi.",
        "Uskunalar yetkazib berilganda ularning ro'yxati, modeli va soni hisob-fakturada yoki spetsifikatsiyada ko'rsatiladi.",
      ] },
      { id: "narx", title: "3. Narx va to'lov tartibi", items: [
        "Xizmatlar narxi tijorat taklifi yoki hisob-fakturada so'mda belgilanadi.",
        "Loyihalar bo'yicha odatiy tartib: 50% oldindan to'lov, 50% dalolatnoma imzolangach. Katta loyihalarda bosqichma-bosqich to'lov kelishiladi.",
        "Oylik abonent xizmatlari (IT autsorsing, muddatli audit, monitoring) har oyning 5-sanasigacha oldindan to'lanadi.",
        "To'lov bank o'tkazmasi, naqd pul, Click yoki Payme orqali amalga oshiriladi.",
        "Narxga kiritilmagan qo'shimcha ishlar alohida kelishiladi va yozma tasdiqlanadi.",
      ] },
      { id: "huquqlar", title: "4. Tomonlarning huquq va majburiyatlari", paragraphs: [
        "Ijrochi: xizmatlarni sifatli va o'z vaqtida ko'rsatadi; Buyurtmachiga ish holati haqida xabar beradi; Buyurtmachining ma'lumotlarini maxfiy saqlaydi; zarur bo'lsa uchinchi shaxslarni (subpudratchilarni) jalb qilish huquqiga ega.",
        "Buyurtmachi: ish uchun zarur ma'lumot, obyektga kirish va sharoitni ta'minlaydi; to'lovni o'z vaqtida amalga oshiradi; bajarilgan ishni 5 ish kuni ichida qabul qiladi yoki asoslangan e'tirozini yozma bildiradi.",
      ] },
      { id: "topshirish", title: "5. Ishlarni topshirish va qabul qilish", items: [
        "Ish yakunida Ijrochi dalolatnoma (va kerak bo'lsa elektron hisob-faktura) taqdim etadi.",
        "Buyurtmachi 5 ish kuni ichida imzolamasa yoki yozma e'tiroz bildirmasa, ish qabul qilingan hisoblanadi.",
        "Dasturiy mahsulotlar uchun manba kodi va kirish ma'lumotlari to'liq to'lovdan so'ng topshiriladi.",
      ] },
      { id: "kafolat", title: "6. Kafolat", items: [
        "Dasturiy ta'minot — topshirilgandan keyin 3 oy bepul xatolarni tuzatish.",
        "Montaj ishlari (SKS, kameralar, SKUD) — 1 yil.",
        "Uskunalar — ishlab chiqaruvchi kafolati (odatda 1–3 yil).",
        "Kafolat Buyurtmachi yoki uchinchi shaxs aralashuvi, elektr tarmog'idagi nosozlik, mexanik shikast va fors-major holatlarida amal qilmaydi.",
      ] },
      { id: "javobgarlik", title: "7. Javobgarlik", paragraphs: [
        "Tomonlar majburiyatlarini bajarmaganlik uchun O'zbekiston Respublikasi qonunchiligiga muvofiq javob beradi. To'lov kechiktirilganda Buyurtmachi har bir kun uchun kechiktirilgan summaning 0,1% miqdorida, lekin jami 10% dan oshmagan penya to'laydi. Ijrochi muddatni o'z aybi bilan buzganda xuddi shunday miqdorda javob beradi.",
        "Ijrochining umumiy javobgarligi tegishli buyurtma summasidan oshmaydi va boy berilgan foydani o'z ichiga olmaydi.",
      ] },
      { id: "maxfiylik", title: "8. Maxfiylik", paragraphs: [
        "Tomonlar shartnoma doirasida olingan tijorat, texnik va shaxsga doir ma'lumotlarni uchinchi shaxslarga oshkor qilmaydi. Shaxsga doir ma'lumotlar Maxfiylik siyosatiga muvofiq qayta ishlanadi.",
      ] },
      { id: "forsmajor", title: "9. Fors-major", paragraphs: [
        "Tomonlar yengib bo'lmaydigan kuchlar (tabiiy ofat, urush, davlat organlari qarorlari, keng ko'lamli elektr yoki aloqa uzilishlari) natijasida majburiyatni bajara olmaganlik uchun javobgar emas. Bunday holat haqida 5 kun ichida xabar beriladi.",
      ] },
      { id: "nizolar", title: "10. Nizolarni hal qilish", paragraphs: [
        "Nizolar muzokaralar yo'li bilan hal qilinadi. Pretenziyaga javob muddati — 10 ish kuni. Kelishuvga erishilmasa, nizo Ijrochi joylashgan joydagi iqtisodiy sudda ko'rib chiqiladi.",
      ] },
      { id: "muddat", title: "11. Amal qilish muddati", paragraphs: [
        "Oferta aksept qilingan paytdan kuchga kiradi va tomonlar majburiyatlarini to'liq bajarguniga qadar amal qiladi. Ijrochi oferta matnini saytda e'lon qilish orqali o'zgartirishi mumkin; o'zgarishlar avval tuzilgan buyurtmalarga ta'sir qilmaydi.",
      ] },
    ],
  },
  {
    slug: "maxfiylik",
    title: "Maxfiylik siyosati",
    short: "Shaxsga doir ma'lumotlarni qanday yig'amiz, saqlaymiz va himoya qilamiz.",
    intro:
      "Ushbu siyosat O'zbekiston Respublikasining \"Shaxsga doir ma'lumotlar to'g'risida\"gi Qonuni (O'RQ-547) talablariga muvofiq ishlab chiqilgan va sayt orqali yig'iladigan ma'lumotlarga tatbiq etiladi.",
    sections: [
      { id: "yigish", title: "1. Qanday ma'lumotlar yig'iladi", items: [
        "Ariza formasidagi ma'lumotlar: ism, telefon, email, kompaniya nomi, tanlangan xizmat, byudjet va xabar matni.",
        "Texnik ma'lumotlar: IP-manzil, brauzer turi, tashrif sahifasi (xavfsizlik va spam'dan himoya uchun).",
        "Biz to'lov kartasi ma'lumotlarini saytda yig'maymiz va saqlamaymiz.",
      ] },
      { id: "maqsad", title: "2. Ma'lumotlardan foydalanish maqsadi", items: [
        "Arizangizga javob berish va konsultatsiya o'tkazish.",
        "Tijorat taklifi, shartnoma va hisob-faktura tayyorlash.",
        "Xizmat sifatini yaxshilash va saytni spam hamda hujumlardan himoya qilish.",
      ] },
      { id: "saqlash", title: "3. Saqlash va himoya", paragraphs: [
        "Ma'lumotlar O'zbekiston hududidagi serverlarda shifrlangan ulanish (HTTPS) orqali qabul qilinadi va kirish huquqi cheklangan ma'lumotlar bazasida saqlanadi. Arizalar 3 yil davomida saqlanadi, so'ng o'chiriladi yoki anonimlashtiriladi.",
      ] },
      { id: "uchinchi", title: "4. Uchinchi shaxslarga berish", paragraphs: [
        "Ma'lumotlar uchinchi shaxslarga sotilmaydi. Ular faqat qonunda belgilangan hollarda vakolatli davlat organlariga yoki xizmat ko'rsatish uchun zarur bo'lgan hamkorlarga (masalan, SMS yoki Telegram bildirishnomalari) minimal hajmda beriladi.",
      ] },
      { id: "cookie", title: "5. Cookie fayllari", paragraphs: [
        "Sayt faqat ishlashi uchun zarur texnik ma'lumotlarni (masalan, sessiya sozlamalari) brauzeringizda saqlaydi. Reklama kuzatuv cookie'lari ishlatilmaydi.",
      ] },
      { id: "huquqlar", title: "6. Sizning huquqlaringiz", items: [
        "Ma'lumotlaringiz qanday qayta ishlanayotgani haqida ma'lumot olish.",
        "Ma'lumotlarni tuzatish yoki o'chirishni talab qilish.",
        "Rozilikni istalgan vaqtda qaytarib olish — " + legal.email + " manziliga yozing, 10 ish kuni ichida javob beramiz.",
      ] },
    ],
  },
  {
    slug: "qoidalar",
    title: "Xizmat ko'rsatish qoidalari va SLA",
    short: "Murojaat tartibi, javob vaqtlari, chiqish va kafolat qoidalari.",
    intro: "Ushbu qoidalar abonent (IT autsorsing, monitoring, muddatli audit) va bir martalik xizmatlarga tatbiq etiladi hamda shartnomaning ajralmas qismi hisoblanadi.",
    sections: [
      { id: "murojaat", title: "1. Murojaat qilish tartibi", items: [
        "Telefon: " + legal.phone + " (24/7 — faqat abonentlar uchun favqulodda holatlar).",
        "Telegram yoki email orqali — tiket avtomatik ro'yxatga olinadi.",
        "Har bir murojaatga raqam beriladi va holati haqida xabar qilinadi.",
      ] },
      { id: "sla", title: "2. Javob va bartaraf etish vaqtlari (SLA)", table: [
        ["Muhimlik", "Misol", "Javob", "Bartaraf etish"],
        ["Kritik", "Internet, server yoki butun ofis ishlamayapti", "15 daqiqa", "4 soatgacha"],
        ["Yuqori", "Bo'lim yoki muhim xizmat to'xtagan", "30 daqiqa", "8 soatgacha"],
        ["O'rta", "Bitta ish joyi, printer, kamera nosoz", "2 soat", "1 ish kuni"],
        ["Past", "Sozlash, maslahat, yangi foydalanuvchi", "1 ish kuni", "3 ish kuni"],
      ] },
      { id: "chiqish", title: "3. Obyektga chiqish", items: [
        "Toshkent shahri bo'ylab shoshilinch chiqish — 2 soat ichida.",
        "Abonentlar uchun rejali chiqishlar shartnomada belgilangan miqdorda bepul.",
        "Viloyatlarga chiqish va ish vaqtidan tashqari ishlar alohida tarif bo'yicha hisoblanadi.",
      ] },
      { id: "ishvaqti", title: "4. Ish vaqti", paragraphs: [
        "Dushanba–Shanba, 09:00–19:00. Abonentlar uchun monitoring va favqulodda yordam 24/7.",
      ] },
      { id: "kafolat", title: "5. Kafolat qoidalari", items: [
        "Kafolat bo'yicha murojaat qilishda dalolatnoma yoki hisob-faktura raqami ko'rsatiladi.",
        "Kafolat ishlari bepul bajariladi, uskunani almashtirish ishlab chiqaruvchi qoidalariga muvofiq.",
        "Uskunada ruxsatsiz o'zgartirish, plombaning buzilishi yoki noto'g'ri ishlatish kafolatni bekor qiladi.",
      ] },
      { id: "xavfsizlik", title: "6. Xavfsizlik va kirish huquqlari", paragraphs: [
        "Buyurtmachi tizimlariga kirish ma'lumotlari faqat biriktirilgan muhandislarda bo'ladi va parol menejerida saqlanadi. Shartnoma tugaganda barcha kirish huquqlari Buyurtmachiga qaytariladi va bizning hisoblarimiz o'chiriladi.",
      ] },
    ],
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug);
