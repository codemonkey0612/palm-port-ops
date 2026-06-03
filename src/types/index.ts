export type Division = 'travel' | 'cleaning';

export interface TravelJob {
  id: string;
  date: string; // YYYY-MM-DD
  staffCode: string;
  bkNo: string;
  agtCode: string;
  tourName: string;
  tourNo: string;
  serviceDesc: string;
  pax: number;
  inf: number;
  tc: number;
  startTime: string;
  finishTime: string;
  startPlace: string;
  finishPlace: string;
  coachCode: string;
  agtHr: number;
  payHr: number;
  unitPrice: number;
  agtFees: number;
  note: string;
}

export interface CleaningJob {
  id: string;
  date: string; // YYYY-MM-DD
  staffCode: string;
  clientName: string;
  suburb: string;
  street: string;
  startTime: string;
  finishTime: string;
  hours: number;
  type: 'Weekly' | 'Fortnightly' | 'One-off';
  notes: string;
  keyRequired: boolean;
  confirmed: boolean;
}

export type AnyJob = TravelJob | CleaningJob;

export interface TravelStaff {
  code: string;
  firstName: string;
  lastName: string;
  role: 'guide' | 'driver';
  phone: string;
  color: string;
}

export interface CleaningStaff {
  code: string;
  firstName: string;
  lastName: string;
  phone: string;
  color: string;
}

export interface Agent {
  code: string;
  name: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface Vehicle {
  code: string;
  name: string;
  type: string;
  capacity: number;
  paxCapacity: number;
  regoNo: string;
  year: number;
  remark: string;
}
