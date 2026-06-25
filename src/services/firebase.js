// ─── Default Settings ────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  brideName: "Diksha",
  groomName: "Rahul",
  weddingDate: "2026-12-26T11:30:00",
  brideParents: "Mr. & Mrs. Sharma",
  groomParents: "Mr. & Mrs. Gupta",
  brideTagline: "A heart full of grace, traditional values, and dreams.",
  groomTagline: "A kind soul, ready for a lifetime of love and togetherness.",
  brideSiblings: "Brother: Ravi · Sister: Pooja",
  groomSiblings: "Brother: Aman · Sister: Ritu",
  venue: "Shree Ram Mandir",
  venueAddress: "Shree Ram Mandir, Ujjain, Madhya Pradesh",
  venueMapsUrl: "https://maps.google.com/?q=Shree+Ram+Mandir+Ujjain",
  events: [
    { id: "haldi", name: "Haldi", icon: "sun", date: "December 24, 2026", time: "10:00 AM", venue: "Rajwada Palace, Indore" },
    { id: "mehendi", name: "Mehendi", icon: "leaf", date: "December 24, 2026", time: "06:00 PM", venue: "Rajwada Palace, Indore" },
    { id: "sangeet", name: "Sangeet", icon: "music", date: "December 25, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
    { id: "wedding", name: "Wedding", icon: "heart", date: "December 26, 2026", time: "11:30 AM", venue: "Shree Ram Mandir, Ujjain" },
    { id: "reception", name: "Reception", icon: "star", date: "December 26, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
  ],
  bankAccount: "Rahul Sharma",
  bankName: "State Bank of India",
  bankACNo: "9876 5432 1098",
  upiId: "rahul@sbi",
  contactWhatsapp: "+919995541652",
  contactPhone: "+919995541652",
  contactEmail: "rahul.diksha@wedding.com",
};

// ─── RSVP ────────────────────────────────────────────────────────────────────

export async function submitRSVP(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("rsvps", JSON.stringify(existing));
}

export async function getRSVPs() {
  return JSON.parse(localStorage.getItem("rsvps") || "[]");
}

// ─── Wishes ──────────────────────────────────────────────────────────────────

export async function submitWish(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("wishes") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("wishes", JSON.stringify(existing));
}

export async function getWishes() {
  const stored = localStorage.getItem("wishes");
  let localWishes = [];
  if (stored) {
    localWishes = JSON.parse(stored);
  } else {
    const defaults = [
      {
        id: "default-1",
        name: "Sana & Family",
        message: "May your journey together be full of love, laughter, and endless happiness!",
        submittedAt: "2026-06-20T10:00:00.000Z"
      },
      {
        id: "default-2",
        name: "Yusuf",
        message: "Wishing you both a lifetime of beautiful memories and strong love.",
        submittedAt: "2026-06-20T11:00:00.000Z"
      },
      {
        id: "default-3",
        name: "Rahul & Anjali",
        message: "So thrilled to celebrate your special day! Wishing you the absolute best.",
        submittedAt: "2026-06-21T09:00:00.000Z"
      }
    ];
    localStorage.setItem("wishes", JSON.stringify(defaults));
    localWishes = defaults;
  }
  return localWishes.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings() {
  let settings = DEFAULT_SETTINGS;
  const stored = localStorage.getItem("weddingSettings");
  if (stored) {
    try {
      settings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.warn("Failed to parse weddingSettings from localStorage:", e);
    }
  } else {
    localStorage.setItem("weddingSettings", JSON.stringify(DEFAULT_SETTINGS));
  }

  // Force future wedding date and updated event dates so the countdown works actively
  if (!settings.weddingDate || new Date(settings.weddingDate) < new Date() || settings.weddingDate.startsWith("2026-04")) {
    settings.weddingDate = "2026-12-26T11:30:00";
    settings.events = [
      { id: "haldi", name: "Haldi", icon: "sun", date: "December 24, 2026", time: "10:00 AM", venue: "Rajwada Palace, Indore" },
      { id: "mehendi", name: "Mehendi", icon: "leaf", date: "December 24, 2026", time: "06:00 PM", venue: "Rajwada Palace, Indore" },
      { id: "sangeet", name: "Sangeet", icon: "music", date: "December 25, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
      { id: "wedding", name: "Wedding", icon: "heart", date: "December 26, 2026", time: "11:30 AM", venue: "Shree Ram Mandir, Ujjain" },
      { id: "reception", name: "Reception", icon: "star", date: "December 26, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" }
    ];
    try {
      localStorage.setItem("weddingSettings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to write updated settings to localStorage", e);
    }
  }

  // Force Shree Ram Mandir location migration if it's still default or empty or "Garden District" or "Emmu Auditorium"
  if (
    !settings.venueAddress ||
    settings.venueAddress.includes("Garden District") ||
    settings.venueAddress.includes("Perinthalmanna") ||
    settings.venue === "Grand Pearl Banquet" ||
    settings.venue === "Emmu Auditorium"
  ) {
    settings.venue = "Shree Ram Mandir";
    settings.venueAddress = "Shree Ram Mandir, Ujjain, Madhya Pradesh";
    settings.venueMapsUrl = "https://maps.google.com/?q=Shree+Ram+Mandir+Ujjain";

    // Also migrate wedding venue in events
    if (settings.events) {
      settings.events = [
        { id: "haldi", name: "Haldi", icon: "sun", date: "April 24, 2026", time: "10:00 AM", venue: "Rajwada Palace, Indore" },
        { id: "mehendi", name: "Mehendi", icon: "leaf", date: "April 24, 2026", time: "06:00 PM", venue: "Rajwada Palace, Indore" },
        { id: "sangeet", name: "Sangeet", icon: "music", date: "April 25, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
        { id: "wedding", name: "Wedding", icon: "heart", date: "April 26, 2026", time: "11:30 AM", venue: "Shree Ram Mandir, Ujjain" },
        { id: "reception", name: "Reception", icon: "star", date: "April 26, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" }
      ];
    }

    try {
      localStorage.setItem("weddingSettings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to write migrated settings to localStorage", e);
    }
  }

  return settings;
}

export async function updateSettings(data) {
  const current = JSON.parse(localStorage.getItem("weddingSettings") || JSON.stringify(DEFAULT_SETTINGS));
  localStorage.setItem("weddingSettings", JSON.stringify({ ...current, ...data }));
}
