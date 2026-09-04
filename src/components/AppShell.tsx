import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Cookie, Home, MapPin, Menu, Moon, Share2, Sun, Trophy, UsersRound, Volleyball, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contact, departments } from '../content/site';
import { useTheme } from './theme-context';

const navItems = departments.map(({ name, slug }) => ({ name, to: `/${slug}` }));

type Toast = { message: string; visible: boolean };

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(() => localStorage.getItem('sus-cookie-consent') === null);
  const [toast, setToast] = useState<Toast>({ message: '', visible: false });

  const notify = (message: string) => {
    setToast({ message, visible: true });
    window.setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3200);
  };

  useEffect(() => {
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: 'auto' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.hash, location.pathname]);

  const saveConsent = (value: 'necessary' | 'all') => {
    localStorage.setItem('sus-cookie-consent', value);
    setCookieVisible(false);
    setCookieOpen(false);
    notify(value === 'all' ? 'Auswahl gespeichert. Diese Website lädt keine optionalen Tracker.' : 'Nur notwendige Einstellungen gespeichert.');
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--canvas)] text-[var(--ink)] transition-colors duration-300">
      <a className="skip-link" href="#content">Zum Inhalt springen</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="pb-24 md:pb-0"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer openCookieSettings={() => setCookieOpen(true)} notify={notify} />
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MoreSheet open={menuOpen} close={() => setMenuOpen(false)} />
      <CookieControls
        bannerVisible={cookieVisible}
        dialogOpen={cookieOpen}
        closeDialog={() => setCookieOpen(false)}
        saveConsent={saveConsent}
      />
      <ToastRegion toast={toast} />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color:var(--canvas)/.9] backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-[96rem] items-center justify-between px-5 md:h-20 md:px-8 xl:px-12">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="SuS Oestereiden – Startseite">
          <img src="/media/logo-sus.png" alt="" width="38" height="38" className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="text-[0.76rem] font-semibold tracking-[-0.03em] md:text-sm">SuS Oestereiden</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => <DesktopLink key={item.to} {...item} />)}
          <DesktopLink name="Hallenbelegung" to="/hallenbelegung" />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          <Link to="/mitgliedschaft" className="hidden button-primary sm:inline-flex">Mitglied werden <ChevronRight size={15} /></Link>
          <button className="button-icon lg:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function DesktopLink({ name, to }: { name: string; to: string }) {
  return <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>{name}</NavLink>;
}

