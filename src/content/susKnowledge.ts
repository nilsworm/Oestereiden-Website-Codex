export type HallSlot = {
  day: string;
  time: string;
  activity: string;
  group: string;
};

export type SusEvent = {
  date: string;
  weekday: string;
  time: string;
  title: string;
  place: string;
  department: string;
};

/**
 * MVP content source. In production, this file can be replaced by a read-only
 * Google Calendar / Supabase feed without changing the chat interface.
 */
export const hallSchedule: HallSlot[] = [
  { day: 'Montag', time: '16:00–17:00', activity: 'Kinderturnen Minis', group: 'Breitensport' },
  { day: 'Montag', time: '17:15–18:30', activity: 'Volleyball Jugend', group: 'Volleyball' },
  { day: 'Montag', time: '19:00–21:00', activity: 'Volleyball Herren', group: 'Volleyball' },
  { day: 'Dienstag', time: '17:00–18:00', activity: 'Fit Mix', group: 'Breitensport' },
  { day: 'Dienstag', time: '18:30–20:00', activity: 'Volleyball Damen', group: 'Volleyball' },
  { day: 'Mittwoch', time: '16:00–17:00', activity: 'Kindertanzen', group: 'Breitensport' },
  { day: 'Mittwoch', time: '18:00–19:30', activity: 'Volleyball Jugend', group: 'Volleyball' },
  { day: 'Donnerstag', time: '16:30–17:30', activity: 'Kinderturnen', group: 'Breitensport' },
  { day: 'Donnerstag', time: '18:00–19:30', activity: 'Volleyball Damen', group: 'Volleyball' },
  { day: 'Freitag', time: '17:00–18:30', activity: 'Volleyball Minis', group: 'Volleyball' },
  { day: 'Freitag', time: '19:00–21:00', activity: 'Freie Vereinszeit', group: 'Verein' },
];

export const upcomingEvents: SusEvent[] = [
  { date: '17.10.2026', weekday: 'Samstag', time: '14:00 Uhr', title: 'Saisonabschluss Jugendfußball', place: 'Sportplatz Oestereiden', department: 'Fußball' },
  { date: '24.10.2026', weekday: 'Samstag', time: '10:00 Uhr', title: 'Aktionstag an der Vereinsanlage', place: 'Vereinsgelände', department: 'Verein' },
  { date: '31.10.2026', weekday: 'Samstag', time: '19:00 Uhr', title: 'Heimspiel Volleyball Damen', place: 'Vereinshalle', department: 'Volleyball' },
  { date: '08.11.2026', weekday: 'Sonntag', time: '11:00 Uhr', title: 'Familientag des SuS', place: 'Vereinsheim', department: 'Verein' },
];

export const knowledgeMeta = {
  status: 'Präsentationsdaten',
  updated: '14. Oktober 2026',
  source: 'SuS-Redaktion · MVP-Datenstand',
};
