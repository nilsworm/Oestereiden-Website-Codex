import { CheckCircle2, ChevronRight, FileText, HeartHandshake } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/PageParts';
import { Reveal } from '../components/Reveal';

export function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return <>
    <section className="border-b border-[var(--rule)]"><div className="mx-auto grid max-w-[96rem] gap-10 px-5 py-20 md:grid-cols-[1.2fr_.8fr] md:px-8 md:py-32 xl:px-12"><Reveal><Eyebrow>Mitgliedschaft</Eyebrow><h1 className="display-title mt-5">Dein Platz<br />im Verein.</h1><p className="mt-8 max-w-xl text-lg leading-7 text-[var(--muted)] md:text-xl">Mit einer Mitgliedschaft stärkst du Sport und Gemeinschaft in der Region – und wirst Teil von etwas, das seit 1922 wächst.</p></Reveal><Reveal delay={0.1}><div className="border border-[var(--rule)] bg-[var(--surface-muted)] p-6 md:p-8"><HeartHandshake className="text-[var(--blue)]" size={25} /><p className="mt-12 text-3xl font-medium leading-[1.05] tracking-[-.055em]">Über 860 Menschen bewegen Oestereiden.</p><p className="mt-4 text-sm leading-6 text-[var(--muted)]">Vier Abteilungen. Angebote für Kinder, Jugendliche und Erwachsene.</p></div></Reveal></div></section>
    <section className="border-b border-[var(--rule)]"><div className="mx-auto grid max-w-[96rem] gap-px border-x border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3"><Fact number="1922" label="gegründet" /><Fact number="860+" label="Mitglieder" /><Fact number="4" label="Abteilungen" /></div></section>
    <section className="py-20 md:py-32"><div className="mx-auto grid max-w-[96rem] gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8 xl:px-12"><Reveal><Eyebrow>Aufnahmeformular</Eyebrow><h2 className="section-title mt-4">Interesse<br />bekunden.</h2><p className="mt-6 max-w-sm leading-7 text-[var(--muted)]">Das digitale Aufnahmeformular wird derzeit vorbereitet. Du kannst uns schon jetzt dein Interesse mitteilen – die Anfrage bleibt in diesem Browser und wird nicht versendet.</p><div className="mt-8 flex items-start gap-3 border-l border-[var(--blue)] pl-4 text-sm leading-6 text-[var(--muted)]"><FileText className="mt-1 shrink-0 text-[var(--blue)]" size={16} />Für eine verbindliche Aufnahme stellt der Verein das offizielle Formular bereit.</div></Reveal><Reveal delay={0.08}>{submitted ? <SuccessState reset={() => setSubmitted(false)} /> : <InterestForm submit={submit} />}</Reveal></div></section>
    <section className="border-y border-[var(--rule)] bg-[var(--surface-muted)]"><div className="mx-auto max-w-[96rem] px-5 py-16 md:px-8 md:py-20 xl:px-12"><Eyebrow>Über uns</Eyebrow><div className="mt-7 grid gap-8 md:grid-cols-2"><p className="text-2xl font-medium leading-[1.1] tracking-[-.045em] md:text-4xl">Der größte Verein im Stadtgebiet Rüthen – verwurzelt in Oestereiden.</p><p className="max-w-xl text-base leading-7 text-[var(--muted)]">Wir verbinden Leistungs- und Freizeitsport mit echter Nähe. Auf dem Platz, in der Halle, am Netz und im Alltag entsteht Gemeinschaft, die bleibt.</p></div></div></section>
  </>;
}

function InterestForm({ submit }: { submit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form onSubmit={submit} className="border border-[var(--rule)] bg-[var(--surface)] p-5 md:p-8" noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Vor- und Nachname" id="name" autoComplete="name" required /><Field label="E-Mail-Adresse" id="email" type="email" autoComplete="email" required /><div className="sm:col-span-2"><label className="form-label" htmlFor="interest">Ich interessiere mich für</label><select className="form-control" id="interest" name="interest" defaultValue=""><option value="" disabled>Bitte auswählen</option><option>Fußball</option><option>Volleyball</option><option>Tennis</option><option>Breitensport</option><option>Allgemeine Mitgliedschaft</option></select></div><div className="sm:col-span-2"><label className="form-label" htmlFor="message">Nachricht <span className="text-[var(--muted)]">(optional)</span></label><textarea className="form-control min-h-28 resize-y" id="message" name="message" /></div></div>
    <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Mit „Interesse vormerken“ wird keine Anfrage übermittelt. Es wird keine Verbindung zu einem Server hergestellt.</p><button className="button-primary mt-6" type="submit">Interesse vormerken <ChevronRight size={16} /></button>
  </form>;
}

function Field({ label, id, type = 'text', autoComplete, required = false }: { label: string; id: string; type?: string; autoComplete?: string; required?: boolean }) { return <div><label className="form-label" htmlFor={id}>{label}</label><input className="form-control" id={id} name={id} type={type} autoComplete={autoComplete} required={required} /></div>; }

function SuccessState({ reset }: { reset: () => void }) { return <div className="flex min-h-100 flex-col justify-between border border-[var(--rule)] bg-[var(--surface-muted)] p-6 md:p-8"><CheckCircle2 className="text-[var(--blue)]" size={30} /><div><Eyebrow>Vorgemerkt</Eyebrow><h3 className="mt-4 text-3xl font-medium tracking-[-.05em]">Vielen Dank für dein Interesse.</h3><p className="mt-4 max-w-md leading-7 text-[var(--muted)]">Die Eingabe wurde bewusst nicht übertragen. Das offizielle Aufnahmeformular wird hier ergänzt, sobald es bereitsteht.</p><div className="mt-7 flex flex-wrap gap-3"><button type="button" className="button-secondary" onClick={reset}>Neue Eingabe</button><Link className="button-primary" to="/">Zur Startseite</Link></div></div></div>; }

function Fact({ number, label }: { number: string; label: string }) { return <div className="bg-[var(--surface)] px-5 py-8 md:px-8"><p className="text-4xl font-medium tracking-[-.06em] md:text-5xl">{number}</p><p className="mt-2 text-sm text-[var(--muted)]">{label}</p></div>; }
