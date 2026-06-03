import type { TravelJob, CleaningJob, TravelStaff, CleaningStaff, Agent, Vehicle } from '@/types';

export const AGENTS: Agent[] = [
  { code: 'JTB',  name: 'JTB',               bgColor: 'bg-emerald-100', textColor: 'text-emerald-800', borderColor: 'border-emerald-400' },
  { code: 'LOOK', name: 'LOOK',              bgColor: 'bg-blue-100',    textColor: 'text-blue-800',    borderColor: 'border-blue-400' },
  { code: 'HIS',  name: 'HIS',               bgColor: 'bg-orange-100',  textColor: 'text-orange-800',  borderColor: 'border-orange-400' },
  { code: 'DOA',  name: 'DOA',               bgColor: 'bg-yellow-100',  textColor: 'text-yellow-800',  borderColor: 'border-yellow-400' },
  { code: 'AABH', name: 'Australia & Beyond', bgColor: 'bg-purple-100',  textColor: 'text-purple-800',  borderColor: 'border-purple-400' },
  { code: 'HISS', name: 'HIS Shuttle',        bgColor: 'bg-rose-100',    textColor: 'text-rose-800',    borderColor: 'border-rose-400' },
  { code: 'NULL', name: 'OFFICE',             bgColor: 'bg-gray-100',    textColor: 'text-gray-600',    borderColor: 'border-gray-300' },
];

export const TRAVEL_STAFF: TravelStaff[] = [
  { code: 'FK', firstName: 'Fumiatsu', lastName: 'Kamata',     role: 'guide',  phone: '0475-077-376', color: '#d1fae5' },
  { code: 'NM', firstName: 'Mikako',   lastName: 'Nakai',      role: 'guide',  phone: '0401-823-',    color: '#dbeafe' },
  { code: 'RY', firstName: 'Ryoko',    lastName: 'Jones',      role: 'guide',  phone: '0448-491-061', color: '#ede9fe' },
  { code: 'SH', firstName: 'Shoko',    lastName: 'Hudson',     role: 'guide',  phone: '0407-154-',    color: '#fee2e2' },
  { code: 'MM', firstName: 'Miwa',     lastName: 'Mori',       role: 'guide',  phone: '0413-970-980', color: '#fef3c7' },
  { code: 'TS', firstName: 'T',        lastName: 'S',          role: 'driver', phone: '0405-765-677', color: '#d1fae5' },
  { code: 'TG', firstName: 'T',        lastName: 'G',          role: 'driver', phone: '0412-627-490', color: '#dbeafe' },
  { code: 'NK', firstName: 'N',        lastName: 'K',          role: 'driver', phone: '0415-784-888', color: '#ede9fe' },
  { code: 'YJ', firstName: 'Y',        lastName: 'J',          role: 'driver', phone: '0422-129-523', color: '#fce7f3' },
  { code: 'SA', firstName: 'S',        lastName: 'A',          role: 'driver', phone: '0492-877-824', color: '#fef3c7' },
];

export const CLEANING_STAFF: CleaningStaff[] = [
  { code: 'NS', firstName: 'Nanase',  lastName: 'Uraoka',    phone: '0493-492-806', color: '#d1fae5' },
  { code: 'MD', firstName: 'Minami',  lastName: 'Onodera',   phone: '0413-165-937', color: '#dbeafe' },
  { code: 'MN', firstName: 'Manami',  lastName: 'Suehiro',   phone: '0432-810-302', color: '#ede9fe' },
  { code: 'YK', firstName: 'Yuki',    lastName: 'Matsumoto', phone: '0420-649-961', color: '#fce7f3' },
  { code: 'MO', firstName: 'Mio',     lastName: 'Ogino',     phone: '0420-277-027', color: '#fef3c7' },
  { code: 'NZ', firstName: 'Nozomu',  lastName: 'Hirobe',    phone: '0420-???-???', color: '#fee2e2' },
  { code: 'RO', firstName: 'Rio',     lastName: 'Uenishi',   phone: '0420-???-???', color: '#e0f2fe' },
];

