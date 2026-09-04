import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Eyebrow } from '../components/PageParts';
import { Reveal } from '../components/Reveal';

type LegalSection = { title: string; paragraphs: string[] };

const privacySections: LegalSection[] = [
  { title: '1. Datenschutz auf einen Blick', paragraphs: ['Der Schutz persönlicher Daten ist uns wichtig. Diese Website ist als statische Informationsseite aufgebaut und verwendet keine Analyse-, Werbe- oder Social-Media-Tracker.', 'Die Nutzung der Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich.'] },
  { title: '2. Erhobene Daten', paragraphs: ['Beim Aufruf der Website verarbeitet der technische Hosting-Anbieter unvermeidbar Verbindungsdaten in Server-Logfiles, etwa IP-Adresse, Zeitpunkt und aufgerufene Datei. Diese Verarbeitung dient dem sicheren Betrieb der Website.', 'Formulare auf dieser Website sind aktuell rein lokal gestaltet. Eingegebene Daten werden nicht an den Verein und nicht an Dritte übertragen.'] },
  { title: '3. Hosting', paragraphs: ['Die Website wird über einen technischen Hosting-Anbieter bereitgestellt. Die Verarbeitung technischer Zugriffsdaten erfolgt im Rahmen der Auftragsverarbeitung und nur soweit sie für Bereitstellung und Sicherheit erforderlich ist.'] },
  { title: '4. Cookies', paragraphs: ['Diese Website speichert nur deine lokale Auswahl zu Cookie-Einstellungen im Browser (localStorage). Es werden keine optionalen Analyse- oder Marketing-Cookies gesetzt.'] },
  { title: '5. Ihre Rechte', paragraphs: ['Du hast im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zudem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.'] },
  { title: '6. Kontakt Datenschutz', paragraphs: ['Bei Fragen zur Verarbeitung personenbezogener Daten wende dich bitte an info@sus-oestereiden.de.'] },
];

export function ImprintPage() {
  return <LegalLayout eyebrow="Rechtliches" title="Impressum."><div className="legal-copy"><h2>Angaben gemäß § 5 TMG</h2><p>SuS Oestereiden e. V.<br />Im Kirchfeld 1<br />59602 Rüthen</p><h2>Vertreten durch</h2><p>Ulrich Mehn, Vereinsvorsitzender<br />Michael Witthaut, Geschäftsführer</p><h2>Kontakt</h2><p>Telefon: +49 2954 924590<br />E-Mail: info@sus-oestereiden.de</p><h2>Vereinsregister</h2><p>Eintragung im Vereinsregister.<br />Registergericht: Amtsgericht Warstein<br />Registernummer: 0069</p><h2>Verantwortlich für den Inhalt</h2><p>Robin Heidel<br />Nettelstädt 8<br />59602 Rüthen</p><ReviewNote /></div></LegalLayout>;
}

export function PrivacyPage() {
  return <LegalLayout eyebrow="Rechtliches" title="Datenschutz."><div className="legal-copy">{privacySections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<ReviewNote /></div></LegalLayout>;
}

function LegalLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <><section className="border-b border-[var(--rule)]"><div className="mx-auto max-w-[96rem] px-5 py-20 md:px-8 md:py-28 xl:px-12"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1 className="display-title mt-5">{title}</h1></Reveal></div></section><article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">{children}</article></>; }

function ReviewNote() { return <aside className="mt-12 flex gap-3 border border-[var(--rule)] bg-[var(--surface-muted)] p-5 text-sm leading-6 text-[var(--muted)]"><AlertCircle className="mt-0.5 shrink-0 text-[var(--blue)]" size={17} /><p>Stand: September 2026. Rechtliche Angaben und diese Datenschutzerklärung sollten vor dem Livegang durch den Verein rechtlich geprüft und mit dem tatsächlichen Hosting- und Kontakt-Setup abgeglichen werden.</p></aside>; }
