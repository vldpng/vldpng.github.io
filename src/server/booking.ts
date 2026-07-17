import type { Express, Request, Response } from "express";

/**
 * Altegio (alteg.io) online-booking proxy.
 *
 * The partner token MUST stay on the server — never expose it to the browser.
 * Set these in the environment (e.g. a .env file loaded by your process):
 *   ALTEGIO_PARTNER_TOKEN  — partner token from the Altegio Marketplace
 *   ALTEGIO_COMPANY_ID     — the clinic branch (company) id
 *
 * Until those are set, the routes return realistic MOCK data so the booking
 * UI is fully testable. Swap in real credentials and the same UI keeps working.
 */

const API_BASE = "https://api.alteg.io/api/v1";

// Read configuration lazily so it picks up env vars loaded after import (dotenv).
function getConfig() {
  const token = process.env.ALTEGIO_PARTNER_TOKEN;
  const companyId = process.env.ALTEGIO_COMPANY_ID;
  return { token, companyId, useMock: !token || !companyId };
}

async function altegio(path: string, init?: RequestInit) {
  const { token } = getConfig();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.api.v2+json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

// ---------------------------------------------------------------------------
// Mock data (used when no real credentials are configured)
// ---------------------------------------------------------------------------

const MOCK_STAFF = [
  { id: 1, name: "Виталий Двуреченский", specialization: "Хирург-имплантолог, ортопед", avatar: "", rating: 5 },
  { id: 2, name: "Элина Хейфец", specialization: "Стоматолог-ортопед", avatar: "", rating: 5 },
  { id: 3, name: "Ирина Иванова", specialization: "Стоматолог-терапевт", avatar: "", rating: 5 },
  { id: 4, name: "Юлия Циплякова", specialization: "Гигиенист", avatar: "", rating: 5 },
  { id: 5, name: "Валерия Иванова", specialization: "Гигиенист", avatar: "", rating: 5 },
];

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function mockDates(): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = 1; out.length < 14; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    if (day.getDay() !== 0) out.push(ymd(day)); // skip Sundays
  }
  return out;
}

function mockTimes(date: string) {
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];
  // Deterministically drop a couple of slots per day so availability looks real.
  const seed = date.split("-").reduce((a, b) => a + Number(b), 0);
  return slots
    .filter((_, i) => (seed + i) % 4 !== 0)
    .map((time) => ({
      time,
      seance_length: 3600,
      datetime: `${date}T${time}:00`,
    }));
}

// Only services that take 30–60 minutes are bookable through the widget.
const MIN_SECONDS = 30 * 60;
const MAX_SECONDS = 60 * 60;

interface SimpleService {
  id: number;
  title: string;
  seance_length: number;
  price_min?: number;
}

function mockServices(staffId: number): SimpleService[] {
  const doctor: SimpleService[] = [
    { id: 101, title: "Консультация специалиста", seance_length: 1800, price_min: 20 },
    { id: 102, title: "Плановый осмотр", seance_length: 1800, price_min: 15 },
  ];
  const hygienist: SimpleService[] = [
    { id: 201, title: "Консультация гигиениста", seance_length: 1800, price_min: 15 },
    { id: 202, title: "Профессиональная гигиена", seance_length: 3600, price_min: 80 },
    { id: 203, title: "Отбеливание", seance_length: 3600, price_min: 250 },
  ];
  return staffId >= 4 ? hygienist : doctor;
}

// Flatten Altegio's (possibly category-nested) services and keep only 30–60 min ones.
function normalizeServices(data: any): SimpleService[] {
  const raw: any[] = [];
  const items = Array.isArray(data) ? data : data?.services ?? [];
  for (const it of items) {
    if (Array.isArray(it?.services)) raw.push(...it.services); // category node
    else raw.push(it);
  }
  return raw
    .map((s) => ({
      id: s.id,
      title: s.title,
      seance_length: s.seance_length ?? s.length ?? 0,
      price_min: s.price_min,
    }))
    .filter((s) => s.seance_length >= MIN_SECONDS && s.seance_length <= MAX_SECONDS);
}

