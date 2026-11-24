import { Activity, Buildings2, CallCalling, Car, Chart2, CloudConnection, Code, Cpu, Data, Driver, Driver2, Element3, Eye, FingerScan, Global, Headphone, Hierarchy, Hierarchy3, Lock, MagicStar, Magicpen, MessageText, Messages2, Mobile, Monitor, Notification, People, Routing, Routing2, Scan, Setting2, ShieldTick, Speedometer, VideoIcon, Wifi, Windows, CommandSquare, Key, LampCharge, Alarm, Teacher, Radar, SecurityUser, SecurityCard, CalendarTick, Login, Printer, ScanBarcode, type IconType } from "@/components/ui/icons";

export type SubService = { title: string; desc: string; icon: IconType };

export type Direction = {
  slug: string;
  num: string;
  title: string;
  heroWord: string;
  short: string;
  headline: string;
  description: string;
  icon: IconType;
  image: string; // Unsplash rasm ID
  from: string; // gradient boshlanishi
  to: string; // gradient oxiri
  items: SubService[];
  features: string[];
  tech: string[];
  stats: { value: string; label: string }[];
};

export const directions: Direction[] = [
  {
    slug: "dasturlash",
    num: "01",
    title: "Dasturiy ta'minot",
    heroWord: "Dasturlash",
    short: "Mobile, Web, CRM, botlar va data analitika",
    headline: "G'oyadan tayyor mahsulotgacha — kod, dizayn va ishga tushirish",
    description:
      "Biznes jarayonlaringizni avtomatlashtiruvchi mobil ilovalar, veb-platformalar, CRM/ERP tizimlar, Telegram botlar va analitik dashboardlarni noldan yaratamiz va qo'llab-quvvatlaymiz.",
    icon: Code,
    image: "photo-1498050108023-c5249f4df085",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "Mobil ilovalar", desc: "iOS va Android uchun Flutter / React Native ilovalar, App Store va Play Marketga chiqarish.", icon: Mobile },
      { title: "Veb-platformalar", desc: "Korporativ saytlar, marketplace, SaaS va kabinetlar — Next.js, Node, Laravel.", icon: Global },
      { title: "CRM / ERP tizimlar", desc: "Savdo, ombor, moliya va xodimlarni bitta tizimda boshqarish.", icon: Element3 },
      { title: "Telegram botlar", desc: "Savdo, buyurtma, to'lov (Click, Payme) va qo'llab-quvvatlash botlari.", icon: Messages2 },
      { title: "Data analitika", desc: "BI dashboardlar, hisobotlar, prognozlash va ma'lumotlar omborlari.", icon: Chart2 },
      { title: "Integratsiyalar", desc: "1C, to'lov tizimlari, SMS, IP-telefoniya va tashqi API bilan bog'lash.", icon: Routing2 },
    ],
    features: ["UI/UX dizayn va prototip", "Agile sprintlar va shaffof hisobot", "Kod sifati va avtotestlar", "CI/CD, Docker, Kubernetes deploy", "Kafolat va texnik qo'llab-quvvatlash"],
    tech: ["Next.js", "React", "Flutter", "Node.js", "NestJS", "Python", "Laravel", "PostgreSQL", "MySQL", "Redis"],
    stats: [
      { value: "120+", label: "Tayyor loyiha" },
      { value: "4.9", label: "Mijoz bahosi" },
      { value: "3 oy", label: "Bepul kafolat" },
    ],
  },
  {
    slug: "ai-yechimlar",
    num: "02",
    title: "AI yechimlar",
    heroWord: "AI yechimlar",
    short: "Shaxsiy AI, assistentlar, kamera AI, avtomatlashtirish",
    headline: "Sun'iy intellekt sizning eng mehnatkash xodimingiz bo'ladi",
    description:
      "Kompaniyangiz uchun shaxsiy (on-premise) AI qurib, uni tizimlaringizga moslashtiramiz: 24/7 AI assistentlar, kameralar uchun yuz va raqam aniqlash, hujjat tahlili va jarayonlarni avtomatlashtirish.",
    icon: MagicStar,
    image: "photo-1677442135703-1787eea5ce01",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "AI chat-assistentlar", desc: "Sayt, Telegram va Instagram uchun o'zbek, rus, ingliz tilida javob beruvchi aqlli operator.", icon: MessageText },
      { title: "Kamera uchun AI", desc: "Yuzni tanish, odam sanash, xavfli holatlarni aniqlash va real-vaqt ogohlantirish.", icon: Scan },
      { title: "Avto raqamni aniqlash", desc: "ANPR: shlagbaum, parkovka va avtomoyka uchun raqamni avtomatik o'qish.", icon: Car },
      { title: "Ovozli AI operator", desc: "Qo'ng'iroqlarni qabul qiluvchi va CRMga yozuvchi ovozli bot (Asterisk bilan).", icon: Headphone },
      { title: "Hujjat va OCR", desc: "Pasport, hisob-faktura va shartnomalarni avtomatik o'qish va tasniflash.", icon: FingerScan },
      { title: "Biznes avtomatlashtirish", desc: "LLM agentlar: hisobot, xat, tahlil va takroriy ishlarni avtomatlashtirish.", icon: Magicpen },
      { title: "Shaxsiy AI qurish", desc: "Kompaniya serverida ishlaydigan yopiq LLM — ma'lumotlar tashqariga chiqmaydi (on-premise).", icon: SecurityUser },
      { title: "Tizimga moslashtirish", desc: "Modelni hujjatlaringiz va jarayonlaringizga o'qitish: fine-tuning, RAG, o'z atamalaringiz.", icon: Setting2 },
      { title: "Ichki tizimlarga ulash", desc: "AI ni 1C, CRM, ERP, ABS va ichki bazalarga API orqali ulab, amallar bajaradigan agent qilish.", icon: Routing2 },
    ],
    features: ["Ma'lumotlaringiz asosida o'qitish (RAG)", "On-premise yoki bulutda joylashtirish", "CRM va 1C bilan integratsiya", "Ma'lumotlar maxfiyligi kafolati", "Natijani o'lchash va optimallashtirish"],
    tech: ["OpenAI", "Claude", "LLaMA", "Qwen", "vLLM", "Ollama", "YOLO", "OpenCV", "PyTorch", "LangChain", "Whisper", "Qdrant", "FastAPI"],
    stats: [
      { value: "-70%", label: "Operator yuklamasi" },
      { value: "24/7", label: "Uzluksiz ishlash" },
      { value: "98%", label: "Aniqlash aniqligi" },
    ],
  },
  {
    slug: "tizim-administratorlik",
    num: "03",
    title: "Tizim administratorligi",
    heroWord: "Sysadmin",
    short: "Kerio, FortiGate, Windows/Ubuntu serverlar, Zabbix",
    headline: "Serverlar, xavfsizlik va monitoring — hammasi nazorat ostida",
    description:
      "Kompaniyangiz IT infratuzilmasini to'liq boshqaramiz: Kerio va FortiGate firewall, internet shlyuzlar, Windows Server va Ubuntu serverlar, virtualizatsiya, zaxira nusxa va Zabbix orqali ichki 24/7 monitoring.",
    icon: ShieldTick,
    image: "photo-1558494949-ef010cbdcc31",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "Kerio Control / Connect", desc: "Internet nazorati, VPN, trafik cheklovlari va korporativ pochta serveri.", icon: Lock },
      { title: "Fortinet FortiGate", desc: "NGFW, IPS, SD-WAN, filiallarni xavfsiz bog'lash va siyosatlar.", icon: ShieldTick },
      { title: "MikroTik / Cisco", desc: "Routing, VLAN, load-balancing, bir nechta provayderni ulash.", icon: Routing },
      { title: "Windows Server", desc: "Active Directory, GPO, DNS/DHCP, fayl server, RDP terminal va WSUS.", icon: Windows },
      { title: "Ubuntu / Linux serverlar", desc: "Nginx, Docker, PostgreSQL/MySQL, pochta, 1C server va xavfsiz SSH.", icon: CommandSquare },
      { title: "Virtualizatsiya", desc: "Proxmox, VMware ESXi, Hyper-V — bitta serverda o'nlab virtual mashina.", icon: Driver },
      { title: "Ichki monitoring", desc: "Zabbix + Grafana: server, disk, port, printer va kameralar 24/7, Telegramga ogohlantirish.", icon: Activity },
      { title: "Internet shlyuzlar", desc: "Multi-WAN gateway, avtomatik zaxira kanal (failover), QoS va trafik hisobi.", icon: Global },
      { title: "Backup va DR", desc: "Avtomatik zaxira nusxalar, tiklash rejasi va ma'lumotlar xavfsizligi.", icon: Driver2 },
    ],
    features: ["Infratuzilma auditi va hujjatlash", "Oylik abonent xizmat (SLA)", "Masofaviy va joyida yordam", "Xavfsizlik siyosatlari", "Grafana dashboardlar"],
    tech: ["Kerio", "FortiGate", "MikroTik", "Cisco", "Windows Server", "Ubuntu", "Zabbix", "Grafana", "Proxmox", "VMware", "Docker"],
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "15 daq", label: "Javob vaqti" },
      { value: "80+", label: "Xizmatdagi ofis" },
    ],
  },
  {
    slug: "videokuzatuv",
    num: "04",
    title: "Videokuzatuv tizimlari",
    heroWord: "Videokuzatuv",
    short: "IP kameralar, NVR, AI analitika, telefondan kuzatish",
    headline: "Har bir burchak ko'z ostida — aqlli videokuzatuv",
    description:
      "Ofis, do'kon, ombor, zavod va turar-joylar uchun IP kameralarni loyihalash, o'rnatish va sozlash. Telefondan kuzatish, AI analitika va kirish nazorati tizimlari.",
    icon: VideoIcon,
    image: "photo-1557597774-9d273605dfa9",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "IP kameralar o'rnatish", desc: "Hikvision, Dahua, Uniview — 2MP dan 4K gacha, ichki va tashqi kameralar.", icon: VideoIcon },
      { title: "NVR va arxiv", desc: "30–90 kunlik arxiv, RAID, bulutli zaxira va tezkor qidiruv.", icon: Data },
      { title: "Telefondan kuzatish", desc: "Dunyoning istalgan joyidan mobil ilova orqali jonli efir va arxiv.", icon: Mobile },
      { title: "AI video analitika", desc: "Yuzni tanish, chiziqni kesib o'tish, odam sanash, olov va tutun aniqlash.", icon: Eye },
      { title: "Monitoring markazi", desc: "Videodevor, ko'p obyektli markaz va operator ish joylari.", icon: Monitor },
      { title: "Servis va ta'mirlash", desc: "Mavjud tizimni yangilash, profilaktika va kafolatli xizmat.", icon: Setting2 },
    ],
    features: ["Bepul obyekt ko'rigi", "3D loyiha va smeta", "Toza montaj, kabel kanallar", "Kafolat 1–3 yil", "AI modullarni ulash"],
    tech: ["Hikvision", "Dahua", "Uniview", "Ezviz", "ZKTeco", "Milestone", "Frigate", "YOLO"],
    stats: [
      { value: "5 000+", label: "O'rnatilgan kamera" },
      { value: "1 kun", label: "O'rtacha montaj" },
      { value: "3 yil", label: "Kafolat" },
    ],
  },
  {
    slug: "ip-telefoniya",
    num: "05",
    title: "IP-telefoniya va Call-markaz",
    heroWord: "IP-telefoniya",
    short: "Asterisk, FreePBX, SIP, CRM integratsiya",
    headline: "Bitta raqam — cheksiz liniya, hech bir qo'ng'iroq yo'qolmaydi",
    description:
      "Asterisk va FreePBX asosida ofis ATS, call-markaz, IVR ovozli menyu, qo'ng'iroqlarni yozib olish va CRM bilan integratsiya. Xarajatlarni kamaytirib, savdoni oshiramiz.",
    icon: CallCalling,
    image: "photo-1553775282-20af80779df7",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "Asterisk / FreePBX ATS", desc: "Ichki raqamlar, guruhlar, navbat va ofislararo bepul aloqa.", icon: CallCalling },
      { title: "Call-markaz", desc: "Operatorlar paneli, navbat, statistikalar va sifat nazorati.", icon: Headphone },
      { title: "IVR ovozli menyu", desc: "\"1 ni bosing...\" — professional ovozli yo'naltirish va avto-javob.", icon: Routing2 },
      { title: "CRM integratsiya", desc: "amoCRM, Bitrix24 va o'z CRM'ingizga qo'ng'iroqlarni avtomatik yozish.", icon: Element3 },
      { title: "Yozib olish va tahlil", desc: "Barcha suhbatlar arxivi, AI transkripsiya va sifat bahosi.", icon: Chart2 },
      { title: "IP telefon apparatlari", desc: "Yealink, Grandstream, Fanvil apparatlarini yetkazish va sozlash.", icon: Notification },
    ],
    features: ["SIP provayderlarni ulash", "Mobil softphone ilovalar", "Filiallarni bitta tarmoqqa", "Yo'qotilgan qo'ng'iroq = 0", "AI ovozli bot qo'shish"],
    tech: ["Asterisk", "FreePBX", "Issabel", "SIP", "WebRTC", "Yealink", "Grandstream", "Bitrix24", "amoCRM"],
    stats: [
      { value: "-40%", label: "Aloqa xarajati" },
      { value: "0", label: "Yo'qolgan qo'ng'iroq" },
      { value: "200+", label: "Operator joyi" },
    ],
  },
  {
    slug: "tarmoq-autsorsing",
    num: "06",
    title: "Tarmoq va IT autsorsing",
    heroWord: "IT autsorsing",
    short: "Internet, SKS, ofis kompyuterlari, kompyuter xonalar",
    headline: "Ofisingiz IT bo'limi — bizning jamoa",
    description:
      "Internet ulash, SKS va Wi-Fi, ofis kompyuterlari va printerlar, kompyuter xonalarni noldan ochish, server xonasi va doimiy IT autsorsing — xodim yollamasdan to'liq IT bo'lim.",
    icon: Hierarchy,
    image: "photo-1544197150-b99a580bb7a8",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "SKS — kabel tarmoq", desc: "Cat6/optika, server shkafi, patch-panel, sertifikatlangan montaj.", icon: Hierarchy3 },
      { title: "Internet ulash", desc: "Provayder tanlash, optika tortish, zaxira kanal va statik IP — bir kunda.", icon: Global },
      { title: "Korporativ Wi-Fi", desc: "Ubiquiti, Ruckus, MikroTik — butun bino bo'ylab uzluksiz signal.", icon: Wifi },
      { title: "Ofis kompyuterlari", desc: "Ish joylarini yig'ish, Windows va dasturlarni o'rnatish, domenga ulash.", icon: Monitor },
      { title: "Kompyuter xonalar ochish", desc: "O'quv markaz, maktab va IT-sinflar uchun 10–100 ta kompyuterli xona — kalit topshirish.", icon: Teacher },
      { title: "Printer va periferiya", desc: "Tarmoq printerlar, skanerlar, MFU, proyektor va konferens-zal jihozlari.", icon: Printer },
      { title: "Server xonasi", desc: "Shkaf, UPS, sovutish, elektr va yong'in xavfsizligi.", icon: Cpu },
      { title: "IT autsorsing", desc: "Oylik abonent: helpdesk, profilaktika, yangi xodimlar uchun sozlash.", icon: People },
      { title: "Bulut va Microsoft 365", desc: "Google Workspace, M365, korporativ pochta va hujjatlar almashinuvi.", icon: CloudConnection },
    ],
    features: ["Shtatdagi IT xodimdan 3x arzon", "Helpdesk va tiket tizimi", "Oylik hisobot", "Uskunalar yetkazib berish", "Shoshilinch chiqish 2 soatda"],
    tech: ["Ubiquiti", "MikroTik", "Cisco", "TP-Link Omada", "APC", "Microsoft 365", "Google Workspace", "GLPI"],
    stats: [
      { value: "3x", label: "Tejamkorlik" },
      { value: "2 soat", label: "Chiqish vaqti" },
      { value: "1500+", label: "Ish joyi ulangan" },
    ],
  },
  {
    slug: "smart-ofis",
    num: "07",
    title: "Smart ofis va SKUD",
    heroWord: "Smart ofis",
    short: "Barmoq izi, Face ID, turniket, davomat",
    headline: "Ofisga kirish-chiqish — barmoq izi va yuz orqali, davomat avtomatik",
    description:
      "Barmoq izi va Face ID terminallar, turniket va elektron qulflar, xodimlar davomati hisobi, domofon, signalizatsiya hamda aqlli yoritish — ofisingizni xavfsiz va aqlli qilamiz.",
    icon: FingerScan,
    image: "photo-1585079374502-415f8516dcc3",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "Barmoq izi bilan kirish", desc: "ZKTeco, Hikvision terminallari: eshik ochish, kirish-chiqish vaqtini yozish.", icon: FingerScan },
      { title: "Face ID terminallar", desc: "Kontaktsiz yuz orqali kirish, niqobda ham tanish, 0.2 soniyada.", icon: Scan },
      { title: "Turniket va shlagbaum", desc: "Bino kirish guruhi, avtoturargoh va avto-raqam bilan ochiluvchi shlagbaum.", icon: Login },
      { title: "Xodimlar davomati", desc: "Kechikish, ish vaqti va tabel hisobotlari — 1C va Excelga eksport.", icon: CalendarTick },
      { title: "Elektron qulflar va kartalar", desc: "RFID karta, telefon yoki QR orqali xonalarga ruxsat darajalari.", icon: Key },
      { title: "Mehmonlar boshqaruvi", desc: "Bir martalik QR-propusk, resepshn paneli va tashriflar jurnali.", icon: ScanBarcode },
      { title: "Domofon va video-domofon", desc: "IP domofon, telefonga qo'ng'iroq va eshikni masofadan ochish.", icon: SecurityUser },
      { title: "Signalizatsiya va yong'in", desc: "Harakat, eshik, tutun datchiklari va qo'riqlash pultiga ulash.", icon: Alarm },
      { title: "Aqlli yoritish va klimat", desc: "Avtomatik chiroq, konditsioner va energiya tejash ssenariylari.", icon: LampCharge },
    ],
    features: ["Bepul obyekt ko'rigi va loyiha", "Mavjud kameralar bilan integratsiya", "Davomat — HR va 1C bilan bog'lash", "Telefon ilovadan boshqarish", "Kafolat va servis xizmati"],
    tech: ["ZKTeco", "Hikvision", "Dahua", "Suprema", "PERCo", "Yandex Alice", "Tuya", "Home Assistant"],
    stats: [
      { value: "0.2 s", label: "Tanish vaqti" },
      { value: "300+", label: "O'rnatilgan terminal" },
      { value: "100%", label: "Avto davomat" },
    ],
  },
  {
    slug: "bank-integratsiya",
    num: "08",
    title: "Bank tizimlari va integratsiya",
    heroWord: "Bank tizimlari",
    short: "iABS, FlexFin, Ensay uchun servislar, baza migratsiyasi",
    headline: "Bank ABS tizimlari bilan ishlaydigan servislar — xavfsiz, tez va hujjatlashtirilgan",
    description:
      "Banklar va moliya tashkilotlari uchun iABS, FlexFin, Ensay kabi avtomatlashtirilgan bank tizimlariga servislar yozamiz, ularni CRM, mobil banking va to'lov tizimlari bilan ulaymiz, ma'lumotlar bazalarini yo'qotishsiz ko'chiramiz.",
    icon: Buildings2,
    image: "photo-1584169417032-d34e8d805e8b",
    from: "#6690ff",
    to: "#2b52f0",
    items: [
      { title: "ABS integratsiyasi", desc: "iABS, FlexFin, Ensay va boshqa ABS tizimlari bilan ikki tomonlama API va adapterlar.", icon: Routing2 },
      { title: "Servis va mikroservislar", desc: "Kredit, depozit, karta va hisobot jarayonlari uchun alohida servislar yozish.", icon: Code },
      { title: "Ma'lumotlar bazasini ko'chirish", desc: "Oracle, MS SQL, PostgreSQL o'rtasida migratsiya: tekshiruv, rollback, minimal to'xtash.", icon: Data },
      { title: "API shlyuz va ESB", desc: "Yagona integratsiya qatlami, navbatlar (Kafka, RabbitMQ), log va monitoring.", icon: Hierarchy },
      { title: "To'lov tizimlari", desc: "Humo, Uzcard, Click, Payme, Munis va SWIFT bilan ulanish servislari.", icon: SecurityCard },
      { title: "Hisobot va DWH", desc: "Regulyator hisobotlari, ma'lumotlar ombori va BI dashboardlar.", icon: Chart2 },
      { title: "Mobil va internet banking backend", desc: "Mobil ilova va kabinet uchun xavfsiz backend, OTP, limitlar.", icon: Mobile },
      { title: "Xavfsizlik va audit izi", desc: "Shifrlash, rollar, har bir amal jurnali va ichki audit talablariga moslik.", icon: ShieldTick },
      { title: "Qo'llab-quvvatlash va SLA", desc: "Ishlab turgan integratsiyalarni 24/7 kuzatish va tezkor tuzatish.", icon: Headphone },
    ],
    features: ["NDA va bank xavfsizlik talablari", "Test (UAT) muhitida to'liq sinov", "Migratsiyada ma'lumot butunligi tekshiruvi", "Hujjatlashtirilgan API (OpenAPI)", "24/7 monitoring va SLA"],
    tech: ["iABS", "FlexFin", "Ensay", "Oracle", "MS SQL", "PostgreSQL", "Kafka", "RabbitMQ", "Java", "Go", "Node.js", "Docker", "Kubernetes"],
    stats: [
      { value: "0", label: "Yo'qolgan yozuv" },
      { value: "99.95%", label: "Integratsiya uptime" },
      { value: "NDA", label: "To'liq maxfiylik" },
    ],
  },
];