export const VEHICLES: Vehicle[] = [
  { code: 'P5',  name: 'P5',  type: 'Toyota Hiace',    capacity: 12, paxCapacity: 11, regoNo: 'C/862FU9',  year: 2022, remark: 'New model hiace' },
  { code: 'P7',  name: 'P7',  type: 'Yutong D7',       capacity: 29, paxCapacity: 28, regoNo: 'C/XB83OM',  year: 2024, remark: '2024 YUTONG' },
  { code: 'P9',  name: 'P9',  type: 'Toyota Coaster',  capacity: 22, paxCapacity: 21, regoNo: 'C/XB86WU',  year: 2025, remark: 'Towbar' },
  { code: 'P11', name: 'P11', type: 'IRIZAR I6',        capacity: 54, paxCapacity: 53, regoNo: 'C/XB17JR',  year: 2023, remark: 'IRIZAR I6' },
  { code: 'P12', name: 'P12', type: 'Mitsubishi Rosa',  capacity: 25, paxCapacity: 24, regoNo: 'C/XB95AC',  year: 2017, remark: 'Mitsubishi Rosa' },
  { code: 'P14', name: 'P14', type: 'Yutong C12',       capacity: 58, paxCapacity: 57, regoNo: 'C/XB79ML',  year: 2024, remark: '2024 Yutong Z' },
  { code: 'P15', name: 'P15', type: 'Yutong C12',       capacity: 58, paxCapacity: 57, regoNo: 'C/XC29BI',  year: 2026, remark: '2026 Yutong Z' },
  { code: 'ODY', name: 'ODY', type: 'Honda Odyssey',    capacity: 8,  paxCapacity: 7,  regoNo: 'C/788BD4',  year: 2017, remark: 'ODYSSEY' },
  { code: 'TAR', name: 'TARAGO', type: 'Toyota Tarago', capacity: 7,  paxCapacity: 5,  regoNo: 'C/433YLS',  year: 2018, remark: 'Tarago' },
  { code: 'MB',  name: 'MB',  type: 'Mercedes V-Class', capacity: 7,  paxCapacity: 6,  regoNo: 'C/966OK8',  year: 2025, remark: 'Mercedes-Benz' },
];

