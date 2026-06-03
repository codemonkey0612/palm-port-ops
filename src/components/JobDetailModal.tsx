'use client';

import { formatTime, getAgentStyle } from '@/lib/utils';
import type { TravelJob, CleaningJob } from '@/types';

interface Props {
  job: TravelJob | CleaningJob | null;
  onClose: () => void;
}

function isTravelJob(job: TravelJob | CleaningJob): job is TravelJob {
  return 'agtCode' in job;
}

export default function JobDetailModal({ job, onClose }: Props) {
  if (!job) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-gray-800 text-lg">
            {isTravelJob(job) ? `BK #${job.bkNo}` : job.clientName}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">×</button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 text-sm">
          {isTravelJob(job) ? (
            <TravelDetail job={job} />
          ) : (
            <CleaningDetail job={job} />
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t">
          <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
            編集
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-32 text-gray-500 shrink-0">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function TravelDetail({ job }: { job: TravelJob }) {
  const agent = getAgentStyle(job.agtCode);
  return (
    <>
      <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${agent.bgColor} ${agent.textColor} ${agent.borderColor}`}>
        {job.agtCode}
      </div>
      <Row label="ツアー名"     value={job.tourName} />
      <Row label="ツアーNo"     value={job.tourNo || '—'} />
      <Row label="サービス"     value={job.serviceDesc} />
      <Row label="日付"         value={job.date} />
      <Row label="時間"         value={`${formatTime(job.startTime)} → ${formatTime(job.finishTime)}`} />
      <Row label="区間"         value={`${job.startPlace} → ${job.finishPlace}`} />
      <Row label="PAX / 乳幼児 / TC" value={`${job.pax} / ${job.inf} / ${job.tc}`} />
      <Row label="ガイド"       value={job.staffCode} />
      <Row label="車両"         value={job.coachCode || '—'} />
      <Row label="代理店時間"   value={`${job.agtHr}h`} />
      <Row label="支払時間"     value={`${job.payHr}h`} />
      <Row label="単価"         value={`$${job.unitPrice.toFixed(2)}`} />
      <Row label="代理店料金"   value={<span className="text-green-700 font-bold">${job.agtFees.toFixed(2)}</span>} />
      {job.note && <Row label="備考" value={job.note} />}
    </>
  );
}

function CleaningDetail({ job }: { job: CleaningJob }) {
  return (
    <>
      <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
        job.type === 'Weekly' ? 'bg-teal-100 text-teal-800' :
        job.type === 'Fortnightly' ? 'bg-sky-100 text-sky-800' :
        'bg-amber-100 text-amber-800'
      }`}>
        {{ Weekly: '毎週', Fortnightly: '隔週', 'One-off': 'スポット' }[job.type]}
      </div>
      <Row label="顧客名"       value={job.clientName} />
      <Row label="日付"         value={job.date} />
      <Row label="時間"         value={`${formatTime(job.startTime)} → ${formatTime(job.finishTime)}`} />
      <Row label="作業時間"     value={`${job.hours}h`} />
      <Row label="住所"         value={`${job.street}, ${job.suburb}`} />
      <Row label="鍵"           value={job.keyRequired ? '🔑 必要' : '不要'} />
      <Row label="確定状況"     value={job.confirmed ? '✅ 確定' : '⏳ 未確定'} />
      {job.notes && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <div className="font-semibold mb-1">備考</div>
          {job.notes}
        </div>
      )}
    </>
  );
}