// Build a ?staff_id=&service_ids[]= query string.
function bookingQuery(staffId?: unknown, serviceIds?: unknown): string {
  const params = new URLSearchParams();
  if (staffId) params.set("staff_id", String(staffId));
  if (serviceIds) {
    const ids = Array.isArray(serviceIds) ? serviceIds : [serviceIds];
    ids.forEach((id) => params.append("service_ids[]", String(id)));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export function registerBookingRoutes(app: Express) {
  // List of doctors/specialists
  app.get("/api/booking/staff", async (_req: Request, res: Response) => {
    const { companyId, useMock } = getConfig();
    if (useMock) return res.json({ success: true, data: MOCK_STAFF });
    try {
      const { status, data } = await altegio(`/book_staff/${companyId}`);
      res.status(status).json(data);
    } catch (e) {
      res.status(502).json({ success: false, error: "altegio_unreachable" });
    }
  });

  // Bookable services for a given staff member (filtered to 30–60 minutes)
  app.get("/api/booking/services", async (req: Request, res: Response) => {
    const { companyId, useMock } = getConfig();
    const staffId = req.query.staff_id;
    if (useMock) {
      return res.json({ success: true, data: mockServices(Number(staffId) || 0) });
    }
    try {
      const q = staffId ? `?staff_id=${staffId}` : "";
      const { status, data } = await altegio(`/book_services/${companyId}${q}`);
      if (status >= 400) return res.status(status).json(data);
      res.json({ success: true, data: normalizeServices(data?.data ?? data) });
    } catch (e) {
      res.status(502).json({ success: false, error: "altegio_unreachable" });
    }
  });

  // Available booking dates for a given staff member
  app.get("/api/booking/dates", async (req: Request, res: Response) => {
    const { companyId, useMock } = getConfig();
    if (useMock) return res.json({ success: true, data: { booking_dates: mockDates() } });
    try {
      const q = bookingQuery(req.query.staff_id, req.query["service_ids[]"] ?? req.query.service_ids);
      const { status, data } = await altegio(`/book_dates/${companyId}${q}`);
      res.status(status).json(data);
    } catch (e) {
      res.status(502).json({ success: false, error: "altegio_unreachable" });
    }
  });

  // Available time slots for a staff member on a date
  app.get("/api/booking/times/:staffId/:date", async (req: Request, res: Response) => {
    const { companyId, useMock } = getConfig();
    const { staffId, date } = req.params;
    if (useMock) return res.json({ success: true, data: mockTimes(date) });
    try {
      const q = bookingQuery(undefined, req.query["service_ids[]"] ?? req.query.service_ids);
      const { status, data } = await altegio(`/book_times/${companyId}/${staffId}/${date}${q}`);
      res.status(status).json(data);
    } catch (e) {
      res.status(502).json({ success: false, error: "altegio_unreachable" });
    }
  });

  // Create a booking record
  app.post("/api/booking/record", async (req: Request, res: Response) => {
    const { companyId, useMock } = getConfig();
    const { phone, fullname, staff_id, datetime, comment, services } = req.body ?? {};
    if (!phone || !fullname || !staff_id || !datetime) {
      return res.status(400).json({ success: false, error: "missing_required_fields" });
    }

    if (useMock) {
      return res.json({
        success: true,
        data: [{ record_id: Math.floor(Math.random() * 1e6), record_hash: "mock-hash" }],
      });
    }

    try {
      const body = {
        phone,
        fullname,
        comment: comment ?? "",
        notify_by_sms: 24,
        appointments: [
          {
            id: 1,
            services: Array.isArray(services) ? services : [],
            staff_id,
            datetime,
          },
        ],
      };
      const { status, data } = await altegio(`/book_record/${companyId}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      res.status(status).json(data);
    } catch (e) {
      res.status(502).json({ success: false, error: "altegio_unreachable" });
    }
  });

  // Callback request ("закажите звонок") — a lightweight lead, not a real booking.
  // In mock mode it just succeeds; wire it to a CRM/notification when ready.
  app.post("/api/booking/callback", async (req: Request, res: Response) => {
    const { name, surname, phone } = req.body ?? {};
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "missing_required_fields" });
    }
    // TODO: forward to Altegio/CRM/email/Telegram. For now just acknowledge.
    console.log(`[callback] ${name} ${surname ?? ""} — ${phone}`);
    res.json({ success: true });
  });
}
