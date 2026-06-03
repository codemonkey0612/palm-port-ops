import { TRAVEL_STAFF, CLEANING_STAFF, TRAVEL_JOBS, CLEANING_JOBS, VEHICLES } from '@/data/mockData';
import type { Vehicle } from '@/types';

const TODAY_WEEK = { start: '2026-06-01', end: '2026-06-07' };

export default function StaffPage() {
  // ── 旅行スタッフ集計 ──
  const travelWithStats = TRAVEL_STAFF.map(s => {
    const jobs  = TRAVEL_JOBS.filter(j => j.staffCode === s.code && j.date >= TODAY_WEEK.start && j.date <= TODAY_WEEK.end);
    const total = TRAVEL_JOBS.filter(j => j.staffCode === s.code);
    return { ...s, weekJobs: jobs.length, weekHours: jobs.reduce((a, j) => a + j.payHr, 0), totalJobs: total.length };
  });
  const guides  = travelWithStats.filter(s => s.role === 'guide');
  const drivers = travelWithStats.filter(s => s.role === 'driver');

  // ── 清掃スタッフ集計 ──
  const cleanWithStats = CLEANING_STAFF.map(s => {
    const jobs  = CLEANING_JOBS.filter(j => j.staffCode === s.code && j.date >= TODAY_WEEK.start && j.date <= TODAY_WEEK.end);
    const total = CLEANING_JOBS.filter(j => j.staffCode === s.code);
    return { ...s, weekJobs: jobs.length, weekHours: jobs.reduce((a, j) => a + j.hours, 0), totalJobs: total.length };
  });

  return (
    <div className="flex-1 bg-slate-50 overflow-auto">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" style={{ height: 180 }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/hero-cairns.jpg)' }} />
        <div className="relative z-10 px-6 py-8 max-w-6xl mx-auto flex items-end justify-between h-full">
          <div className="text-white">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">スタッフ管理</p>
            <h1 className="text-3xl font-bold">チームメンバー</h1>
            <p className="text-white/50 text-sm mt-1">ガイド {guides.length}名 · ドライバー {drivers.length}名 · クリーナー {cleanWithStats.length}名</p>
          </div>
          <div className="flex gap-3 pb-1">
            <button className="glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
              ＋ スタッフ追加
            </button>
            <button className="glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
              📥 CSV出力
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'ガイド',     val: guides.length,       sub: `今週合計 ${guides.reduce((s,g)=>s+g.weekHours,0)}h`,   color: 'bg-emerald-500', icon: '🗣' },
            { label: 'ドライバー', val: drivers.length,      sub: `今週合計 ${drivers.reduce((s,g)=>s+g.weekHours,0)}h`,  color: 'bg-blue-500',    icon: '🚌' },
            { label: 'クリーナー', val: cleanWithStats.length,sub: `今週合計 ${cleanWithStats.reduce((s,g)=>s+g.weekHours,0)}h`, color: 'bg-sky-500', icon: '🧹' },
            { label: '車両',       val: VEHICLES.length,     sub: 'コーチ・バン・ミニバス',                              color: 'bg-violet-500',  icon: '🚐' },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`${c.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm shrink-0`}>
                {c.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{c.val}<span className="text-sm text-gray-400 font-normal ml-1">名</span></div>
                <div className="text-xs font-semibold text-gray-600">{c.label}</div>
                <div className="text-[11px] text-gray-400">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Guides ── */}
        <StaffSection title="ガイド" icon="🗣" color="emerald" staff={guides} role="guide" />

        {/* ── Drivers ── */}
        <StaffSection title="ドライバー" icon="🚌" color="blue" staff={drivers} role="driver" />

        {/* ── Cleaners ── */}
        <section>
          <SectionHeader title="クリーナー" icon="🧹" count={cleanWithStats.length} color="sky" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cleanWithStats.map(s => (
              <StaffCard
                key={s.code}
                code={s.code}
                firstName={s.firstName}
                lastName={s.lastName}
                phone={s.phone}
                color={s.color}
                role="クリーナー"
                roleColor="sky"
                weekJobs={s.weekJobs}
                weekHours={s.weekHours}
                totalJobs={s.totalJobs}
                hoursLabel="h/今週"
                visa="PERMANENT"
              />
            ))}
          </div>
        </section>

        {/* ── Vehicles ── */}
        <section>
          <SectionHeader title="車両一覧" icon="🚐" count={VEHICLES.length} color="violet" />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['コード', '種類', '名称', '登録番号', '座席数', 'PAX容量', '年式', '備考'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VEHICLES.map(v => (
                  <tr key={v.code} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md text-xs">{v.code}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.type}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{v.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{v.regoNo}</td>
                    <td className="px-4 py-3 text-center text-xs">{v.capacity}</td>
                    <td className="px-4 py-3 text-center text-xs font-medium">{v.paxCapacity}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{v.year}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 max-w-[140px] truncate">{v.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionHeader({ title, icon, count, color }: { title: string; icon: string; count: number; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-500 shadow-emerald-200',
    blue:    'bg-blue-500 shadow-blue-200',
    sky:     'bg-sky-500 shadow-sky-200',
    violet:  'bg-violet-500 shadow-violet-200',
  };
  const badge: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-700',
    blue:    'bg-blue-100 text-blue-700',
    sky:     'bg-sky-100 text-sky-700',
    violet:  'bg-violet-100 text-violet-700',
  };
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 ${colors[color]} text-white rounded-xl flex items-center justify-center text-base shadow-sm`}>
        {icon}
      </div>
      <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge[color]}`}>{count}名</span>
    </div>
  );
}

