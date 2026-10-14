import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, CalendarDays, ChevronRight, Clock3, MapPin, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { board, contact, departments } from '../content/site';
import { hallSchedule, knowledgeMeta, upcomingEvents } from '../content/susKnowledge';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  kind?: 'events' | 'hall';
  sourceQuestion?: string;
  action?: { label: string; to: string };
};

const welcome: Message = {
  id: 1,
  role: 'assistant',
  text: 'Hallo! Ich bin SUSAI, dein KI-Assistent für den SuS Oestereiden. Frag mich frei zu Sportangeboten, Terminen oder zur Hallenbelegung.',
};

const suggestions = ['Was steht als Nächstes an?', 'Wann ist die Halle frei?', 'Welche Angebote gibt es?', 'Wie werde ich Mitglied?'];

const dayNames = ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];
// Same-origin proxy: avoids the provider's browser Turnstile check. The proxy
// itself forwards this request to Pollinations without an Origin header.
const LLM_ENDPOINT = '/api/susai';

const susContext = [
  'VEREINSKONTEXT – SuS Oestereiden e.V. 1922',
  'Der Verein hat über 860 Mitglieder und ist im Stadtgebiet Rüthen aktiv.',
  `Abteilungen: ${departments.map((department) => `${department.name} (${department.description})`).join(' | ')}`,
  `Kontakt: ${contact.address}; Telefon ${contact.phone}; E-Mail ${contact.email}.`,
  `Vorstand: ${board.map((member) => `${member.name} – ${member.role}`).join(', ')}.`,
  `HALLENBELEGUNG, Stand ${knowledgeMeta.updated}:`,
  ...hallSchedule.map((slot) => `${slot.day}, ${slot.time}: ${slot.activity} (${slot.group})`),
  `NÄCHSTE TERMINE, Stand ${knowledgeMeta.updated}:`,
  ...upcomingEvents.map((event) => `${event.weekday}, ${event.date}, ${event.time}: ${event.title} – ${event.place} (${event.department})`),
].join('\n');

function getPresentationUi(question: string): Pick<Message, 'kind' | 'action'> {
  const query = question.toLocaleLowerCase('de-DE');
  if (/termin|veranstalt|nächst|event|wann.*spiel|was.*an/.test(query)) return { kind: 'events', action: { label: 'Alle Termine ansehen', to: '/#termine' } };
  if (/halle|hallen|belegung|frei|belegt|trainingszeit/.test(query)) return { kind: 'hall', action: { label: 'Hallenbelegung öffnen', to: '/hallenbelegung' } };
  if (/mitglied|beitritt|anmeld|kosten|beitrag/.test(query)) return { action: { label: 'Mitglied werden', to: '/mitgliedschaft' } };
  if (/fußball|fussball/.test(query)) return { action: { label: 'Zum Fußball', to: '/fussball' } };
  if (/volleyball/.test(query)) return { action: { label: 'Zum Volleyball', to: '/volleyball' } };
  if (/tennis/.test(query)) return { action: { label: 'Zum Tennis', to: '/tennis' } };
  if (/breitensport|turnen|fitness|tanzen|walking/.test(query)) return { action: { label: 'Zum Breitensport', to: '/breitensport' } };
  return {};
}

async function getLiveAnswer(history: Message[]): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18_000);
  try {
    const response = await fetch(LLM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'openai',
        temperature: 0.2,
        max_tokens: 260,
        messages: [
          {
            role: 'system',
            content: `Du bist SUSAI, der hilfreiche digitale Vereinsassistent des SuS Oestereiden. Antworte immer auf Deutsch, freundlich und konkret. Nutze ausschließlich den folgenden Vereinskontext. Erfinde keine Fakten, Termine, Beiträge, Trainingszeiten oder Ansprechpartner. Wenn etwas nicht im Kontext steht, sage das offen und verweise bei organisatorischen Fragen auf den Vorstand. Eine Hallenzeit ist nie eine verbindliche Buchung; weise bei Reservierungsfragen kurz darauf hin. Halte Antworten auf höchstens 4 kurze Sätze.\n\n${susContext}`,
          },
          ...history.slice(-8).map((message) => ({ role: message.role, content: message.text })),
        ],
      }),
    });
    if (!response.ok) throw new Error(`LLM request failed: ${response.status}`);
    const data = await response.json() as { choices?: Array<{ message?: { content?: unknown } }> };
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) throw new Error('LLM returned no usable answer');
    return answer.trim();
  } finally {
    window.clearTimeout(timeout);
  }
}