function ThemeButton({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) {
  return <button className="button-icon" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Helles Design einschalten' : 'Dunkles Design einschalten'}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>;
}

function MobileNav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const location = useLocation();
  const tabs = [
    { name: 'Start', to: '/', icon: Home },
    { name: 'Fußball', to: '/fussball', icon: Trophy },
    { name: 'Halle', to: '/hallenbelegung', icon: Volleyball },
    { name: 'Mitglied', to: '/mitgliedschaft', icon: UsersRound },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[4.5rem] items-center justify-around border-t border-[var(--rule)] bg-[color:var(--canvas)/.94] px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Mobile Navigation">
      {tabs.map(({ name, to, icon: Icon }) => {
        const active = location.pathname === to;
        return <Link to={to} key={to} className={`mobile-tab ${active ? 'text-[var(--blue)]' : ''}`} aria-current={active ? 'page' : undefined}><Icon size={18} strokeWidth={active ? 2.2 : 1.7} /><span>{name}</span></Link>;
      })}
      <button type="button" className={`mobile-tab ${menuOpen ? 'text-[var(--blue)]' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Weitere Bereiche öffnen"><Menu size={19} /><span>Mehr</span></button>
    </nav>
  );
}

function MoreSheet({ open, close }: { open: boolean; close: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    if (open) {
      window.addEventListener('keydown', onKeyDown);
      window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return <AnimatePresence>{open && (
    <motion.div ref={dialogRef} className="fixed inset-0 z-50 bg-[var(--canvas)] lg:hidden" role="dialog" aria-modal="true" aria-label="Weitere Bereiche" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex h-17 items-center justify-between border-b border-[var(--rule)] px-5">
        <span className="eyebrow">Navigation</span>
        <div className="flex items-center gap-2"><ThemeButton theme={theme} toggleTheme={toggleTheme} /><button className="button-icon" type="button" onClick={close} aria-label="Menü schließen"><X size={19} /></button></div>
      </div>
      <nav className="flex h-[calc(100%-4.25rem)] flex-col justify-center px-5" aria-label="Weitere Bereiche">
        {[...navItems, { name: 'Hallenbelegung', to: '/hallenbelegung' }, { name: 'Mitglied werden', to: '/mitgliedschaft' }, { name: 'Impressum', to: '/impressum' }, { name: 'Datenschutz', to: '/datenschutz' }].map((item, index) => (
          <motion.div key={item.to} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.055, duration: 0.45 }}>
            <Link to={item.to} onClick={close} className="sheet-link">{item.name}<ChevronRight size={24} /></Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )}</AnimatePresence>;
}

function Footer({ openCookieSettings, notify }: { openCookieSettings: () => void; notify: (message: string) => void }) {
  return <footer className="border-t border-[var(--rule)]">
    <div className="mx-auto grid max-w-[96rem] gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8 md:py-18 xl:px-12">
      <div>
        <Link to="/" className="flex items-center gap-3"><img src="/media/logo-sus.png" alt="" width="46" height="46" className="h-11 w-11 object-contain" /><span className="font-semibold tracking-tight">SuS Oestereiden e.V. 1922</span></Link>
        <address className="mt-5 max-w-xs text-sm leading-6 not-italic text-[var(--muted)]">{contact.address}<br />Telefon {contact.phone}<br />{contact.email}</address>
        <div className="mt-5 flex gap-2"><button type="button" className="button-icon" onClick={() => notify('Instagram wird in Kürze verknüpft.')} aria-label="Instagram"><MapPin size={17} /></button><button type="button" className="button-icon" onClick={() => notify('Facebook wird in Kürze verknüpft.')} aria-label="Facebook"><Share2 size={17} /></button></div>
      </div>
      <FooterGroup title="Abteilungen" links={navItems} />
      <div>
        <p className="eyebrow">Rechtliches</p>
        <div className="mt-4 flex flex-col items-start gap-3 text-sm"><Link className="footer-link" to="/impressum">Impressum</Link><Link className="footer-link" to="/datenschutz">Datenschutzerklärung</Link><button type="button" onClick={openCookieSettings} className="footer-link flex items-center gap-2"><Cookie size={14} />Cookie-Einstellungen</button></div>
      </div>
    </div>
    <div className="mx-auto flex max-w-[96rem] flex-col gap-2 border-t border-[var(--rule)] px-5 py-5 text-xs text-[var(--muted)] sm:flex-row sm:justify-between md:px-8 xl:px-12"><span>© {new Date().getFullYear()} SuS Oestereiden e.V.</span><span>Der Verein für die Region.</span></div>
  </footer>;
}

function FooterGroup({ title, links }: { title: string; links: { name: string; to: string }[] }) {
  return <div><p className="eyebrow">{title}</p><div className="mt-4 flex flex-col gap-3">{links.map((link) => <Link className="footer-link text-sm" key={link.to} to={link.to}>{link.name}</Link>)}</div></div>;
}

function CookieControls({ bannerVisible, dialogOpen, closeDialog, saveConsent }: { bannerVisible: boolean; dialogOpen: boolean; closeDialog: () => void; saveConsent: (value: 'necessary' | 'all') => void }) {
  return <AnimatePresence>{(bannerVisible || dialogOpen) && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="fixed inset-x-4 bottom-22 z-[60] mx-auto max-w-xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-2xl md:bottom-6" role={dialogOpen ? 'dialog' : 'region'} aria-modal={dialogOpen || undefined} aria-label="Cookie-Einstellungen">
    <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Datenschutz</p><h2 className="mt-2 text-lg font-semibold tracking-tight">Ihre Auswahl, lokal gespeichert.</h2></div>{dialogOpen && <button type="button" className="button-icon" onClick={closeDialog} aria-label="Cookie-Einstellungen schließen"><X size={16} /></button>}</div>
    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Diese Website nutzt nur technische Einstellungen. Es werden keine optionalen Tracker geladen. Ihre Auswahl bleibt ausschließlich in diesem Browser.</p>
    <div className="mt-5 flex flex-wrap gap-2"><button className="button-secondary" type="button" onClick={() => saveConsent('necessary')}>Nur notwendig</button><button className="button-primary" type="button" onClick={() => saveConsent('all')}>Auswahl speichern</button></div>
  </motion.div>}</AnimatePresence>;
}

function ToastRegion({ toast }: { toast: Toast }) {
  return <AnimatePresence>{toast.visible && <motion.div role="status" className="fixed left-1/2 top-22 z-[70] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 text-sm shadow-xl" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{toast.message}</motion.div>}</AnimatePresence>;
}
