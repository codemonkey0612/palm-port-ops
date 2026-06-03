'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { TRAVEL_STAFF, CLEANING_STAFF, TRAVEL_JOBS, CLEANING_JOBS } from '@/data/mockData';
import { TravelJobCard, CleaningJobCard } from '@/components/JobCard';
import JobDetailModal from '@/components/JobDetailModal';
import AddJobModal from '@/components/AddJobModal';
import { getWeekDates, toISODate, formatDateHeader, formatDateFull, mondayOf } from '@/lib/utils';
import type { TravelJob, CleaningJob, AnyJob, Division } from '@/types';

// ── Droppable cell ──────────────────────────────────────────────
function DroppableCell({ id, children, onClick }: {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={`
        min-h-[80px] p-1 border-r border-b border-gray-100 align-top cursor-pointer
        transition-colors
        ${isOver ? 'bg-blue-50 ring-2 ring-inset ring-blue-300' : 'hover:bg-gray-50/60'}
      `}
    >
      {children}
    </div>
  );
}

// ── Main board ──────────────────────────────────────────────────
export default function RosterBoard() {
  const [division, setDivision] = useState<Division>('travel');
  const [weekStart, setWeekStart] = useState<Date>(() => mondayOf(new Date('2026-06-01')));
  const [travelJobs, setTravelJobs] = useState<TravelJob[]>(TRAVEL_JOBS);
  const [cleaningJobs, setCleaningJobs] = useState<CleaningJob[]>(CLEANING_JOBS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<AnyJob | null>(null);
  const [addCell, setAddCell] = useState<{ staffCode: string; date: string } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const weekDates = getWeekDates(weekStart);
  const travelStaff = TRAVEL_STAFF;
  const cleaningStaff = CLEANING_STAFF;

  const prevWeek = () => setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; });
  const nextWeek = () => setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; });

  // ── Drag handlers ──
  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id as string);
  }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const [newStaff, newDate] = (over.id as string).split('__');
    if (division === 'travel') {
      setTravelJobs(prev => prev.map(j =>
        j.id === active.id ? { ...j, staffCode: newStaff, date: newDate } : j
      ));
    } else {
      setCleaningJobs(prev => prev.map(j =>
        j.id === active.id ? { ...j, staffCode: newStaff, date: newDate } : j
      ));
    }
  }, [division]);

  // ── Active job for overlay ──
  const activeJob = activeId
    ? (division === 'travel'
        ? travelJobs.find(j => j.id === activeId)
        : cleaningJobs.find(j => j.id === activeId))
    : null;

  // ── Stats ──
  const totalPax = travelJobs
    .filter(j => weekDates.some(d => toISODate(d) === j.date))
    .reduce((s, j) => s + j.pax, 0);
  const totalRevenue = travelJobs
    .filter(j => weekDates.some(d => toISODate(d) === j.date))
    .reduce((s, j) => s + j.agtFees, 0);
  const totalCleaningHours = cleaningJobs
    .filter(j => weekDates.some(d => toISODate(d) === j.date))
    .reduce((s, j) => s + j.hours, 0);

  const staff = division === 'travel' ? travelStaff : cleaningStaff;
  const jobs = division === 'travel' ? travelJobs : cleaningJobs;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ── Top bar ── */}
      <div className="bg-white border-b px-4 py-3 flex flex-col gap-3 shadow-sm">
        {/* Division tabs + week nav */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Division tabs */}
          <div className="flex rounded-lg bg-gray-100 p-1 gap-1">
            <button
              onClick={() => setDivision('travel')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                division === 'travel'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✈ 旅行・送迎
            </button>
            <button
              onClick={() => setDivision('cleaning')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                division === 'cleaning'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🧹 JQ 清掃
            </button>
          </div>

          {/* Add job button */}
          <button
            onClick={() => setAddCell({ staffCode: '', date: toISODate(weekDates[0]) })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white transition-colors ${
              division === 'travel' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            ＋ 新規追加
          </button>

          {/* Week navigation */}
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={prevWeek} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
              ‹
            </button>
            <span className="text-sm font-semibold text-gray-700 min-w-[180px] text-center">
              {formatDateFull(weekDates[0])} – {formatDateFull(weekDates[6])}
            </span>
            <button onClick={nextWeek} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
              ›
            </button>
            <button
              onClick={() => setWeekStart(mondayOf(new Date()))}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors font-medium"
            >
              今週
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 text-xs text-gray-500">
          {division === 'travel' ? (
            <>
              <span>
                今週 <span className="font-bold text-gray-800 text-sm">{travelJobs.filter(j => weekDates.some(d => toISODate(d) === j.date)).length}</span> 件
              </span>
              <span>
                PAX合計 <span className="font-bold text-gray-800 text-sm">{totalPax}</span> 名
              </span>
              <span>
                売上：<span className="font-bold text-emerald-700 text-sm">${totalRevenue.toLocaleString('en-AU', { minimumFractionDigits: 0 })}</span>
              </span>
            </>
          ) : (
            <>
              <span>
                今週 <span className="font-bold text-gray-800 text-sm">{cleaningJobs.filter(j => weekDates.some(d => toISODate(d) === j.date)).length}</span> 件
              </span>
              <span>
                総時間：<span className="font-bold text-sky-700 text-sm">{totalCleaningHours}h</span>
              </span>
              <span>
                確定：<span className="font-bold text-gray-800 text-sm">
                  {cleaningJobs.filter(j => weekDates.some(d => toISODate(d) === j.date) && j.confirmed).length}
                </span> / {cleaningJobs.filter(j => weekDates.some(d => toISODate(d) === j.date)).length} 件
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Roster grid ── */}
      <div className="flex-1 overflow-auto">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <table className="w-full border-collapse text-xs table-fixed min-w-[900px]">
            {/* Column widths */}
            <colgroup>
              <col style={{ width: '100px' }} />
              {weekDates.map((_, i) => <col key={i} />)}
              <col style={{ width: '60px' }} />
            </colgroup>

            {/* Header */}
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-800 text-white">
                <th className="p-2 text-left font-semibold text-gray-300 text-[11px] border-r border-gray-600">
                  {division === 'travel' ? 'ガイド / ドライバー' : 'クリーナー'}
                </th>
                {weekDates.map(d => {
                  const { day, date } = formatDateHeader(d);
                  const isToday = toISODate(d) === '2026-06-03'; // today in demo context
                  return (
                    <th
                      key={toISODate(d)}
                      className={`p-2 text-center border-r border-gray-600 ${isToday ? 'bg-blue-700' : ''}`}
                    >
                      <div className="font-semibold text-[11px]">{day}</div>
                      <div className={`text-sm font-bold ${isToday ? 'text-blue-200' : 'text-white'}`}>{date}</div>
                    </th>
                  );
                })}
                <th className="p-2 text-center text-gray-300 text-[11px]">時間</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {staff.map((s, si) => {
                const rowJobs = jobs.filter(j => j.staffCode === s.code);
                const weekHours = division === 'travel'
                  ? (rowJobs as TravelJob[])
                      .filter(j => weekDates.some(d => toISODate(d) === j.date))
                      .reduce((sum, j) => sum + j.payHr, 0)
                  : (rowJobs as CleaningJob[])
                      .filter(j => weekDates.some(d => toISODate(d) === j.date))
                      .reduce((sum, j) => sum + j.hours, 0);

                return (
                  <tr key={s.code} className={si % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    {/* Staff cell */}
                    <td className="p-2 border-r border-b border-gray-100 align-top">
                      <div
                        className="flex items-center gap-1.5"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-gray-300 shrink-0"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.code}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-[11px] truncate">{s.firstName}</div>
                          {'role' in s && (
                            <div className="text-[10px] text-gray-400">
                              {(s as { role: string }).role === 'guide' ? 'ガイド' : 'ドライバー'}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Day cells */}
                    {weekDates.map(d => {
                      const dateStr = toISODate(d);
                      const dayJobs = rowJobs.filter(j => j.date === dateStr);
                      const cellId = `${s.code}__${dateStr}`;

                      return (
                        <DroppableCell
                          key={cellId}
                          id={cellId}
                          onClick={() => setAddCell({ staffCode: s.code, date: dateStr })}
                        >
                          {division === 'travel'
                            ? (dayJobs as TravelJob[]).map(job => (
                                <TravelJobCard
                                  key={job.id}
                                  job={job}
                                  onClick={() => setSelectedJob(job)}
                                />
                              ))
                            : (dayJobs as CleaningJob[]).map(job => (
                                <CleaningJobCard
                                  key={job.id}
                                  job={job}
                                  onClick={() => setSelectedJob(job)}
                                />
                              ))
                          }
                          {dayJobs.length === 0 && (
                            <div className="text-gray-200 text-[10px] text-center pt-3 select-none group-hover:text-gray-400">＋</div>
                          )}
                        </DroppableCell>
                      );
                    })}

                    {/* Weekly total */}
                    <td className="p-2 text-center border-b border-gray-100 align-middle">
                      <span className={`text-xs font-bold ${weekHours > 0 ? 'text-gray-700' : 'text-gray-300'}`}>
                        {weekHours > 0 ? `${weekHours}h` : '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Drag overlay */}
          <DragOverlay>
            {activeJob && division === 'travel' && (
              <div className="shadow-2xl rounded opacity-90 w-44">
                <TravelJobCard job={activeJob as TravelJob} onClick={() => {}} isOverlay />
              </div>
            )}
            {activeJob && division === 'cleaning' && (
              <div className="shadow-2xl rounded opacity-90 w-40">
                <CleaningJobCard job={activeJob as CleaningJob} onClick={() => {}} isOverlay />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Legend */}
      <div className="bg-white border-t px-4 py-2 flex gap-4 flex-wrap">
        {division === 'travel' ? (
          <>
            <span className="text-[10px] font-semibold text-gray-400 mr-2">エージェント：</span>
            {['JTB','LOOK','HIS','DOA','AABH'].map(code => {
              const a = { JTB: 'bg-emerald-100 border-emerald-400 text-emerald-800', LOOK: 'bg-blue-100 border-blue-400 text-blue-800', HIS: 'bg-orange-100 border-orange-400 text-orange-800', DOA: 'bg-yellow-100 border-yellow-400 text-yellow-800', AABH: 'bg-purple-100 border-purple-400 text-purple-800' }[code];
              return <span key={code} className={`text-[10px] px-2 py-0.5 rounded border ${a}`}>{code}</span>;
            })}
          </>
        ) : (
          <>
            <span className="text-[10px] font-semibold text-gray-400 mr-2">種別：</span>
            <span className="text-[10px] px-2 py-0.5 rounded border bg-teal-100 border-teal-300 text-teal-800">毎週</span>
            <span className="text-[10px] px-2 py-0.5 rounded border bg-sky-100 border-sky-300 text-sky-800">隔週</span>
            <span className="text-[10px] px-2 py-0.5 rounded border bg-amber-100 border-amber-300 text-amber-800">スポット</span>
            <span className="text-[10px] px-2 py-0.5 rounded border border-dashed bg-gray-50 text-gray-500">点線 ＝ 未確定</span>
          </>
        )}
        <span className="ml-auto text-[10px] text-gray-400">カードをドラッグ＆ドロップしてスタッフや日付を変更できます</span>
      </div>

      {/* Detail modal */}
      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />

      {/* Add job modal */}
      {addCell && (
        <AddJobModal
          division={division}
          defaultDate={addCell.date}
          defaultStaff={addCell.staffCode}
          onSave={job => {
            if (division === 'travel') setTravelJobs(prev => [...prev, job as TravelJob]);
            else setCleaningJobs(prev => [...prev, job as CleaningJob]);
            setAddCell(null);
          }}
          onClose={() => setAddCell(null)}
        />
      )}
    </div>
  );
}