function getAnswer(question: string): Omit<Message, 'id' | 'role'> {
  const query = question.toLocaleLowerCase('de-DE').trim();
  const eventText = `Die nächsten Termine sind ${upcomingEvents.slice(0, 3).map((event) => `${event.date}: ${event.title}`).join(' · ')}.`;

  if (/termin|veranstalt|nächst|event|wann.*spiel|was.*an/.test(query)) {
    return { text: eventText, kind: 'events', action: { label: 'Alle Termine ansehen', to: '/#termine' } };
  }

  const askedDay = dayNames.find((day) => query.includes(day));
  if (/halle|hallen|belegung|frei|belegt|trainingszeit/.test(query)) {
    const entries = askedDay ? hallSchedule.filter((entry) => entry.day.toLocaleLowerCase('de-DE') === askedDay) : hallSchedule;
    if (askedDay && entries.length) {
      const capitalizedDay = `${askedDay[0].toUpperCase()}${askedDay.slice(1)}`;
      return {
        text: `Am ${capitalizedDay} ist die Vereinshalle in diesen Zeitfenstern belegt. Nicht aufgeführte Zeiten sind im MVP als frei zu verstehen – bitte vor einer Buchung beim Vorstand bestätigen.`,
        kind: 'hall',
        action: { label: 'Hallenbelegung öffnen', to: '/hallenbelegung' },
      };
    }
    return { text: 'Hier ist der aktuelle Wochenplan der Vereinshalle. Für eine verbindliche Reservierung frag bitte kurz beim Vereinsvorstand nach.', kind: 'hall', action: { label: 'Hallenbelegung öffnen', to: '/hallenbelegung' } };
  }

  if (/mitglied|beitritt|anmeld|kosten|beitrag/.test(query)) {
    return { text: 'Schön, dass du dabei sein möchtest. Auf der Mitgliedschaftsseite findest du die Anfrage und die wichtigsten Informationen zum Verein.', action: { label: 'Mitglied werden', to: '/mitgliedschaft' } };
  }

  if (/kontakt|telefon|mail|adresse|vorstand/.test(query)) {
    return { text: 'Du erreichst den SuS Oestereiden unter info@sus-oestereiden.de oder telefonisch unter +49 2954 924590. Die Vereinsanlage liegt am Im Kirchfeld 1 in 59602 Rüthen.' };
  }

  if (/fußball|fussball/.test(query)) return { text: 'Im Fußball verbindet der SuS Oestereiden Jugend- und Seniorenfußball in der SG Haarstrang. Von den ersten Ballkontakten bis zum Teamspiel steht Gemeinschaft im Mittelpunkt.', action: { label: 'Zum Fußball', to: '/fussball' } };
  if (/volleyball/.test(query)) return { text: 'Volleyball gibt es bei uns für Minis, Jugend, Damen und Herren. Die Trainingszeiten findest du auch in der Hallenübersicht.', action: { label: 'Zum Volleyball', to: '/volleyball' } };
  if (/tennis/.test(query)) return { text: 'Die Tennisabteilung bietet Jugendförderung, Training und Mannschaftssport auf der eigenen Anlage.', action: { label: 'Zum Tennis', to: '/tennis' } };
  if (/breitensport|turnen|fitness|tanzen|walking/.test(query)) return { text: 'Im Breitensport gibt es Kindertanzen, Kinderturnen, Fitness, Fit Mix und Nordic Walking – Angebote für die ganze Familie.', action: { label: 'Zum Breitensport', to: '/breitensport' } };
  if (/wer.*sus|was.*sus|verein|angebot|abteilung|allgemein|hallo|hi\b/.test(query)) {
    return { text: 'Der SuS Oestereiden e.V. 1922 ist mit über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen. Unsere vier Abteilungen sind Fußball, Volleyball, Tennis und Breitensport.' };
  }

  return { text: 'Dazu habe ich im MVP noch keine verlässliche Antwort. Ich kann dir aber sofort bei Terminen, Hallenbelegung, Mitgliedschaft, Kontakt und unseren vier Abteilungen helfen.' };
}

function EventCards() {
  return <div className="susai-cards">{upcomingEvents.slice(0, 3).map((event) => <div className="susai-card" key={event.date + event.title}>
    <div className="susai-card-icon"><CalendarDays size={15} /></div><div><p className="susai-card-kicker">{event.weekday}, {event.date} · {event.time}</p><p className="susai-card-title">{event.title}</p><p className="susai-card-detail"><MapPin size={12} />{event.place}</p></div>
  </div>)}</div>;
}

