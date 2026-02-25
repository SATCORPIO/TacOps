export const INITIAL_STATS = {
  activeOperations: 47,
  globalAssets: 312,
  secureChannels: 89,
  threatLevel: 3,
};

export const THREAT_REGIONS = [
  { id: "r1", region: "EASTERN CAUCASUS",   level: "CRITICAL", code: "EC-7" },
  { id: "r2", region: "NORTH ADRIATIC",     level: "ELEVATED", code: "NA-3" },
  { id: "r3", region: "STRAIT OF MALACCA", level: "ELEVATED", code: "SM-9" },
  { id: "r4", region: "HORN OF AFRICA",    level: "MODERATE", code: "HA-2" },
  { id: "r5", region: "ANDEAN CORRIDOR",   level: "WATCH",    code: "AC-1" },
];

const ACTIVITY_TEMPLATES = [
  "ASSET {id} — CHECK-IN CONFIRMED // {loc}",
  "SIGNAL INTERCEPT: {code} — DECRYPTION PENDING",
  "CHANNEL {ch} — HANDSHAKE ESTABLISHED",
  "EXFIL ROUTE {id} — CLEARANCE GRANTED",
  "INTEL PACKAGE {code} — RELAY INITIATED",
  "COUNTER-SURVEILLANCE: {loc} — NO CONTACT",
  "SECURE BURST RECEIVED — ORIGIN: {loc}",
  "ASSET {id} — STATUS CHANGE: ACTIVE → STANDBY",
  "PROTOCOL {code} — AUTHENTICATION LAYER 3 PASSED",
  "DEAD DROP {id} — CONFIRMED SERVICED // {loc}",
  "COMMS BLACKOUT: {loc} — INVESTIGATING",
  "DRONE RELAY {id} — SIGNAL LOCK ACQUIRED",
];

const LOCATIONS = [
  "SECTOR 7G", "TBILISI STATION", "ZONE ALPHA-3", "BAKU RELAY",
  "PORT SAID NODE", "CAIRO OUTPOST", "SINGAPORE HUB", "ODESSA RELAY",
  "BOGOTÁ CELL", "KARACHI NODE", "NAIROBI STATION", "RIGA OUTPOST",
];

const CODES = ["VIPER", "CASPAR", "NIGHTFALL", "IRON BELL", "SPECTRE", "ECLIPSE", "ONYX-7", "GHOST WIRE"];

function rand(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export function generateActivity() {
  const template = rand(ACTIVITY_TEMPLATES);
  const id = `${String.fromCharCode(65 + randInt(0, 25))}${randInt(100, 999)}`;
  return template
    .replace("{id}", id)
    .replace("{loc}", rand(LOCATIONS))
    .replace("{code}", rand(CODES))
    .replace("{ch}", `SEC-${randInt(10, 99)}`);
}

export function generateChartData(points = 20) {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - i) * 3000).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    intercepts: randInt(20, 80),
    assets: randInt(30, 70),
    threats: randInt(5, 35),
  }));
}

export const MAP_NODES = [
  { id: 1,  x: 15, y: 35, label: "RIGA",      active: true  },
  { id: 2,  x: 28, y: 55, label: "CAIRO",     active: true  },
  { id: 3,  x: 35, y: 30, label: "TBILISI",   active: false },
  { id: 4,  x: 52, y: 42, label: "KARACHI",   active: true  },
  { id: 5,  x: 62, y: 52, label: "SINGAPORE", active: true  },
  { id: 6,  x: 70, y: 25, label: "SHANGHAI",  active: false },
  { id: 7,  x: 80, y: 38, label: "TOKYO",     active: true  },
  { id: 8,  x: 22, y: 68, label: "NAIROBI",   active: true  },
  { id: 9,  x: 10, y: 45, label: "LONDON",    active: false },
  { id: 10, x: 75, y: 65, label: "SYDNEY",    active: false },
  { id: 11, x: 88, y: 35, label: "ANCHORAGE", active: true  },
  { id: 12, x: 18, y: 22, label: "OSLO",      active: false },
  { id: 13, x: 40, y: 60, label: "BOGOTÁ",    active: true  },
];

export type ActivityEntry = {
  id: string;
  timestamp: string;
  message: string;
  status: "nominal" | "alert" | "pending";
};

export function createActivityEntry(): ActivityEntry {
  const statuses: ActivityEntry["status"][] = ["nominal", "nominal", "nominal", "alert", "pending"];
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    message: generateActivity(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
}

export const INITIAL_FEED: ActivityEntry[] = Array.from({ length: 14 }, () => createActivityEntry());
