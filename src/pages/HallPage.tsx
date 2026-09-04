import { CalendarRange, Clock3, Info } from 'lucide-react';
import { EmptyState, Eyebrow } from '../components/PageParts';
import { Reveal } from '../components/Reveal';

export function HallPage() {
  return <>
    <section className="border-b border-[var(--rule)]"><div className="mx-auto max-w-[96rem] px-5 py-20 md:px-8 md:py-32 xl:px-12"><Reveal><Eyebrow>Vereinshalle</Eyebrow><h1 className="display-title mt-5">Hallen-<br /><span className="text-[var(--muted)]">belegung.</span></h1><p className="mt-7 max-w-xl text-lg leading-7 text-[var(--muted)] md:text-xl">Der Wochenplan zeigt künftig alle Trainings- und Belegungszeiten unserer Vereinshalle.</p></Reveal></div></section>
    <section className="py-16 md:py-24"><div className="mx-auto grid max-w-[96rem] gap-8 px-5 md:grid-cols-[.7fr_1.3fr] md:px-8 xl:px-12"><Reveal><div className="flex flex-col gap-7"><div><CalendarRange className="text-[var(--blue)]" size={24} /><h2 className="mt-5 text-2xl font-medium tracking-[-.045em]">Wochenplan</h2><p className="mt-3 leading-7 text-[var(--muted)]">Die aktuellen Daten werden von Ulrich Mehn und Michael Witthaut bereitgestellt.</p></div><div className="border-l border-[var(--blue)] pl-4 text-sm leading-6 text-[var(--muted)]"><Info size={16} className="mb-2 text-[var(--blue)]" />Bitte beachte: Die Angaben sind noch nicht veröffentlicht und können nicht als verbindliche Buchung verwendet werden.</div></div></Reveal><Reveal delay={0.08}><EmptyState title="Wird aktualisiert" copy="Der aktuelle Wochenplan folgt bald." /></Reveal></div></section>
    <section className="border-t border-[var(--rule)] bg-[var(--surface-muted)] py-14"><div className="mx-auto flex max-w-[96rem] items-center gap-4 px-5 md:px-8 xl:px-12"><Clock3 className="text-[var(--blue)]" size={20} /><p className="text-sm leading-6 text-[var(--muted)]">Für kurzfristige Fragen zur Belegung wende dich bitte an den Vereinsvorstand.</p></div></section>
  </>;
}
