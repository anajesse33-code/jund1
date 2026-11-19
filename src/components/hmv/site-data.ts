export type ViewId =
  | 'home'
  | 'inventory'
  | 'buy'
  | 'sell'
  | 'repairs'
  | 'about'
  | 'contact';

export const SITE = {
  domain: 'hmvbuysellandrepairs.com',
  brand: 'HMV',
  brandFull: 'HMV Buy, Sell & Repairs',
  tagline: 'Heavy Machinery & Vehicles — We Buy, Sell & Repair',
  phoneDisplay: '(562) 244-9500',
  phoneHref: 'tel:+15622449500',
  email: 'info@hmvbuysellandrepairs.com',
  salesEmail: 'sales@hmvbuysellandrepairs.com',
  repairsEmail: 'repairs@hmvbuysellandrepairs.com',
  address: '6801 Roosevelt Blvd, Jacksonville, FL 32212, United States',
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  year: new Date().getFullYear(),
};

export const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'buy', label: 'Buy Ours' },
  { id: 'sell', label: 'Sell Yours' },
  { id: 'repairs', label: 'Repairs' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const EQUIPMENT_CATEGORIES = [
  'All',
  'Excavators',
  'Dozers',
  'Wheel Loaders',
  'Backhoes',
  'Cranes',
  'Motor Graders',
  'Dump Trucks',
  'Skid Steers',
];

export const EQUIPMENT_TYPES_WE_BUY = [
  'Excavators',
  'Dozers',
  'Wheel Loaders',
  'Backhoes',
  'Motor Graders',
  'Cranes',
  'Articulated Dump Trucks',
  'Skid Steers',
  'Telehandlers',
  'Compactors',
  'Aerial Lifts',
  'Trenchers',
];

export const BRANDS = [
  'Caterpillar',
  'Komatsu',
  'John Deere',
  'Volvo CE',
  'JCB',
  'Kubota',
  'Bobcat',
  'Kawasaki',
  'Hitachi',
  'Link-Belt',
  'Genie',
  'Doosan',
];

export const LOCATIONS: { region: string; cities: string[] }[] = [
  {
    region: 'Americas',
    cities: ['United States', 'Canada', 'Mexico', 'Brazil', 'Chile', 'Panama'],
  },
  {
    region: 'Europe',
    cities: ['United Kingdom', 'Germany', 'Netherlands', 'Poland', 'Spain'],
  },
  {
    region: 'Middle East',
    cities: ['United Arab Emirates', 'Saudi Arabia'],
  },
  {
    region: 'Asia-Pacific',
    cities: ['Australia', 'Japan', 'Singapore', 'Philippines', 'Indonesia'],
  },
];

export const STATS = [
  { value: '2,400+', label: 'Machines bought & sold' },
  { value: '20+', label: 'Years of combined experience' },
  { value: '15+', label: 'Countries served worldwide' },
  { value: '48 hr', label: 'Typical quote turnaround' },
];

export const WHY_US = [
  {
    title: 'Running or Not',
    description:
      'We buy equipment in any condition — running, salvaged, or completely seized. Idle machines rusting in your yard cost you money every day.',
  },
  {
    title: 'We Handle Pickup',
    description:
      'Our haulers and freight partners cover every region we serve — ports, borders and job sites. Once we agree on a price, loading and transport are on us — no broker games, no hidden fees.',
  },
  {
    title: 'Fast, Fair Offers',
    description:
      'Send photos and specs and get a firm cash offer, usually within 48 hours. No endless "let me check with my guy" phone tag.',
  },
  {
    title: 'Refurbished, Not Just Resold',
    description:
      'Every machine we list has passed a full inspection and, where needed, a complete refurbishment in our own workshops before sale.',
  },
];

export const REPAIR_SERVICES = [
  {
    title: 'Engine & Powertrain',
    description:
      'Overhauls, head gaskets, turbo and injection work, transmission and final drive rebuilds for all major diesel machines.',
  },
  {
    title: 'Hydraulics',
    description:
      'Cylinder resealing and re-chroming, pump and motor rebuilds, hose replacement and full hydraulic system diagnostics.',
  },
  {
    title: 'Undercarriage & Tracks',
    description:
      'Track group replacement, roller and idler service, sprocket wear checks and alignment for tracked machines.',
  },
  {
    title: 'Electrical & Diagnostics',
    description:
      'Computer fault-code diagnostics, wiring repair, sensor replacement and full electrical troubleshooting.',
  },
  {
    title: 'Welding & Fabrication',
    description:
      'Boom and stick repair, bucket rebuilding, crack testing and hard-surfacing to put worn steel back to work.',
  },
  {
    title: 'Scheduled Maintenance',
    description:
      '100 / 250 / 500-hour services, fluid analysis and pre-season inspections that keep fleets running and resale value high.',
  },
];
