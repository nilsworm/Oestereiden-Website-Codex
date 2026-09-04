import { ArrowRight, UsersRound } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { departments, type DepartmentSlug } from '../content/site';
import { EmptyState, Eyebrow, SectionHeading } from '../components/PageParts';
import { Reveal } from '../components/Reveal';

const departmentBoard: Record<DepartmentSlug, { name: string; role: string; image: string }> = {
  fussball: { name: 'Rolf Benteler', role: 'Abteilungsvorsitzender Fußball', image: '/media/rolf-benteler.png' },
  volleyball: { name: 'Doris Witthaut', role: 'Abteilungsvorsitzende Volleyball', image: '/media/volleyball.jpg' },
  tennis: { name: 'Gerrit Keil', role: 'Abteilungsvorsitzender Tennis', image: '/media/gerrit-keil.jpg' },
  breitensport: { name: 'Carina Kaltschmidt', role: 'Abteilungsvorsitzende Breitensport', image: '/media/carina-kaltschmidt.png' },
};

export function DepartmentPage() {
  const { slug } = useParams();
  const department = departments.find((item) => item.slug === slug);
  if (!department) return <Navigate to="/" replace />;
  const lead = departmentBoard[department.slug];
  return <>
    <section className="border-b border-[var(--rule)]">
      <div className="mx-auto grid min-h-[min(74svh,48rem)] max-w-[96rem] md:grid-cols-[.92fr_1.08fr]">
        <div className="flex flex-col justify-end px-5 py-14 md:px-8 md:py-18 xl:px-12">
          <Reveal><Eyebrow>Abteilung</Eyebrow><h1 className="display-title mt-5">{department.name}.</h1><p className="mt-7 max-w-md text-xl leading-8 tracking-[-.025em] text-[var(--muted)] md:text-2xl">{department.lead}</p><p className="mt-8 max-w-lg text-base leading-7 text-[var(--muted)]">{department.detail}</p></Reveal>
        </div>
        <Reveal className="min-h-80 md:min-h-full"><div className="department-hero h-full bg-[radial-gradient(ellipse_at_50%_50%,var(--blue-glow),transparent_57%)] p-5 md:p-8"><img className="h-full w-full object-cover" src={department.image} alt={department.imageAlt} fetchPriority="high" /></div></Reveal>
      </div>
    </section>
    <section className="py-20 md:py-32"><div className="mx-auto grid max-w-[96rem] gap-10 px-5 md:grid-cols-[1.08fr_.92fr] md:px-8 xl:px-12"><Reveal><Eyebrow>Unser Angebot</Eyebrow><h2 className="section-title mt-4">Der Sport,<br />der zu dir passt.</h2></Reveal><Reveal delay={0.08}><ul className="border-t border-[var(--rule)]">{department.offerings.map((offering, index) => <li className="flex items-center justify-between border-b border-[var(--rule)] py-5" key={offering}><span className="text-lg font-medium tracking-[-.035em]">{offering}</span><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--rule)] text-xs text-[var(--muted)]">0{index + 1}</span></li>)}</ul></Reveal></div></section>
    <section className="border-y border-[var(--rule)] bg-[var(--surface-muted)] py-20 md:py-28"><div className="mx-auto grid max-w-[96rem] gap-10 px-5 md:grid-cols-[.8fr_1.2fr] md:items-center md:px-8 xl:px-12"><Reveal><img src={lead.image} alt={lead.name} className="aspect-square w-full max-w-72 object-cover object-top md:max-w-sm" loading="lazy" /></Reveal><Reveal delay={0.1}><Eyebrow>Abteilungsvorstand</Eyebrow><h2 className="mt-4 text-3xl font-medium tracking-[-.055em] md:text-5xl">{lead.name}</h2><p className="mt-3 text-[var(--muted)]">{lead.role}</p><p className="mt-7 max-w-xl text-base leading-7 text-[var(--muted)]">Für Fragen rund um Training, Teams und Angebote ist die Abteilungsleitung deine erste Anlaufstelle.</p></Reveal></div></section>
    <section className="py-20 md:py-32"><SectionHeading eyebrow="Aktuelles" title={`Neuigkeiten aus ${department.name}.`} copy="Spielpläne, Trainingszeiten und aktuelle Hinweise werden redaktionell ergänzt." /><div className="mx-auto mt-10 max-w-[96rem] px-5 md:mt-14 md:px-8 xl:px-12"><Reveal><EmptyState title="Wird aktualisiert" copy="Neue Termine und Meldungen folgen bald." /></Reveal></div></section>
    <section className="border-t border-[var(--rule)] py-14"><div className="mx-auto flex max-w-[96rem] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center md:px-8 xl:px-12"><div className="flex items-center gap-3"><UsersRound className="text-[var(--blue)]" size={21} /><p className="text-lg font-medium tracking-[-.035em]">Teil der Gemeinschaft werden.</p></div><Link className="button-primary w-fit" to="/mitgliedschaft">Mitglied werden <ArrowRight size={16} /></Link></div></section>
  </>;
}
