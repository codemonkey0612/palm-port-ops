import { TRAVEL_JOBS, CLEANING_JOBS, TRAVEL_STAFF, CLEANING_STAFF, AGENTS } from '@/data/mockData';
import { formatTime } from '@/lib/utils';

function getAgentStyle(code: string) {
  const map: Record<string, string> = {
    JTB:  'bg-emerald-100 text-emerald-700',
    LOOK: 'bg-blue-100 text-blue-700',
    HIS:  'bg-orange-100 text-orange-700',
    DOA:  'bg-yellow-100 text-yellow-700',
    AABH: 'bg-purple-100 text-purple-700',
  };
  return map[code] ?? 'bg-gray-100 text-gray-600';
}

export default function BookingsPage() {
  const allTravel   = [...TRAVEL_JOBS].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  const allCleaning = [...CLEANING_JOBS].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

  const travelRevenue   = allTravel.reduce((s, j) => s + j.agtFees, 0);
  const cleaningHours   = allCleaning.reduce((s, j) => s + j.hours, 0);
  const confirmedCount  = allCleaning.filter(j => j.confirmed).length;

  const getStaffName = (code: string) =>
    TRAVEL_STAFF.find(s => s.code === code)?.firstName ??
    CLEANING_STAFF.find(s => s.code === code)?.firstName ?? code;
  const getStaffColor = (code: string) =>
    TRAVEL_STAFF.find(s => s.code === code)?.color ??
    CLEANING_STAFF.find(s => s.code === code)?.color ?? '#e5e7eb';

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">予約管理</h1>
            <p className="text-sm text-gray-500">全ジョブ一覧 — 2026年6月</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
              ＋ 旅行予約
            </button>
            <button className="flex items-center gap-1.5 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors">
              ＋ 清掃予約
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{allTravel.length}<span className="text-sm font-normal text-gray-500 ml-1">件</span></div>
            <div className="text-xs text-gray-500 mt-1">旅行ジョブ合計</div>
            <div className="text-sm font-semibold text-emerald-700 mt-1">売上 ${travelRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{allCleaning.length}<span className="text-sm font-normal text-gray-500 ml-1">件</span></div>
            <div className="text-xs text-gray-500 mt-1">清掃ジョブ合計</div>
            <div className="text-sm font-semibold text-sky-700 mt-1">合計 {cleaningHours}h</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{confirmedCount}<span className="text-sm font-normal text-gray-500 ml-1">件確定</span></div>
            <div className="text-xs text-gray-500 mt-1">清掃ジョブ確定率</div>
            <div className="text-sm font-semibold text-gray-700 mt-1">{Math.round(confirmedCount / allCleaning.length * 100)}%</div>
          </div>
        </div>

        {/* Travel jobs table */}
        <section>
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
            <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded flex items-center justify-center text-sm">✈</span>
            旅行・送迎ジョブ
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['BK No','日付','エージェント','ツアー名','サービス','ガイド','PAX','時間','車両','料金'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allTravel.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-3 py-2.5 font-mono text-xs text-gray-500">#{job.bkNo}</td>
                    <td className="px-3 py-2.5 text-xs whitespace-nowrap">
                      <span className="font-medium">{job.date.slice(5).replace('-','/')}</span>
                      <span className="text-gray-400 ml-1">{formatTime(job.startTime)}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getAgentStyle(job.agtCode)}`}>{job.agtCode}</span>
                    </td>
                    <td className="px-3 py-2.5 max-w-[140px]">
                      <div className="text-xs font-medium text-gray-800 truncate">{job.tourName}</div>
                      {job.tourNo && <div className="text-[10px] text-gray-400">{job.tourNo}</div>}
                    </td>
                    <td className="px-3 py-2.5 max-w-[160px]">
                      <div className="text-xs text-gray-600 truncate">{job.serviceDesc}</div>
                      <div className="text-[10px] text-gray-400">{job.startPlace}→{job.finishPlace}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border"
                          style={{ backgroundColor: getStaffColor(job.staffCode) }}>
                          {job.staffCode}
                        </div>
                        <span className="text-xs text-gray-600">{getStaffName(job.staffCode)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-center font-medium">{job.pax}</td>
                    <td className="px-3 py-2.5 text-xs text-center text-gray-600">{job.payHr}h</td>
                    <td className="px-3 py-2.5 text-xs text-gray-600">{job.coachCode}</td>
                    <td className="px-3 py-2.5 text-xs font-bold text-emerald-700 whitespace-nowrap">${job.agtFees.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-emerald-50 border-t-2 border-emerald-100">
                  <td colSpan={9} className="px-3 py-2.5 text-xs font-bold text-gray-700">合計</td>
                  <td className="px-3 py-2.5 text-sm font-bold text-emerald-700">${travelRevenue.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Cleaning jobs table */}
        <section>
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
            <span className="w-6 h-6 bg-sky-100 text-sky-700 rounded flex items-center justify-center text-sm">🧹</span>
            清掃ジョブ
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['日付','スタッフ','顧客名','地区','時間','種別','確定','鍵','備考'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allCleaning.map(job => {
                  const typeLabel = { Weekly: '毎週', Fortnightly: '隔週', 'One-off': 'スポット' }[job.type];
                  const typeColor = { Weekly: 'bg-teal-100 text-teal-700', Fortnightly: 'bg-sky-100 text-sky-700', 'One-off': 'bg-amber-100 text-amber-700' }[job.type];
                  return (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-3 py-2.5 text-xs whitespace-nowrap">
                        <span className="font-medium">{job.date.slice(5).replace('-','/')}</span>
                        <span className="text-gray-400 ml-1">{formatTime(job.startTime)}-{formatTime(job.finishTime)}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border"
                            style={{ backgroundColor: getStaffColor(job.staffCode) }}>
                            {job.staffCode}
                          </div>
                          <span className="text-xs text-gray-600">{getStaffName(job.staffCode)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs font-medium text-gray-800">{job.clientName}</td>
                      <td className="px-3 py-2.5 text-xs text-gray-600">{job.suburb}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-center">{job.hours}h</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${typeColor}`}>{typeLabel}</span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {job.confirmed
                          ? <span className="text-emerald-500 text-sm">✓</span>
                          : <span className="text-gray-300 text-sm">—</span>}
                      </td>
                      <td className="px-3 py-2.5 text-center text-xs">{job.keyRequired ? '🔑' : ''}</td>
                      <td className="px-3 py-2.5 max-w-[160px]">
                        <span className="text-[11px] text-gray-500 truncate block">{job.notes}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-sky-50 border-t-2 border-sky-100">
                  <td colSpan={4} className="px-3 py-2.5 text-xs font-bold text-gray-700">合計</td>
                  <td className="px-3 py-2.5 text-sm font-bold text-sky-700">{cleaningHours}h</td>
                  <td colSpan={4} />
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
