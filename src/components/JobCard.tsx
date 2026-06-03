'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { formatTime, getAgentStyle } from '@/lib/utils';
import type { TravelJob, CleaningJob } from '@/types';

interface TravelCardProps {
  job: TravelJob;
  onClick: () => void;
  isOverlay?: boolean;
}

interface CleaningCardProps {
  job: CleaningJob;
  onClick: () => void;
  isOverlay?: boolean;
}

export function TravelJobCard({ job, onClick, isOverlay }: TravelCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: job.id });
  const style = { transform: CSS.Translate.toString(transform) };
  const agent = getAgentStyle(job.agtCode);

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={isOverlay ? {} : style}
      {...(isOverlay ? {} : { ...listeners, ...attributes })}
      onClick={e => { e.stopPropagation(); onClick(); }}
      className={`
        ${agent.bgColor} ${agent.textColor} border ${agent.borderColor}
        rounded p-1.5 mb-1 cursor-grab active:cursor-grabbing select-none text-xs
        ${isDragging ? 'opacity-40 shadow-lg ring-2 ring-blue-400' : 'hover:brightness-95 hover:shadow-sm'}
        transition-all
      `}
    >
      <div className="flex items-center justify-between gap-1 mb-0.5">
        <span className={`font-bold text-[10px] px-1 rounded ${agent.bgColor} ${agent.borderColor} border`}>
          {job.agtCode}
        </span>
        <span className="text-[10px] opacity-60">#{job.bkNo.slice(-5)}</span>
      </div>
      <div className="font-semibold truncate leading-tight">{job.tourName}</div>
      <div className="text-[10px] opacity-80 truncate">{job.serviceDesc}</div>
      <div className="flex items-center justify-between mt-1 text-[10px] font-medium">
        <span>{formatTime(job.startTime)}→{formatTime(job.finishTime)}</span>
        <span className="flex gap-1 items-center">
          {job.pax > 0 && <span className="bg-white/60 rounded px-1">{job.pax}px</span>}
          {job.coachCode && <span className="bg-white/60 rounded px-1">{job.coachCode}</span>}
        </span>
      </div>
    </div>
  );
}

export function CleaningJobCard({ job, onClick, isOverlay }: CleaningCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: job.id });
  const style = { transform: CSS.Translate.toString(transform) };

  const typeLabel = { 'Weekly': '毎週', 'Fortnightly': '隔週', 'One-off': 'スポット' }[job.type];
  const typeStyle = {
    'Weekly':      'bg-teal-100 text-teal-800 border-teal-300',
    'Fortnightly': 'bg-sky-100 text-sky-800 border-sky-300',
    'One-off':     'bg-amber-100 text-amber-800 border-amber-300',
  }[job.type];

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={isOverlay ? {} : style}
      {...(isOverlay ? {} : { ...listeners, ...attributes })}
      onClick={e => { e.stopPropagation(); onClick(); }}
      className={`
        ${typeStyle} border rounded p-1.5 mb-1 cursor-grab active:cursor-grabbing select-none text-xs
        ${job.confirmed ? '' : 'opacity-75 border-dashed'}
        ${isDragging ? 'opacity-40 shadow-lg ring-2 ring-blue-400' : 'hover:brightness-95 hover:shadow-sm'}
        transition-all
      `}
    >
      <div className="flex items-center justify-between gap-1 mb-0.5">
        <span className="text-[10px] font-bold">{typeLabel}</span>
        <span className="text-[10px] font-medium">{formatTime(job.startTime)}-{formatTime(job.finishTime)}</span>
      </div>
      <div className="font-semibold truncate leading-tight">{job.clientName}</div>
      <div className="text-[10px] opacity-80 truncate">{job.suburb}</div>
      <div className="flex items-center justify-between mt-1 text-[10px]">
        <span className="font-medium">{job.hours}h</span>
        <span className="flex gap-1">
          {job.keyRequired && <span title="鍵が必要">🔑</span>}
          {!job.confirmed && <span className="bg-white/60 rounded px-1 text-[9px]">未確定</span>}
        </span>
      </div>
    </div>
  );
}