export const getDirection = (slug: string) => directions.find((d) => d.slug === slug);

export const stats = [
  { value: 8, suffix: "+", label: "Yillik tajriba" },
  { value: 350, suffix: "+", label: "Mamnun mijoz" },
  { value: 1200, suffix: "+", label: "Bajarilgan loyiha" },
  { value: 20, suffix: "+", label: "Mutaxassis" },
];

export const process = [
  { title: "Bepul konsultatsiya", desc: "Muammo va maqsadlarni tinglaymiz, obyektga chiqib bepul audit qilamiz.", icon: MessageText },
  { title: "Loyiha va smeta", desc: "Texnik yechim, muddat va aniq narxni shaffof hujjatda taqdim etamiz.", icon: Element3 },
  { title: "Amalga oshirish", desc: "Sertifikatlangan muhandislar ishni sifatli va o'z vaqtida bajaradi.", icon: Setting2 },
  { title: "Test va topshirish", desc: "Har bir tizim sinovdan o'tadi, xodimlaringizni o'qitamiz.", icon: Speedometer },
  { title: "24/7 qo'llab-quvvatlash", desc: "Kafolat, monitoring va doimiy texnik yordam — biz doim yoningizda.", icon: Headphone },
];

export const projects = [
  { title: "Savdo tarmog'i uchun CRM + Telegram bot", client: "Retail · 42 filial", tag: "dasturlash", image: "photo-1551288049-bebda4e38f71", result: "Buyurtmalar +65%",  from: "#6690ff", to: "#2b52f0" },
  { title: "Zavod hududida AI videokuzatuv", client: "Ishlab chiqarish", tag: "videokuzatuv", image: "photo-1496368077930-c1e31b4e5b44", result: "180 kamera · Face ID",  from: "#6690ff", to: "#2b52f0" },
  { title: "Bank filiallari uchun FortiGate SD-WAN", client: "Moliya sektori", tag: "tizim-administratorlik", image: "photo-1584169417032-d34e8d805e8b", result: "28 filial · 99.98% uptime",  from: "#6690ff", to: "#2b52f0" },
  { title: "Klinika call-markazi + AI ovozli operator", client: "Tibbiyot", tag: "ip-telefoniya", image: "photo-1626863905121-3b0c0ed7b94c", result: "Kutish vaqti -80%",  from: "#6690ff", to: "#2b52f0" },
  { title: "Biznes-markaz SKS va Wi-Fi", client: "Ko'chmas mulk · 14 qavat", tag: "tarmoq-autsorsing", image: "photo-1683322499436-f4383dd59f5a", result: "900 port · 120 AP",  from: "#6690ff", to: "#2b52f0" },
  { title: "Onlayn do'kon uchun AI assistent", client: "E-commerce", tag: "ai-yechimlar", image: "photo-1551650975-87deedd944c3", result: "Murojaatlarning 72% avto",  from: "#6690ff", to: "#2b52f0" },
];

