import { AGENTS, TRAVEL_JOBS } from '@/data/mockData';

const AGENT_DETAILS: Record<string, { name: string; address: string; email: string; phone: string; abn: string }> = {
  JTB:  { name: 'JTB',                          address: '',                                      email: '',                        phone: '',              abn: '' },
  LOOK: { name: 'LOOK',                          address: '',                                      email: '',                        phone: '',              abn: '' },
  HIS:  { name: 'HIS',                           address: '',                                      email: '',                        phone: '',              abn: '' },
  DOA:  { name: 'DOA',                           address: '',                                      email: '',                        phone: '',              abn: '' },
  AABH: { name: 'Australia and Beyond Holidays', address: '',                                      email: 'akiko@aabh.com.au',       phone: '0289993860',    abn: '41 584 212 385' },
  ASW:  { name: 'ASWAY AUSTRALIA PTY LTD',       address: 'PO BOX 3406 AUSTRALIA FAIR QLD 4215',  email: 'accounts@asway.com.au',   phone: '',              abn: '69 070 114 895' },
  ATM:  { name: 'AUSTRALIAN TOURS MANAGEMENT',   address: 'Level 1, 28 Victoria St Carlton VIC',  email: 'yukiko@atmtravel.com',    phone: '0396621599',    abn: '' },
  ATS:  { name: 'Australian Tour Specialists',   address: 'Shop3 Ground Floor 129 Abbott St CNS', email: 'res_cns@ats.co.jp',       phone: '0740312600',    abn: '34 080 087 421' },
  HISS: { name: 'HIS Shuttle',                   address: '',                                      email: '',                        phone: '',              abn: '' },
};

export default function AgentsPage() {
  const agentStats = AGENTS.filter(a => a.code !== 'NULL').map(a => {
    const jobs    = TRAVEL_JOBS.filter(j => j.agtCode === a.code);
    const revenue = jobs.reduce((s, j) => s + j.agtFees, 0);
    const pax     = jobs.reduce((s, j) => s + j.pax, 0);
    const detail  = AGENT_DETAILS[a.code];
    return { ...a, jobs: jobs.length, revenue, pax, detail };
  }).sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = agentStats.reduce((s, a) => s + a.revenue, 0);

  const colorMap: Record<string, { ring: string; bg: string; text: string }> = {
    JTB:  { ring: 'ring-emerald-300', bg: 'bg-emerald-50',  text: 'text-emerald-800' },
    LOOK: { ring: 'ring-blue-300',    bg: 'bg-blue-50',     text: 'text-blue-800' },
    HIS:  { ring: 'ring-orange-300',  bg: 'bg-orange-50',   text: 'text-orange-800' },
    DOA:  { ring: 'ring-yellow-300',  bg: 'bg-yellow-50',   text: 'text-yellow-800' },
    AABH: { ring: 'ring-purple-300',  bg: 'bg-purple-50',   text: 'text-purple-800' },
    HISS: { ring: 'ring-rose-300',    bg: 'bg-rose-50',     text: 'text-rose-800' },
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-auto">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900" style={{ height: 180 }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/reef.jpg)' }} />
        <div className="relative z-10 px-6 py-8 max-w-6xl mx-auto flex items-end justify-between h-full">
          <div className="text-white">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">エージェント管理</p>
            <h1 className="text-3xl font-bold">旅行会社一覧</h1>
            <p className="text-white/50 text-sm mt-1">{agentStats.length}社 · 今週売上 ${totalRevenue.toLocaleString()}</p>
          </div>
          <button className="glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
            ＋ エージェント追加
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

        {/* Top stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">{agentStats.length}<span className="text-sm text-gray-400 font-normal ml-1">社</span></div>
            <div className="text-xs text-gray-500 mt-1">登録エージェント数</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl font-bold text-emerald-700">${totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">今週 総売上</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">{agentStats.reduce((s,a)=>s+a.pax,0)}<span className="text-sm text-gray-400 font-normal ml-1">名</span></div>
            <div className="text-xs text-gray-500 mt-1">今週 総PAX</div>
          </div>
        </div>

        {/* Agent cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentStats.map(agent => {
            const c = colorMap[agent.code] ?? { ring: 'ring-gray-200', bg: 'bg-gray-50', text: 'text-gray-700' };
            const pct = totalRevenue > 0 ? Math.round(agent.revenue / totalRevenue * 100) : 0;
            return (
              <div key={agent.code}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden">

                {/* Header */}
                <div className={`${c.bg} px-5 pt-5 pb-4 border-b border-gray-100`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${c.bg} ring-2 ${c.ring} flex items-center justify-center font-bold text-base ${c.text}`}>
                        {agent.code}
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${c.text}`}>{agent.code}</div>
                        <div className="text-xs text-gray-500 mt-0.5 max-w-[160px] truncate">{agent.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">${agent.revenue.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">今週売上</div>
                    </div>
                  </div>

                  {/* Revenue bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>売上シェア</span><span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-50 text-center py-3">
                  <div className="py-1">
                    <div className="text-lg font-bold text-gray-800">{agent.jobs}</div>
                    <div className="text-[10px] text-gray-400">ジョブ数</div>
                  </div>
                  <div className="py-1">
                    <div className="text-lg font-bold text-gray-800">{agent.pax}</div>
                    <div className="text-[10px] text-gray-400">PAX合計</div>
                  </div>
                  <div className="py-1">
                    <div className="text-lg font-bold text-gray-800">
                      {agent.jobs > 0 ? `$${Math.round(agent.revenue / agent.jobs).toLocaleString()}` : '—'}
                    </div>
                    <div className="text-[10px] text-gray-400">平均単価</div>
                  </div>
                </div>

                {/* Contact if available */}
                {agent.detail?.email && (
                  <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-500 flex items-center gap-2">
                    <span>✉</span>
                    <span className="truncate">{agent.detail.email}</span>
                  </div>
                )}
                {agent.detail?.phone && (
                  <div className="px-5 pb-3 text-xs text-gray-500 flex items-center gap-2">
                    <span>📞</span>
                    <span>{agent.detail.phone}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
