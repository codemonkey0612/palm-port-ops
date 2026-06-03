import { TRAVEL_JOBS, CLEANING_JOBS, TRAVEL_STAFF, CLEANING_STAFF } from '@/data/mockData';

const WEEK_START = '2026-06-01';
const WEEK_END   = '2026-06-07';
const HOURLY_RATE_CLEANING = 32.31;

export default function WagesPage() {
  // ── Travel wages ──
  const travelWages = TRAVEL_STAFF.map(staff => {
    const jobs = TRAVEL_JOBS.filter(j => j.staffCode === staff.code && j.date >= WEEK_START && j.date <= WEEK_END);
    const totalHours = jobs.reduce((s, j) => s + j.payHr, 0);
    const jobs_detail = jobs.map(j => ({ date: j.date, desc: `${j.agtCode} ${j.tourName}`, hours: j.payHr }));
    return { ...staff, jobs: jobs_detail, totalHours, grossPay: 0 };
  }).filter(s => s.totalHours > 0);

  // ── Cleaning wages ──
  const cleaningWages = CLEANING_STAFF.map(staff => {
    const jobs = CLEANING_JOBS.filter(j => j.staffCode === staff.code && j.date >= WEEK_START && j.date <= WEEK_END);
    const totalHours = jobs.reduce((s, j) => s + j.hours, 0);
    const reimbursement = 0; // mock
    const grossPay = totalHours * HOURLY_RATE_CLEANING;
    const totalPay = grossPay + reimbursement;
    return { ...staff, jobs: [], totalHours, reimbursement, grossPay, totalPay };
  }).filter(s => s.totalHours > 0);

  const totalCleaningHours = cleaningWages.reduce((s, w) => s + w.totalHours, 0);
  const totalCleaningPay   = cleaningWages.reduce((s, w) => s + w.totalPay, 0);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">給与計算</h1>
            <p className="text-sm text-gray-500">集計期間：2026年6月1日（月）〜 6月7日（日）</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              ← 前の期間
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              次の期間 →
            </button>
            <button className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm">
              💴 XERO 出力
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard label="旅行スタッフ" value={`${travelWages.length}名`} sub={`総時間 ${travelWages.reduce((s, w) => s + w.totalHours, 0)}h`} color="emerald" />
          <SummaryCard label="清掃スタッフ" value={`${cleaningWages.length}名`} sub={`総時間 ${totalCleaningHours}h`} color="sky" />
          <SummaryCard label="清掃 総支払額" value={`$${totalCleaningPay.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} sub={`時給 $${HOURLY_RATE_CLEANING}`} color="violet" />
          <SummaryCard label="次回支払日" value="6月14日" sub="隔週払い" color="amber" />
        </div>

        {/* Cleaning wage table */}
        <section>
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
            <span className="w-6 h-6 bg-sky-100 text-sky-700 rounded flex items-center justify-center text-sm">🧹</span>
            清掃スタッフ 給与明細
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['スタッフ','コード','総時間数','時給','基本給','立替精算','合計支払'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">支払スリップ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cleaningWages.map(staff => (
                  <tr key={staff.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border"
                          style={{ backgroundColor: staff.color }}>
                          {staff.code}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{staff.firstName} {staff.lastName}</div>
                          <div className="text-[11px] text-gray-400">{staff.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{staff.code}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-800">{staff.totalHours}</span>
                      <span className="text-gray-400 text-xs ml-1">h</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">${HOURLY_RATE_CLEANING}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">${staff.grossPay.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {staff.reimbursement > 0 ? `$${staff.reimbursement.toFixed(2)}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-sky-700">${staff.totalPay.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-violet-600 hover:text-violet-800 font-medium border border-violet-200 rounded px-2 py-1 hover:bg-violet-50 transition-colors">
                        PDF出力
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-sky-50 border-t-2 border-sky-100">
                  <td colSpan={2} className="px-4 py-3 text-xs font-bold text-gray-700">合計</td>
                  <td className="px-4 py-3 font-bold text-gray-800">{totalCleaningHours}h</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3 font-bold text-gray-800">
                    ${cleaningWages.reduce((s, w) => s + w.grossPay, 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">—</td>
                  <td className="px-4 py-3 font-bold text-sky-700 text-base">${totalCleaningPay.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-white bg-sky-600 hover:bg-sky-700 font-medium rounded px-3 py-1.5 transition-colors">
                      一括出力
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Travel wages */}
        <section>
          <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
            <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded flex items-center justify-center text-sm">✈</span>
            旅行スタッフ 時間集計
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['スタッフ','役割','今週時間数','ジョブ数','スリップ'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {travelWages.map(staff => (
                  <tr key={staff.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border"
                          style={{ backgroundColor: staff.color }}>
                          {staff.code}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{staff.firstName} {staff.lastName}</div>
                          <div className="text-[11px] text-gray-400">{staff.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {staff.role === 'guide' ? 'ガイド' : 'ドライバー'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-800">{staff.totalHours}</span>
                      <span className="text-gray-400 text-xs ml-1">h</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{staff.jobs.length}件</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-violet-600 hover:text-violet-800 font-medium border border-violet-200 rounded px-2 py-1 hover:bg-violet-50 transition-colors">
                        PDF出力
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">※ 旅行スタッフの時給・給与設定はスタッフ管理ページで行います</p>
        </section>

      </div>
    </div>
  );
}

function SummaryCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'from-emerald-500 to-teal-600',
    sky:     'from-sky-500 to-blue-600',
    violet:  'from-violet-500 to-purple-600',
    amber:   'from-amber-500 to-orange-500',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full translate-x-3 -translate-y-3`} />
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      <div className="text-[11px] text-gray-400 mt-1">{sub}</div>
    </div>
  );
}