export const testimonials = [
  { name: "Aziz Karimov", role: "Direktor, savdo kompaniyasi", text: "CRM va Telegram bot ishga tushgach, buyurtmalarni qo'lda yozish butunlay yo'qoldi. Jamoa juda tez va professional ishladi." },
  { name: "Dilnoza Rahimova", role: "Klinika rahbari", text: "Asterisk call-markaz va AI operator tufayli birorta ham qo'ng'iroq yo'qolmaydi. Bemorlarimiz mamnun." },
  { name: "Jasur Toshmatov", role: "IT menejer, zavod", text: "180 ta kamera va yuzni tanish tizimi bir oyda o'rnatildi. Zabbix monitoring esa har qanday nosozlikni darhol ko'rsatadi." },
  { name: "Malika Yusupova", role: "Biznes-markaz boshqaruvchisi", text: "SKS va Wi-Fi juda toza o'rnatildi, endi IT autsorsing bo'yicha ham faqat ular bilan ishlaymiz." },
];

export const faqs = [
  { q: "Ishni boshlash uchun nima qilish kerak?", a: "Saytdagi formani to'ldiring yoki qo'ng'iroq qiling. 15 daqiqa ichida menejerimiz bog'lanadi va bepul konsultatsiya belgilaydi." },
  { q: "Obyekt ko'rigi va audit pullikmi?", a: "Yo'q. Toshkent bo'ylab obyekt ko'rigi, IT audit va dastlabki smeta tayyorlash mutlaqo bepul." },
  { q: "Faqat bitta xizmatga buyurtma bersam bo'ladimi?", a: "Albatta. Bitta kamera o'rnatishdan tortib, to'liq IT infratuzilmagacha — har qanday hajmdagi ishni bajaramiz." },
  { q: "Kafolat beriladimi?", a: "Ha. Dasturiy ta'minotga 3 oy bepul kafolat, uskunalar va montajga 1–3 yil kafolat beriladi. Shartnomada yoziladi." },
  { q: "Viloyatlarda ham ishlaysizmi?", a: "Ha, O'zbekistonning barcha viloyatlarida ishlaymiz. Dasturiy loyihalar va masofaviy administratorlik esa butun dunyo bo'ylab." },
  { q: "To'lov qanday amalga oshiriladi?", a: "Naqd, bank o'tkazmasi (NDS bilan), Click va Payme. Katta loyihalar bosqichma-bosqich to'lanadi." },
];

