// Kompaniya ma'lumotlari — barcha joyda shu yerdan olinadi.
// Nomini, telefon va manzilni o'zingiznikiga almashtiring.
export const site = {
  name: "VELNOR",
  suffix: "IT Solutions",
  tagline: "Biznesingiz uchun to'liq IT ekotizim",
  description:
    "Dasturiy ta'minot, AI yechimlar, tizim administratorligi, videokuzatuv, IP-telefoniya va tarmoq infratuzilmasi — barchasi bitta IT kompaniyada.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: "+998 95 064 28 27",
  phoneHref: "tel:+998950642827",
  email: "info@velnor.uz",
  address: "Toshkent sh., Mirzo Ulug'bek tumani",
  workHours: "Du–Sha: 09:00 – 19:00 · Support: 24/7",
  telegramHandle: "@MrDeveloper2827",
  instagramHandle: "@khurshid_ismoilov28",
  socials: {
    telegram: "https://t.me/MrDeveloper2827",
    instagram: "https://www.instagram.com/khurshid_ismoilov28/",
  },
};

export const nav = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Xizmatlar", href: "/xizmatlar", mega: true },
  { label: "Jarayon", href: "/#jarayon" },
  { label: "Loyihalar", href: "/#loyihalar" },
  { label: "Savollar", href: "/#savollar" },
  { label: "Aloqa", href: "/aloqa" },
];
