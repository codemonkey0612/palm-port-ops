import { AGENTS } from '@/data/mockData';
import type { Agent } from '@/types';

export function getAgentStyle(code: string): Agent {
  return AGENTS.find(a => a.code === code) ?? {
    code,
    name: code,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300',
  };
}

export function formatTime(t: string): string {
  if (!t || t.length < 4) return t;
  return `${t.slice(0, 2)}:${t.slice(2)}`;
}

export function getWeekDates(startDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function formatDateHeader(d: Date): { day: string; date: string } {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days[d.getDay()],
    date: `${d.getMonth() + 1}/${d.getDate()}`,
  };
}

export function formatDateFull(d: Date): string {
  return d.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function mondayOf(d: Date): Date {
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}