function StaffSection({ title, icon, color, staff, role }: {
  title: string; icon: string; color: string; role: string;
  staff: Array<{ code: string; firstName: string; lastName: string; phone: string; color: string; role: string; weekJobs: number; weekHours: number; totalJobs: number }>;
}) {
  return (
    <section>
      <SectionHeader title={title} icon={icon} count={staff.length} color={color} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {staff.map(s => (
          <StaffCard
            key={s.code}
            code={s.code}
            firstName={s.firstName}
            lastName={s.lastName}
            phone={s.phone}
            color={s.color}
            role={role === 'guide' ? 'ガイド' : 'ドライバー'}
            roleColor={color}
            weekJobs={s.weekJobs}
            weekHours={s.weekHours}
            totalJobs={s.totalJobs}
            hoursLabel="h/今週"
            visa="PERMANENT"
          />
        ))}
      </div>
    </section>
  );
}

function StaffCard({ code, firstName, lastName, phone, color, role, roleColor, weekJobs, weekHours, totalJobs, hoursLabel, visa }: {
  code: string; firstName: string; lastName: string; phone: string; color: string;
  role: string; roleColor: string; weekJobs: number; weekHours: number; totalJobs: number; hoursLabel: string; visa?: string;
}) {
  const roleBadge: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-700',
    blue:    'bg-blue-100 text-blue-700',
    sky:     'bg-sky-100 text-sky-700',
    violet:  'bg-violet-100 text-violet-700',
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 p-5 flex flex-col gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold border-2 border-white shadow-md shrink-0 text-gray-700"
          style={{ backgroundColor: color }}
        >
          {code}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-gray-900 text-sm truncate">{firstName} {lastName}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${roleBadge[roleColor] ?? 'bg-gray-100 text-gray-600'}`}>
              {role}
            </span>
            {visa && <span className="text-[10px] text-gray-400">{visa}</span>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 rounded-xl py-2">
          <div className="text-base font-bold text-gray-800">{weekJobs}</div>
          <div className="text-[10px] text-gray-400">今週</div>
        </div>
        <div className="bg-gray-50 rounded-xl py-2">
          <div className="text-base font-bold text-gray-800">{weekHours}<span className="text-[10px] font-normal">h</span></div>
          <div className="text-[10px] text-gray-400">時間</div>
        </div>
        <div className="bg-gray-50 rounded-xl py-2">
          <div className="text-base font-bold text-gray-800">{totalJobs}</div>
          <div className="text-[10px] text-gray-400">累計</div>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <a href={`tel:${phone}`} className="text-xs text-gray-500 hover:text-gray-800 font-mono transition-colors truncate">
          📞 {phone}
        </a>
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium shrink-0 ml-2">
          詳細
        </button>
      </div>
    </div>
  );
}