function HallCards({ question }: { question: string }) {
  const normalized = question.toLocaleLowerCase('de-DE');
  const askedDay = dayNames.find((day) => normalized.includes(day));
  const entries = askedDay ? hallSchedule.filter((entry) => entry.day.toLocaleLowerCase('de-DE') === askedDay) : hallSchedule.slice(0, 4);
  const label = askedDay ? `${askedDay[0].toUpperCase()}${askedDay.slice(1)}` : 'Diese Woche';
  return <div className="susai-hall"><p className="susai-hall-label"><Clock3 size={13} />{label}</p>{entries.map((entry) => <div className="susai-hall-row" key={`${entry.day}-${entry.time}`}><span>{entry.time}</span><div><strong>{entry.activity}</strong><small>{entry.group}</small></div></div>)}</div>;
}

export function SusAi() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(2);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 180);
  }, [open]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const submit = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || typing) return;
    const nextId = nextMessageId.current++;
    const userMessage: Message = { id: nextId, role: 'user', text: question };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setTyping(true);
    try {
      const answer = await getLiveAnswer(conversation);
      setMessages((items) => [...items, { id: nextMessageId.current++, role: 'assistant', sourceQuestion: question, text: answer, ...getPresentationUi(question) }]);
    } catch {
      const fallback = getAnswer(question);
      setMessages((items) => [...items, { id: nextMessageId.current++, role: 'assistant', sourceQuestion: question, ...fallback, text: `Der Live-KI-Dienst ist gerade nicht erreichbar. ${fallback.text}` }]);
    } finally {
      setTyping(false);
    }
  };

  return <>
    <AnimatePresence>{open && <motion.section className="susai-panel" role="dialog" aria-modal="true" aria-label="SUSAI Chat" initial={reducedMotion ? false : { opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .2 }}>
      <header className="susai-header"><div className="flex items-center gap-3"><div className="susai-avatar"><Bot size={19} /></div><div><div className="flex items-center gap-1.5"><p className="font-semibold tracking-[-.03em]">SUSAI</p><Sparkles size={13} className="text-[var(--blue)]" /></div><p className="text-[.68rem] text-[var(--muted)]">Vereinswissen auf einen Blick</p></div></div><button type="button" onClick={() => setOpen(false)} className="susai-close" aria-label="SUSAI schließen"><X size={18} /></button></header>
      <div ref={feedRef} className="susai-feed" aria-live="polite">{messages.map((message) => <div className={`susai-message ${message.role === 'user' ? 'susai-message-user' : ''}`} key={message.id}>
        {message.role === 'assistant' && <div className="susai-message-avatar"><Bot size={14} /></div>}
        <div className="min-w-0"><div className="susai-bubble">{message.text}</div>{message.kind === 'events' && <EventCards />}{message.kind === 'hall' && <HallCards question={message.sourceQuestion ?? ''} />}{message.action && <Link to={message.action.to} onClick={() => setOpen(false)} className="susai-action">{message.action.label}<ChevronRight size={14} /></Link>}</div>
      </div>)}{typing && <div className="susai-message"><div className="susai-message-avatar"><Bot size={14} /></div><div className="susai-typing"><i /><i /><i /></div></div>}</div>
      {messages.length === 1 && <div className="susai-suggestions">{suggestions.map((suggestion) => <button type="button" onClick={() => submit(suggestion)} key={suggestion}>{suggestion}</button>)}</div>}
      <form className="susai-form" onSubmit={(event) => { event.preventDefault(); submit(input); }}><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Stell deine Frage …" aria-label="Frage an SUSAI" /><button type="submit" disabled={!input.trim() || typing} aria-label="Frage senden"><Send size={17} /></button></form>
      <footer className="susai-footer"><span className="susai-status"><i />Live-KI · {knowledgeMeta.status}</span><span>Keine privaten Daten eingeben</span></footer>
    </motion.section>}</AnimatePresence>
    <button type="button" className="susai-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? 'SUSAI schließen' : 'SUSAI öffnen'} aria-expanded={open}><span className="susai-launcher-icon">{open ? <X size={22} /> : <MessageCircle size={23} />}</span><span className="susai-launcher-label">{open ? 'Schließen' : 'SUSAI fragen'}</span></button>
  </>;
}