export const clients = ["Retail Group", "MedLine", "AgroTech", "Capital Bank", "BuildPro", "Logistic UZ", "EduCenter", "FoodChain", "SmartCity", "TexFactory"];

export const techMarquee = [
  "Next.js", "Flutter", "Node.js", "Python", "Kubernetes", "Docker", "MySQL", "Oracle", "iABS", "PostgreSQL", "OpenAI", "YOLO",
  "Kerio", "FortiGate", "MikroTik", "Cisco", "Zabbix", "Grafana", "Asterisk", "FreePBX", "Hikvision", "Dahua", "Ubiquiti", "Proxmox",
];

export const whyUs = [
  { title: "Hammasi bir joyda", desc: "Dasturdan kameragacha — 8 yo'nalish, bitta shartnoma, bitta mas'ul menejer.", icon: Buildings2 },
  { title: "Sertifikatlangan muhandislar", desc: "Fortinet, MikroTik, Cisco, Hikvision sertifikatlariga ega mutaxassislar.", icon: ShieldTick },
  { title: "Tezkorlik", desc: "15 daqiqada javob, 2 soatda chiqish, loyihalar aniq muddatda.", icon: Speedometer },
  { title: "AI-first yondashuv", desc: "Har bir yechimga sun'iy intellekt imkoniyatlarini qo'shib beramiz.", icon: Magicpen },
];

