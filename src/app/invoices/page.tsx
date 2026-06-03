import { TRAVEL_JOBS, AGENTS } from '@/data/mockData';
import { formatTime } from '@/lib/utils';

export default function InvoicesPage() {
  // Group travel jobs by agent
  const byAgent = AGENTS.filter(a => a.code !== 'NULL').map(agent => {
    const jobs = TRAVEL_JOBS.filter(j => j.agtCode === agent.code);
    const total = jobs.reduce((s, j) => s + j.agtFees, 0);
    const gst   = total * 0.1;
    return { ...agent, jobs, total, gst, totalIncGST: total + gst };
  }).filter(a => a.jobs.length > 0);

  const grandTotal = byAgent.reduce((s, a) => s + a.totalIncGST, 0);

  const agentColors: Record<string, string> = {
    JTB:  'border-emerald-300 bg-emerald-50',
    LOOK: 'border-blue-300 bg-blue-50',
    HIS:  'border-orange-300 bg-orange-50',
    DOA:  'border-yellow-300 bg-yellow-50',
    AABH: 'border-purple-300 bg-purple-50',
  };
  const badgeColors: Record<string, string> = {
    JTB:  'bg-emerald-100 text-emerald-800',
    LOOK: 'bg-blue-100 text-blue-800',
    HIS:  'bg-orange-100 text-orange-800',
    DOA:  'bg-yellow-100 text-yellow-800',
    AABH: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">請求書管理</h1>
            <p className="text-sm text-gray-500">エージェント別請求 — 2026年6月</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              📥 CSV出力
            </button>
            <button className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm">
              🔗 XERO 連携
            </button>
          </div>
        </div>

        {/* Grand total */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-gray-400">今月 請求合計（GST込）</div>
              <div className="text-4xl font-bold mt-1">${grandTotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</div>
              <div className="text-sm text-gray-400 mt-1">うちGST: ${byAgent.reduce((s, a) => s + a.gst, 0).toLocaleString('en-AU', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{TRAVEL_JOBS.length}</div>
                <div className="text-xs text-gray-400">総ジョブ数</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{byAgent.length}</div>
                <div className="text-xs text-gray-400">請求先</div>
              </div>
            </div>
          </div>
        </div>

        {/* Per-agent invoices */}
        <div className="space-y-4">
          {byAgent.map(agent => (
            <div key={agent.code} className={`bg-white rounded-xl shadow-sm border-l-4 ${agentColors[agent.code] ?? 'border-gray-200 bg-white'} overflow-hidden`}>
              {/* Agent header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${badgeColors[agent.code] ?? 'bg-gray-100 text-gray-700'}`}>
                    {agent.code}
                  </span>
                  <span className="font-semibold text-gray-800">{agent.name}</span>
                  <span className="text-xs text-gray-400">{agent.jobs.length}件</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">請求額（GST込）</div>
                    <div className="font-bold text-gray-900">${agent.totalIncGST.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <button className="text-xs text-violet-600 hover:text-violet-800 font-medium border border-violet-200 rounded-lg px-3 py-1.5 hover:bg-violet-50 transition-colors">
                    請求書を発行
                  </button>
                </div>
              </div>

              {/* Jobs */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50/50">
                    {['日付','ツアー名','サービス','PAX','時間','金額（税抜）'].map(h => (
                      <th key={h} className="px-4 py-2 text-left text-[10px] font-semibold text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agent.jobs.map(job => (
                    <tr key={job.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-2 font-mono text-gray-500">{job.date.slice(5).replace('-','/')}</td>
                      <td className="px-4 py-2 max-w-[150px]">
                        <div className="font-medium text-gray-800 truncate">{job.tourName}</div>
                        {job.tourNo && <div className="text-[10px] text-gray-400">{job.tourNo}</div>}
                      </td>
                      <td className="px-4 py-2 max-w-[180px]">
                        <div className="text-gray-600 truncate">{job.serviceDesc}</div>
                        <div className="text-[10px] text-gray-400">{formatTime(job.startTime)}→{formatTime(job.finishTime)} · {job.startPlace}→{job.finishPlace}</div>
                      </td>
                      <td className="px-4 py-2 text-center">{job.pax}</td>
                      <td className="px-4 py-2 text-center text-gray-500">{job.agtHr}h</td>
                      <td className="px-4 py-2 font-semibold text-gray-800 text-right pr-6">${job.agtFees.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200">
                    <td colSpan={5} className="px-4 py-2.5 text-right text-xs font-semibold text-gray-600">小計（税抜）</td>
                    <td className="px-4 py-2.5 font-bold text-gray-800 text-right pr-6">${agent.total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="px-4 py-1 text-right text-xs text-gray-400">GST (10%)</td>
                    <td className="px-4 py-1 text-xs text-gray-400 text-right pr-6">${agent.gst.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="px-4 py-2.5 text-right text-xs font-bold text-gray-800">合計（GST込）</td>
                    <td className="px-4 py-2.5 font-bold text-lg text-right pr-6" style={{ color: '#059669' }}>${agent.totalIncGST.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
