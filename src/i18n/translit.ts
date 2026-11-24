// O'zbek lotin -> kirill transliteratsiyasi.
// Brend nomlari, texnik atamalar, URL/email va raqamli tokenlar lotinda qoldiriladi.

const KEEP = new Set(
  (
    "Telegram Instagram Kerio Control Connect FortiGate Fortinet MikroTik Cisco Zabbix Grafana Prometheus Windows Server Ubuntu Linux Proxmox VMware ESXi Hyper-V Docker Kubernetes " +
    "Asterisk FreePBX Issabel Hikvision Dahua Uniview Ezviz ZKTeco Milestone Frigate YOLO OpenCV PyTorch LangChain Whisper Qdrant FastAPI OpenAI Claude LLaMA Qwen vLLM Ollama " +
    "Yealink Grandstream Fanvil amoCRM Bitrix24 Click Payme Humo Uzcard Munis SWIFT Flutter React Native Next.js Node.js Node NestJS Python Laravel PostgreSQL MySQL Redis Oracle " +
    "iOS Android App Store Play Market Google Workspace Microsoft Ubiquiti Ruckus TP-Link Omada APC GLPI Wi-Fi Face ID QR RFID VPN NGFW IPS SD-WAN VLAN OCR ANPR LLM RAG SLA UPS " +
    "Cat6 NVR 1C Excel BI CRM ERP API ESB IVR SIP WebRTC LED MFU MFP DNS DHCP RDP WSUS GPO AD SSH Nginx HTTPS QoS Multi-WAN Kafka RabbitMQ Java Go OpenAPI UAT NDA DWH OTP " +
    "iABS FlexFin Ensay MS SQL Suprema PERCo Yandex Alice Tuya Home Assistant Active Directory Gbit/s PoE 4K 2MP 4MP CI/CD UI/UX SaaS IT AI DB NAS RAID IP SMS VELNOR Solutions " +
    "LIVE REC CAM Build Gateway checksum rollback dashboard platform.ts zabbix k8s prod firewall backup failover fine-tuning on-premise load-balancing helpdesk"
  ).split(/\s+/),
);
// Bular kirillga o'giriladi (o'zbekcha qisqartmalar)
const ABBR: Record<string, string> = { SKS: "СКС", SKUD: "СКУД", ATS: "АТС", MChJ: "МЧЖ", STIR: "СТИР", QQS: "ҚҚС", OKED: "ОКЭД", MFO: "МФО", ATB: "АТБ", "O'RQ-547": "ЎРҚ-547" };

const MAP: Record<string, string> = {
  a: "а", b: "б", d: "д", e: "е", f: "ф", g: "г", h: "ҳ", i: "и", j: "ж", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п",
  q: "қ", r: "р", s: "с", t: "т", u: "у", v: "в", x: "х", y: "й", z: "з", c: "с", w: "в",
};
const APOS = /[‘’ʻʼ'`]/;

function isUpper(ch: string) {
  return ch !== ch.toLowerCase();
}

function word(w: string): string {
  if (!w) return w;
  const bare = w.replace(/^[«"(]+|[»".,:;!?)]+$/g, "");
  if (ABBR[bare]) return w.replace(bare, ABBR[bare]);
  if (KEEP.has(bare) || /\d/.test(bare) && /[A-Za-z]/.test(bare) && /[A-Z]/.test(bare) || /[a-z][A-Z]/.test(bare) || /^[A-Z0-9-]{2,}$/.test(bare) && !ABBR[bare]) return w;
  if (/[@/]|\.(uz|com|ru|ts|js)\b|^https?:/.test(w)) return w;

  let out = "";
  const s = w;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const lo = ch.toLowerCase();
    const next = s[i + 1]?.toLowerCase() ?? "";
    const up = isUpper(ch);
    const allUp = up && (s[i + 1] ? isUpper(s[i + 1]) : true);
    const put = (cyr: string) => (out += up ? (allUp ? cyr.toUpperCase() : cyr[0].toUpperCase() + cyr.slice(1)) : cyr);
    const prev = s[i - 1];
    const atStart = i === 0 || !/[A-Za-z‘’ʻʼ'`]/.test(prev ?? "");

    if ((lo === "o" || lo === "g") && APOS.test(s[i + 1] ?? "")) {
      put(lo === "o" ? "ў" : "ғ");
      i++;
      continue;
    }
    if (lo === "s" && next === "h") { put("ш"); i++; continue; }
    if (lo === "c" && next === "h") { put("ч"); i++; continue; }
    if (lo === "y" && APOS.test(s[i + 2] ?? "") && next === "o") { put("й"); continue; }
    if (lo === "y" && next === "o") { put("ё"); i++; continue; }
    if (lo === "y" && next === "u") { put("ю"); i++; continue; }
    if (lo === "y" && next === "a") { put("я"); i++; continue; }
    if (lo === "y" && next === "e") { put("е"); i++; continue; }
    if (lo === "t" && next === "s" && s[i + 2]?.toLowerCase() !== "h" && !atStart) { put("ц"); i++; continue; }
    if (lo === "e") { put(atStart ? "э" : "е"); continue; }
    if (APOS.test(ch)) { out += "ъ"; continue; }
    if (MAP[lo]) { put(MAP[lo]); continue; }
    out += ch;
  }
  return out;
}

export function toCyrillic(text: string): string {
  return text.split(/(\s+|—|–|·|\/)/).map((part) => (/^\s+$/.test(part) ? part : word(part))).join("");
}

const SKIP_KEYS = new Set(["slug", "slugs", "tag", "zoneId", "image", "href", "id", "key", "phone", "phoneHref", "email", "url", "telegramHandle", "instagramHandle", "socials", "account", "mfo", "stir"]);

// Obyekt ichidagi barcha matnlarni kirillga o'giradi (funksiyalar, raqamlar va SKIP_KEYS o'zgarmaydi)
// Bu kalitlar faqat massiv bo'lsa (brendlar ro'yxati) o'zgartirilmaydi
const SKIP_ARRAY_KEYS = new Set(["tech", "techMarquee", "clients"]);

export function deepCyrillic<T>(value: T, key?: string): T {
  if (key && SKIP_KEYS.has(key)) return value;
  if (key && SKIP_ARRAY_KEYS.has(key) && Array.isArray(value)) return value;
  if (typeof value === "string") return toCyrillic(value) as T;
  if (Array.isArray(value)) return value.map((v) => deepCyrillic(v)) as T;
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = deepCyrillic(v, k);
    return out as T;
  }
  return value;
}