export const extraServices = [{ slug: "it-audit", title: "IT audit" }];

export const unsplash = (id: string, w = 1600, gray = false) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75${gray ? "&sat=-100" : ""}`;

export const images = {
  team: "photo-1690378820474-b468b8ee64d3",
  technician: "photo-1604754742629-3e5728249d73",
  serverRoom: "photo-1564457461758-8ff96e439e83",
  security: "photo-1550751827-4bd374c3f58b",
  videoWall: "photo-1605810230434-7631ac76ec81",
  dataCenter: "photo-1584169417032-d34e8d805e8b",
  computerRoom: "photo-1643199187247-b3b6009bf0bb",
  office: "photo-1497366811353-6870744d04b2",
};

export const auditPlans = {
  free: {
    title: "Bepul ekspress-audit",
    price: "0 so'm",
    period: "1 tashrif · 2–4 soat",
    desc: "Muhandis ofisingizga keladi, IT infratuzilmani ko'zdan kechiradi va asosiy xavflarni ko'rsatadi.",
    items: ["Tarmoq va Wi-Fi holati", "Firewall va internet xavfsizligi", "Kameralar va arxiv tekshiruvi", "Kompyuterlar va litsenziyalar", "Og'zaki tavsiyalar va dastlabki smeta"],
  },
  paid: {
    title: "Muddatli professional audit",
    desc: "Chuqur tekshiruv + belgilangan muddat davomida doimiy nazorat, hisobot va xavfsizlik testlari.",
    terms: [
      { key: "1", label: "1 oy", price: "3 500 000", note: "bir martalik chuqur audit" },
      { key: "3", label: "3 oy", price: "9 000 000", note: "−15% · choraklik nazorat" },
      { key: "12", label: "12 oy", price: "30 000 000", note: "−30% · yillik SLA" },
    ],
    items: [
      "To'liq infratuzilma xaritasi va hujjatlar",
      "Kiberxavfsizlik va pentest (tashqi/ichki)",
      "Kerio / FortiGate / MikroTik siyosatlari tahlili",
      "Server, backup va zaxira tiklash testi",
      "Zabbix orqali muddat davomida 24/7 monitoring",
      "Har oy yozma hisobot va yo'l xaritasi",
      "Biriktirilgan muhandis va SLA kafolati",
    ],
  },
};

// Yo'nalishlar guruhlari — menyu va bo'limlarda shu tartibda ko'rsatiladi
export const groups = [
  { id: "soft", num: "A", title: "Dasturiy yechimlar", desc: "Ilova, platforma, shaxsiy AI va bank tizimlari bilan integratsiya.", slugs: ["dasturlash", "ai-yechimlar", "bank-integratsiya"] },
  { id: "infra", num: "B", title: "IT infratuzilma", desc: "Internet, serverlar, tarmoq, kompyuterlar va doimiy IT xizmat.", slugs: ["tizim-administratorlik", "tarmoq-autsorsing"] },
  { id: "security", num: "C", title: "Xavfsizlik va aloqa", desc: "Kameralar, barmoq izi bilan kirish va IP-telefoniya.", slugs: ["videokuzatuv", "smart-ofis", "ip-telefoniya"] },
].map((g) => ({ ...g, items: g.slugs.map((s) => directions.find((d) => d.slug === s)!) }));