// Week: June 1–7, 2026
export const TRAVEL_JOBS: TravelJob[] = [
  // FK - Fumiatsu
  { id: 't001', date: '2026-06-01', staffCode: 'FK', bkNo: '1137020', agtCode: 'LOOK', tourName: 'LOOK',              tourNo: 'C260601004', serviceDesc: 'I APT/HTL COACH WZ GD',     pax: 4,  inf: 0, tc: 0, startTime: '0430', finishTime: '0900', startPlace: 'JQ26', finishPlace: 'HIL',  coachCode: 'P14', agtHr: 3,   payHr: 2,    unitPrice: 102,    agtFees: 408,    note: '' },
  { id: 't002', date: '2026-06-03', staffCode: 'FK', bkNo: '1137054', agtCode: 'HIS',  tourName: 'HIS',               tourNo: '',           serviceDesc: 'HTL/APT JSDG6',            pax: 2,  inf: 0, tc: 0, startTime: '0815', finishTime: '1000', startPlace: 'DBL', finishPlace: 'JQ951', coachCode: 'P5',  agtHr: 1.5, payHr: 1.5,  unitPrice: 238,    agtFees: 238,    note: '' },
  { id: 't003', date: '2026-06-05', staffCode: 'FK', bkNo: '1137089', agtCode: 'JTB',  tourName: 'JTB MED A1311<KAMI> GRP16', tourNo: '',  serviceDesc: 'I APT/HTL COACH WZ GD',     pax: 16, inf: 0, tc: 0, startTime: '0435', finishTime: '1000', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P11', agtHr: 3,   payHr: 2,    unitPrice: 102,    agtFees: 1632,   note: '' },
  { id: 't004', date: '2026-06-06', staffCode: 'FK', bkNo: '1137101', agtCode: 'JTB',  tourName: 'JTB MED A1311<KAMI> GRP16', tourNo: '',  serviceDesc: 'HTL/SS 5H/HTL COACH20STR', pax: 16, inf: 0, tc: 0, startTime: '0800', finishTime: '1400', startPlace: 'PAC', finishPlace: 'PAC',  coachCode: 'P11', agtHr: 5,   payHr: 5,    unitPrice: 102,    agtFees: 1632,   note: 'Hartley+Kuranda' },

  // NM - Mikako
  { id: 't005', date: '2026-06-01', staffCode: 'NM', bkNo: '1136741', agtCode: 'AABH', tourName: 'HMN HIROTSU CPL & F', tourNo: 'ABRF128984', serviceDesc: 'HTL/APT JSDG6STR',        pax: 2,  inf: 0, tc: 0, startTime: '1045', finishTime: '1200', startPlace: 'HIL', finishPlace: 'QF703',coachCode: 'P5',  agtHr: 0,   payHr: 2,    unitPrice: 238,    agtFees: 238,    note: '' },
  { id: 't006', date: '2026-06-02', staffCode: 'NM', bkNo: '1137021', agtCode: 'LOOK', tourName: 'LOOK',              tourNo: 'C260601005', serviceDesc: 'I APT/HTL COACH WZ GD 04-07am', pax: 12, inf: 0, tc: 0, startTime: '0535', finishTime: '0900', startPlace: 'JQ16', finishPlace: 'HIL', coachCode: 'P11', agtHr: 3,   payHr: 2.25, unitPrice: 102,    agtFees: 1224,   note: '' },
  { id: 't007', date: '2026-06-04', staffCode: 'NM', bkNo: '1137060', agtCode: 'DOA',  tourName: 'NTA TAKIGAWA DAIN 74', tourNo: 'SW-260530-EA', serviceDesc: 'HTL/SS 8H/HTL JSG',   pax: 74, inf: 0, tc: 2, startTime: '0945', finishTime: '1730', startPlace: 'OAS', finishPlace: 'OAS',  coachCode: 'P14', agtHr: 8,   payHr: 8,    unitPrice: 536,    agtFees: 536,    note: 'Kuranda' },

  // RY - Ryoko
  { id: 't008', date: '2026-06-01', staffCode: 'RY', bkNo: '1137026', agtCode: 'JTB',  tourName: 'A1450<KAMI>GRP11',  tourNo: '7A50471147', serviceDesc: 'I APT/HTL JSG',            pax: 11, inf: 0, tc: 0, startTime: '0435', finishTime: '0800', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P9',  agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 1122,   note: '' },
  { id: 't009', date: '2026-06-02', staffCode: 'RY', bkNo: '1137027', agtCode: 'JTB',  tourName: 'A1450<KAMI>GRP11',  tourNo: '7A50471147', serviceDesc: 'HTL/SS 10H/HTL JSG',       pax: 11, inf: 0, tc: 0, startTime: '0800', finishTime: '1800', startPlace: 'PAC', finishPlace: 'PAC',  coachCode: 'P9',  agtHr: 10,  payHr: 10,   unitPrice: 102,    agtFees: 1122,   note: 'Hartley+Kuranda' },
  { id: 't010', date: '2026-06-05', staffCode: 'RY', bkNo: '1137090', agtCode: 'JTB',  tourName: 'A6190<2026> GRP2',  tourNo: '7A60477513', serviceDesc: 'I APT/HTL JSG',            pax: 23, inf: 0, tc: 1, startTime: '0555', finishTime: '1000', startPlace: 'JQ16', finishPlace: 'PAC',  coachCode: 'P14', agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 2346,   note: '' },

  // SH - Shoko
  { id: 't011', date: '2026-06-03', staffCode: 'SH', bkNo: '1136769', agtCode: 'JTB',  tourName: 'Earth Trek Anniversary 26-1', tourNo: '7A60476757', serviceDesc: 'D APT/HTL COACH20STR', pax: 9, inf: 0, tc: 1, startTime: '1255', finishTime: '1400', startPlace: 'QF922', finishPlace: 'OAS', coachCode: 'P12', agtHr: 1.75, payHr: 1.75, unitPrice: 193, agtFees: 193, note: '' },
  { id: 't012', date: '2026-06-04', staffCode: 'SH', bkNo: '1137070', agtCode: 'JTB',  tourName: 'Earth Trek Anniversary 26-1', tourNo: '7A60476757', serviceDesc: 'HTL/APT JSG (GRP) AS JSG', pax: 9, inf: 0, tc: 1, startTime: '0830', finishTime: '1100', startPlace: 'OAS', finishPlace: 'JQ15', coachCode: 'P12', agtHr: 2.5, payHr: 2.5, unitPrice: 273, agtFees: 273, note: '' },
  { id: 't013', date: '2026-06-06', staffCode: 'SH', bkNo: '1137091', agtCode: 'LOOK', tourName: 'LOOK',              tourNo: 'C260601004', serviceDesc: 'I APT/HTL JSDG 04-07am',   pax: 2,  inf: 0, tc: 0, startTime: '0430', finishTime: '0700', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P5',  agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 204,    note: '' },

  // TS - Driver
  { id: 't014', date: '2026-06-01', staffCode: 'TS', bkNo: '1137022', agtCode: 'JTB',  tourName: 'A1450<KAMI>GRP11',  tourNo: '7A50471147', serviceDesc: 'I APT/HTL COACH20STR',     pax: 11, inf: 0, tc: 0, startTime: '0435', finishTime: '0800', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P9',  agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 1122,   note: '' },
  { id: 't015', date: '2026-06-03', staffCode: 'TS', bkNo: '1137028', agtCode: 'JTB',  tourName: 'A1450<KAMI>GRP11',  tourNo: '7A50471147', serviceDesc: 'I APT/HTL COACH33STR',     pax: 11, inf: 0, tc: 0, startTime: '0555', finishTime: '0900', startPlace: 'JQ16', finishPlace: 'PAC',  coachCode: 'P14', agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 1122,   note: '' },
  { id: 't016', date: '2026-06-05', staffCode: 'TS', bkNo: '1137091', agtCode: 'JTB',  tourName: 'A1450<KAMI>GRP11',  tourNo: '7A50471147', serviceDesc: 'HTL/SS 5H/HTL COACH20STR (up to City1230)', pax: 11, inf: 0, tc: 1, startTime: '0800', finishTime: '1500', startPlace: 'PAC', finishPlace: 'PAC', coachCode: 'P9', agtHr: 5, payHr: 5, unitPrice: 102, agtFees: 1122, note: 'Hartley+Kuranda' },

  // TG - Driver
  { id: 't017', date: '2026-06-01', staffCode: 'TG', bkNo: '1137024', agtCode: 'LOOK', tourName: 'LOOK',              tourNo: 'C260601006', serviceDesc: 'D APT/HTL JSDG',           pax: 2,  inf: 0, tc: 0, startTime: '1500', finishTime: '1700', startPlace: 'QF708', finishPlace: 'HIL', coachCode: 'P5',  agtHr: 2.5, payHr: 3,    unitPrice: 130,    agtFees: 260,    note: '' },
  { id: 't018', date: '2026-06-04', staffCode: 'TG', bkNo: '1137075', agtCode: 'HIS',  tourName: 'KLEC GRP1',         tourNo: 'SKG0303-0528', serviceDesc: 'I APT/HTL JSG',          pax: 14, inf: 0, tc: 0, startTime: '0430', finishTime: '0700', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P12', agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 1428,   note: '' },
  { id: 't019', date: '2026-06-06', staffCode: 'TG', bkNo: '1137092', agtCode: 'DOA',  tourName: 'NTA TAKIGAWA DAIN 74', tourNo: 'SW-260530-EA', serviceDesc: 'D APT/HTL JSG',      pax: 74, inf: 0, tc: 2, startTime: '0800', finishTime: '1000', startPlace: 'OAS', finishPlace: 'QF1963', coachCode: 'P14', agtHr: 3, payHr: 3, unitPrice: 593, agtFees: 593, note: '' },

  // NK - Driver
  { id: 't020', date: '2026-06-02', staffCode: 'NK', bkNo: '1137029', agtCode: 'JTB',  tourName: 'A6190<2026> GRP2',  tourNo: '7A60477513', serviceDesc: 'I APT/HTL JSG',            pax: 23, inf: 0, tc: 1, startTime: '0555', finishTime: '0900', startPlace: 'JQ16', finishPlace: 'PAC',  coachCode: 'P14', agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 2346,   note: '' },
  { id: 't021', date: '2026-06-05', staffCode: 'NK', bkNo: '1137093', agtCode: 'JTB',  tourName: 'A6190<2026> GRP2',  tourNo: '7A60477513', serviceDesc: 'HTL/SS 8H/HTL JSG',        pax: 23, inf: 0, tc: 1, startTime: '1000', finishTime: '1730', startPlace: 'PAC', finishPlace: 'PAC',  coachCode: 'P14', agtHr: 8,   payHr: 8,    unitPrice: 102,    agtFees: 2346,   note: 'Kuranda' },

  // YJ - Driver
  { id: 't022', date: '2026-06-03', staffCode: 'YJ', bkNo: '1137055', agtCode: 'HIS',  tourName: 'HIS',               tourNo: '',           serviceDesc: 'D APT/HTL JSDG6',          pax: 2,  inf: 0, tc: 0, startTime: '1825', finishTime: '2000', startPlace: 'MAT', finishPlace: 'JQ954', coachCode: 'P5',  agtHr: 2,   payHr: 1.5,  unitPrice: 291,    agtFees: 291,    note: '' },
  { id: 't023', date: '2026-06-05', staffCode: 'YJ', bkNo: '1137094', agtCode: 'HIS',  tourName: 'KLEC GRP1',         tourNo: 'SKG0303-0528', serviceDesc: 'I APT/HTL COACH24STR',   pax: 14, inf: 0, tc: 1, startTime: '0430', finishTime: '0700', startPlace: 'JQ26', finishPlace: 'PAC',  coachCode: 'P12', agtHr: 3,   payHr: 3,    unitPrice: 102,    agtFees: 1428,   note: '' },
  { id: 't024', date: '2026-06-06', staffCode: 'YJ', bkNo: '1137095', agtCode: 'JTB',  tourName: 'A6190<2026> GRP2',  tourNo: '7A60477513', serviceDesc: 'CITY/KURANDA TRSF COACH33STR', pax: 23, inf: 0, tc: 1, startTime: '1000', finishTime: '1400', startPlace: 'PAC', finishPlace: 'Kuranda', coachCode: 'P14', agtHr: 3, payHr: 3, unitPrice: 102, agtFees: 2346, note: '' },
];

export const CLEANING_JOBS: CleaningJob[] = [
  // NS - Nanase
  { id: 'c001', date: '2026-06-01', staffCode: 'NS', clientName: 'Sarah',    suburb: 'Redlynch',    street: '14 Maple St',        startTime: '0930', finishTime: '1130', hours: 2,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c002', date: '2026-06-01', staffCode: 'NS', clientName: 'Janine',   suburb: 'Yorkeys Knob',street: '8 Ocean View Dr',    startTime: '1200', finishTime: '1400', hours: 2,   type: 'Weekly',      notes: 'Side gate code 4521',                    keyRequired: true,  confirmed: true  },
  { id: 'c003', date: '2026-06-01', staffCode: 'NS', clientName: 'Claire',   suburb: 'Whitfield',   street: '25 Collinson St',    startTime: '1430', finishTime: '1730', hours: 3,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c004', date: '2026-06-03', staffCode: 'NS', clientName: 'Fungai',   suburb: 'Bayview',     street: '3 View Crt',         startTime: '0715', finishTime: '0915', hours: 2,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c005', date: '2026-06-03', staffCode: 'NS', clientName: 'Lucia',    suburb: 'Fans',        street: '12 Fans Rd',         startTime: '0930', finishTime: '1130', hours: 2,   type: 'Weekly',      notes: 'Vacuum only downstairs',                 keyRequired: false, confirmed: false },
  { id: 'c006', date: '2026-06-03', staffCode: 'NS', clientName: 'Rae',      suburb: 'Spring',      street: '7 Spring St',        startTime: '1145', finishTime: '1545', hours: 4,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c007', date: '2026-06-05', staffCode: 'NS', clientName: 'Hope Vale', suburb: 'Cairns',     street: '45 Lake St',         startTime: '0615', finishTime: '0915', hours: 3,   type: 'One-off',     notes: 'End of lease clean',                     keyRequired: false, confirmed: true  },
  { id: 'c008', date: '2026-06-05', staffCode: 'NS', clientName: 'Josie',    suburb: 'Smithfield',  street: '88 Kennedy Hwy',     startTime: '1000', finishTime: '1200', hours: 2,   type: 'Fortnightly', notes: '',                                       keyRequired: true,  confirmed: true  },

  // MD - Minami
  { id: 'c009', date: '2026-06-02', staffCode: 'MD', clientName: 'Felecia',  suburb: 'Woree',       street: '49 Neptrite St',     startTime: '0800', finishTime: '0930', hours: 1.5, type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c010', date: '2026-06-02', staffCode: 'MD', clientName: 'John',     suburb: 'Earlville',   street: '13 Spring Vale Dr',  startTime: '0945', finishTime: '1345', hours: 4,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c011', date: '2026-06-03', staffCode: 'MD', clientName: 'Fiona',    suburb: 'Whitfield',   street: '9 Greenview Tce',    startTime: '0830', finishTime: '1130', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: false },
  { id: 'c012', date: '2026-06-03', staffCode: 'MD', clientName: 'David',    suburb: 'Parramatta',  street: '8/15-21 Clare St',   startTime: '1145', finishTime: '1545', hours: 4,   type: 'Weekly',      notes: '* Andi will be there to access',         keyRequired: false, confirmed: true  },
  { id: 'c013', date: '2026-06-04', staffCode: 'MD', clientName: 'Pamera',   suburb: 'Cairns',      street: '12 Abbott St',       startTime: '0800', finishTime: '1100', hours: 3,   type: 'Weekly',      notes: '',                                       keyRequired: true,  confirmed: true  },
  { id: 'c014', date: '2026-06-05', staffCode: 'MD', clientName: 'Luciano',  suburb: 'Bayview',     street: '56 Ocean Dr',        startTime: '0830', finishTime: '1430', hours: 6,   type: 'One-off',     notes: 'Bond clean',                             keyRequired: false, confirmed: true  },

  // MN - Manami
  { id: 'c015', date: '2026-06-01', staffCode: 'MN', clientName: 'Jason',    suburb: 'Cairns',      street: '22 Lyons St',        startTime: '0600', finishTime: '0800', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c016', date: '2026-06-01', staffCode: 'MN', clientName: 'Jason',    suburb: 'Redlynch',    street: '67 Redlynch Inlet',  startTime: '0800', finishTime: '1000', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: true,  confirmed: true  },
  { id: 'c017', date: '2026-06-01', staffCode: 'MN', clientName: 'Gerri',    suburb: 'Earlville',   street: '5 Earlville Rd',     startTime: '1045', finishTime: '1545', hours: 5,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: false },
  { id: 'c018', date: '2026-06-02', staffCode: 'MN', clientName: 'Jason',    suburb: 'Cairns',      street: '22 Lyons St',        startTime: '0800', finishTime: '1000', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c019', date: '2026-06-03', staffCode: 'MN', clientName: 'Leslee',   suburb: 'Palm Cove',   street: '2 Williams Espl',    startTime: '0930', finishTime: '1230', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: true,  confirmed: true  },
  { id: 'c020', date: '2026-06-04', staffCode: 'MN', clientName: 'Kathleen', suburb: 'Spring',      street: '19 Spring Mt Rd',    startTime: '1300', finishTime: '1500', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },

  // YK - Yuki
  { id: 'c021', date: '2026-06-01', staffCode: 'YK', clientName: 'Susan',    suburb: 'Edmonton',    street: '7 Windsor St',       startTime: '0700', finishTime: '0900', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c022', date: '2026-06-01', staffCode: 'YK', clientName: 'Gordon',   suburb: 'Gordonvale',  street: '12 Gordonvale Rd',   startTime: '0915', finishTime: '1215', hours: 3,   type: 'Fortnightly', notes: 'Red text = rescheduled',                 keyRequired: false, confirmed: false },
  { id: 'c023', date: '2026-06-01', staffCode: 'YK', clientName: 'Corinne',  suburb: 'Gordonvale',  street: '8 Brougham Rd',      startTime: '1230', finishTime: '1530', hours: 3,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c024', date: '2026-06-02', staffCode: 'YK', clientName: 'FNQ PS',   suburb: 'Cairns',      street: '79 Sheridan St',     startTime: '0600', finishTime: '0700', hours: 1,   type: 'Weekly',      notes: 'Office clean',                           keyRequired: true,  confirmed: true  },
  { id: 'c025', date: '2026-06-03', staffCode: 'YK', clientName: 'Deb',      suburb: 'Caravonica',  street: '14 Caravonica Rd',   startTime: '0800', finishTime: '1000', hours: 2,   type: 'Fortnightly', notes: 'Deb is a fussy client. Past complaints. Park carefully, driveway is on a slope.', keyRequired: false, confirmed: true },
  { id: 'c026', date: '2026-06-04', staffCode: 'YK', clientName: 'Alliance', suburb: 'Cairns City', street: 'Cairns Airport Dome', startTime: '0730', finishTime: '0830', hours: 1.25, type: 'Weekly',     notes: 'Airport dome weekly',                   keyRequired: true,  confirmed: true  },

  // MO - Mio (PT)
  { id: 'c027', date: '2026-06-02', staffCode: 'MO', clientName: 'Brody',    suburb: 'Mt Sheridan',  street: '45 Mt Sheridan Dr',  startTime: '0720', finishTime: '0930', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c028', date: '2026-06-02', staffCode: 'MO', clientName: 'Di',       suburb: 'Mt Sheridan',  street: '22 Sheridan Hts',    startTime: '0930', finishTime: '1230', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c029', date: '2026-06-02', staffCode: 'MO', clientName: 'Neil',     suburb: 'Bayview',      street: '7 Bay Crt',          startTime: '1245', finishTime: '1445', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: true,  confirmed: false },
  { id: 'c030', date: '2026-06-04', staffCode: 'MO', clientName: 'Josh',     suburb: 'Smithfield',   street: '31 Kennedy Hwy',     startTime: '0900', finishTime: '1200', hours: 3,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c031', date: '2026-06-04', staffCode: 'MO', clientName: 'Amy',      suburb: 'Kewarra',      street: '5 Baddely Close',    startTime: '1315', finishTime: '1615', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },

  // NZ - Nozomu
  { id: 'c032', date: '2026-06-02', staffCode: 'NZ', clientName: 'Luke-DVA', suburb: 'Machan\'s Beach', street: '2 Machan Blvd',   startTime: '0830', finishTime: '1030', hours: 2,   type: 'Fortnightly', notes: 'DVA client',                             keyRequired: false, confirmed: true  },
  { id: 'c033', date: '2026-06-03', staffCode: 'NZ', clientName: 'Kate',     suburb: 'Yorkeys Knob', street: '14 Yorkeys Rd',     startTime: '1115', finishTime: '1415', hours: 3,   type: 'Weekly',      notes: '',                                       keyRequired: true,  confirmed: true  },
  { id: 'c034', date: '2026-06-04', staffCode: 'NZ', clientName: 'Paul',     suburb: 'Redlynch',     street: '89 Redlynch Inlet', startTime: '1115', finishTime: '1515', hours: 4,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: false },

  // RO - Rio
  { id: 'c035', date: '2026-06-02', staffCode: 'RO', clientName: 'Wesley',   suburb: 'Trinity Beach', street: '3 Trinity Way',     startTime: '0600', finishTime: '0900', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },
  { id: 'c036', date: '2026-06-03', staffCode: 'RO', clientName: 'Neil',     suburb: 'Cairns City',  street: '15 Shield St',      startTime: '0745', finishTime: '0945', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: true,  confirmed: true  },
  { id: 'c037', date: '2026-06-04', staffCode: 'RO', clientName: 'Major',    suburb: 'Palm Cove',    street: '12 Williams Espl',  startTime: '0800', finishTime: '1000', hours: 2,   type: 'Weekly',      notes: '',                                       keyRequired: false, confirmed: false },
  { id: 'c038', date: '2026-06-05', staffCode: 'RO', clientName: 'Teressa',  suburb: 'Spring',       street: '5 Spring Lane',     startTime: '0900', finishTime: '1200', hours: 3,   type: 'Fortnightly', notes: '',                                       keyRequired: false, confirmed: true  },
];
