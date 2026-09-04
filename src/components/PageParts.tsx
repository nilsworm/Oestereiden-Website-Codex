import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />{children}</p>;
}

export function SectionHeading({ eyebrow, title, copy, link }: { eyebrow: string; title: string; copy?: string; link?: { to: string; label: string } }) {
  return <Reveal className="mx-auto flex max-w-[96rem] flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-8 xl:px-12">
    <div className="max-w-3xl"><Eyebrow>{eyebrow}</Eyebrow><h2 className="section-title mt-4">{title}</h2>{copy && <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">{copy}</p>}</div>
    {link && <Link className="text-link shrink-0" to={link.to}>{link.label}<ArrowUpRight size={16} /></Link>}
  </Reveal>;
}

export function EmptyState({ title = 'Wird aktualisiert', copy = 'Neue Inhalte folgen bald.' }: { title?: string; copy?: string }) {
  return <div className="flex aspect-[3/2] flex-col justify-between border border-[var(--rule)] bg-[var(--surface-muted)] p-5 md:p-7"><Eyebrow>{title}</Eyebrow><p className="max-w-xs text-2xl font-medium tracking-[-0.045em] md:text-3xl">{copy}</p></div>;
}

export function ContactDetails() {
  return <div className="grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2"><div className="bg-[var(--surface)] p-6"><MapPin size={19} className="text-[var(--blue)]" /><p className="mt-6 text-sm leading-6 text-[var(--muted)]">Im Kirchfeld 1<br />59602 Rüthen</p></div><div className="bg-[var(--surface)] p-6"><CalendarDays size={19} className="text-[var(--blue)]" /><p className="mt-6 text-sm leading-6 text-[var(--muted)]">Telefon +49 2954 924590<br />info@sus-oestereiden.de</p></div></div>;
}
