export type DepartmentSlug = 'fussball' | 'volleyball' | 'tennis' | 'breitensport';

export type Department = {
  slug: DepartmentSlug;
  name: string;
  lead: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  offerings: string[];
};

export const departments: Department[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    lead: 'Fußball für jedes Alter.',
    description: 'Von der E-Jugend bis zu den Senioren – gemeinsam aktiv in der SG Haarstrang.',
    detail: 'Der Fußball verbindet Generationen. Von den ersten Ballkontakten bis zum Seniorensport steht das Miteinander im Mittelpunkt.',
    image: '/media/football.jpg',
    imageAlt: 'Fußbälle auf dem Rasen',
    offerings: ['Jugendfußball', 'Senioren', 'SG Haarstrang', 'Gemeinschaft'],
  },
  {
    slug: 'volleyball',
    name: 'Volleyball',
    lead: 'Gemeinsam über das Netz.',
    description: 'Hallenvolleyball für Damen, Herren und Jugend – von den Minis bis zur 1. Mannschaft.',
    detail: 'Schnelle Ballwechsel, Teamgeist und eine offene Gemeinschaft prägen den Volleyball in Oestereiden.',
    image: '/media/volleyball-celebration.jpg',
    imageAlt: 'Volleyballmannschaft beim Jubeln',
    offerings: ['Minis & Jugend', 'Damen', 'Herren', '1. Mannschaft'],
  },
  {
    slug: 'tennis',
    name: 'Tennis',
    lead: 'Spiel. Satz. Gemeinschaft.',
    description: 'Moderne Tennisanlage, Jugendförderung und ein eigener Trainer für Sport mit Perspektive.',
    detail: 'Ob Einstieg, Training oder Mannschaft: Auf unserer Anlage finden Tennisbegeisterte Raum für ihr Spiel.',
    image: '/media/tennis-court.jpg',
    imageAlt: 'Tennisplatz auf der Vereinsanlage',
    offerings: ['Jugendförderung', 'Trainer', 'Mannschaften', 'Tennisanlage'],
  },
  {
    slug: 'breitensport',
    name: 'Breitensport',
    lead: 'Bewegung, die verbindet.',
    description: 'Kindertanzen, Kinderturnen, Fitness, Fit Mix und Nordic Walking für die ganze Familie.',
    detail: 'Vielfältige Bewegungsangebote schaffen einen unkomplizierten Rahmen für Gesundheit, Spaß und Begegnung.',
    image: '/media/breitensport.jpg',
    imageAlt: 'Kinder beim gemeinsamen Tanzen',
    offerings: ['Kindertanzen', 'Kinderturnen', 'Fitness & Fit Mix', 'Nordic Walking'],
  },
];

export const board = [
  { name: 'Ulrich Mehn', role: 'Vereinsvorsitzender', image: '/media/ulrich-mehn.jpg' },
  { name: 'Michael Witthaut', role: 'Geschäftsführer', image: '/media/michael-witthaut.jpg' },
  { name: 'Volker Körn', role: 'Stellvertretender Vorsitzender', image: '/media/volker-koern.jpg' },
  { name: 'Klaus Rossa', role: 'Kassierer', image: '/media/klaus-rossa.jpg' },
  { name: 'Pascal Rückert', role: 'Stellvertretender Vorsitzender', image: '/media/pascal-rueckert.jpg' },
  { name: 'Robin Heidel', role: 'Stellvertretender Vorsitzender', image: '/media/robin-heidel.jpg' },
];

export const departmentLeads = [
  { name: 'Rolf Benteler', role: 'Fußball', image: '/media/rolf-benteler.png' },
  { name: 'Doris Witthaut', role: 'Volleyball', image: '/media/volleyball.jpg' },
  { name: 'Gerrit Keil', role: 'Tennis', image: '/media/gerrit-keil.jpg' },
  { name: 'Carina Kaltschmidt', role: 'Breitensport', image: '/media/carina-kaltschmidt.png' },
];

export const sponsors = [
  { name: 'Eickhoff', image: '/media/sponsor-eickhoff.png' },
  { name: 'Sparkasse Lippstadt', image: '/media/sponsor-sparkasse.png' },
  { name: 'Volksbank Brilon-Büren-Salzkotten', image: '/media/sponsor-volksbank.png' },
  { name: 'Warsteiner', image: '/media/sponsor-warsteiner.png' },
  { name: 'Witthaut', image: '/media/sponsor-witthaut.png' },
];

export const contact = {
  address: 'Im Kirchfeld 1 · 59602 Rüthen',
  phone: '+49 2954 924590',
  email: 'info@sus-oestereiden.de',
};
