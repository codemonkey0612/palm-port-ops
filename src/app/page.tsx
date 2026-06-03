import Link from 'next/link';
import Image from 'next/image';
import { TRAVEL_JOBS, CLEANING_JOBS, TRAVEL_STAFF, CLEANING_STAFF } from '@/data/mockData';
import { formatTime } from '@/lib/utils';

const TODAY = '2026-06-03';

function agtBadge(code: string) {
  const m: Record<string, string> = {
    JTB: 'bg-emerald-100 text-emerald-700', LOOK: 'bg-blue-100 text-blue-700',
    HIS: 'bg-orange-100 text-orange-700',   DOA:  'bg-yellow-100 text-yellow-700',
    AABH:'bg-purple-100 text-purple-700',
  };
  return m[code] ?? 'bg-gray-100 text-gray-600';
}

export default function DashboardPage() {
  const todayTravel   = TRAVEL_JOBS.filter(j => j.date === TODAY).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const todayCleaning = CLEANING_JOBS.filter(j => j.date === TODAY).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const weekTravel    = TRAVEL_JOBS.filter(j => j.date >= '2026-06-01' && j.date <= '2026-06-07');
  const weekCleaning  = CLEANING_JOBS.filter(j => j.date >= '2026-06-01' && j.date <= '2026-06-07');

  const weekRevenue      = weekTravel.reduce((s, j) => s + j.agtFees, 0);
  const todayRevenue     = todayTravel.reduce((s, j) => s + j.agtFees, 0);
  const todayCleanHours  = todayCleaning.reduce((s, j) => s + j.hours, 0);
  const weekCleanHours   = weekCleaning.reduce((s, j) => s + j.hours, 0);
  const confirmedClean   = weekCleaning.filter(j => j.confirmed).length;

  const getStaffColor = (code: string) =>
    TRAVEL_STAFF.find(s => s.code === code)?.color ??
    CLEANING_STAFF.find(s => s.code === code)?.color ?? '#e2e8f0';

  return (
    <div className="flex-1 overflow-auto bg-slate-50">

      {/* ══════════════════════════════════════
          HERO SECTION — Cairns aerial photo
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: '500px' }}>

        {/* Ken Burns background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: 'url(/images/hero-cairns.jpg)', transformOrigin: 'center center' }}
        />

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/70 via-slate-900/50 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10  w-80 h-80 bg-teal-500/10   rounded-full blur-3xl" />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 py-5 max-w-6xl mx-auto">

          {/* Top bar — location badge + action buttons */}
          <div className="flex items-center justify-between animate-fade-in-down">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>🐬 Dolphin Tours &amp; JQ Cleaning</span>
              <span className="text-white/30 mx-1">|</span>
              <span>📍 Cairns, Queensland Australia</span>
            </div>
            <div className="flex gap-2">
              <Link href="/bookings"
                className="glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all flex items-center gap-1.5">
                <span>✈</span> 旅行予約
              </Link>
              <Link href="/bookings"
                className="glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all flex items-center gap-1.5">
                <span>🧹</span> 清掃予約
              </Link>
            </div>
          </div>

          {/* Greeting */}
          <div className="text-white animate-fade-in-up">
            <p className="text-white/60 text-sm mb-1 font-medium">2026年6月3日（水）</p>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              おはようございます、<span className="text-emerald-300">やすふく</span>様 👋
            </h1>
            <p className="text-white/50 text-sm">ケアンズの海はいつも澄んでいます — 今日も良い一日を</p>
          </div>

          {/* Glass KPI cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: '✈', val: todayTravel.length,  unit: '件', label: '今日の旅行ジョブ', sub: `売上 $${todayRevenue.toLocaleString()}`, delay: 'delay-100' },
              { icon: '🧹', val: todayCleaning.length, unit: '件', label: '今日の清掃ジョブ', sub: `合計 ${todayCleanHours}h`, delay: 'delay-200' },
              { icon: '💰', val: `$${Math.round(weekRevenue/1000)}k`, unit: '', label: '今週の売上', sub: `${weekTravel.length}件 / ${TRAVEL_STAFF.length}名稼働`, delay: 'delay-300', accent: true },
              { icon: '⏱', val: weekCleanHours,       unit: 'h', label: '今週の清掃時間', sub: `確定 ${confirmedClean}/${weekCleaning.length}件`, delay: 'delay-400' },
            ].map(card => (
              <div
                key={card.label}
                className={`glass rounded-2xl p-4 text-white animate-fade-in-up ${card.delay} ${card.accent ? 'border-emerald-400/30 bg-emerald-500/15' : ''}`}
              >
                <div className="text-xl mb-2">{card.icon}</div>
                <div className="text-2xl font-bold leading-none">
                  {card.val}<span className="text-base font-normal opacity-70 ml-0.5">{card.unit}</span>
                </div>
                <div className="text-xs font-semibold mt-1.5 opacity-90">{card.label}</div>
                <div className="text-[11px] opacity-50 mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TODAY'S SCHEDULE
      ══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        <div className="grid md:grid-cols-2 gap-5">

          {/* Travel today */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 bg-gradient-to-r from-emerald-50 to-teal-50/50">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm shadow-sm shadow-emerald-200">✈</span>
                今日の旅行・送迎
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{todayTravel.length}件</span>
              </h2>
              <Link href="/roster" className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                ロスター <span>→</span>
              </Link>
            </div>
            <div className="divide-y divide-gray-50/80">
              {todayTravel.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <div className="text-3xl mb-2">✈</div>
                  <p className="text-gray-400 text-sm">本日の旅行ジョブはありません</p>
                </div>
              )}
              {todayTravel.map(job => (
                <div key={job.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors">
                  <div className="text-xs font-mono text-gray-400 w-10 shrink-0 tabular-nums">{formatTime(job.startTime)}</div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 border border-white shadow-sm"
                    style={{ backgroundColor: getStaffColor(job.staffCode) }}>
                    {job.staffCode}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${agtBadge(job.agtCode)}`}>{job.agtCode}</span>
                      <span className="text-xs font-medium text-gray-800 truncate">{job.tourName}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5 truncate">{job.serviceDesc} · PAX {job.pax} · {job.coachCode}</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 shrink-0">${job.agtFees.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Cleaning today */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 bg-gradient-to-r from-sky-50 to-teal-50/50">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-7 h-7 bg-sky-500 text-white rounded-lg flex items-center justify-center text-sm shadow-sm shadow-sky-200">🧹</span>
                今日の清掃
                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold">{todayCleaning.length}件</span>
              </h2>
              <Link href="/roster" className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1">
                ロスター <span>→</span>
              </Link>
            </div>
            <div className="divide-y divide-gray-50/80">
              {todayCleaning.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <div className="text-3xl mb-2">🧹</div>
                  <p className="text-gray-400 text-sm">本日の清掃ジョブはありません</p>
                </div>
              )}
              {todayCleaning.map(job => {
                const tl = { Weekly: '毎週', Fortnightly: '隔週', 'One-off': 'スポット' }[job.type];
                const tc = { Weekly: 'bg-teal-50 text-teal-700', Fortnightly: 'bg-sky-50 text-sky-700', 'One-off': 'bg-amber-50 text-amber-700' }[job.type];
                return (
                  <div key={job.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors">
                    <div className="text-xs font-mono text-gray-400 w-10 shrink-0 tabular-nums">{formatTime(job.startTime)}</div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 border border-white shadow-sm"
                      style={{ backgroundColor: getStaffColor(job.staffCode) }}>
                      {job.staffCode}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tc}`}>{tl}</span>
                        <span className="text-xs font-medium text-gray-800">{job.clientName}</span>
                        {job.keyRequired && <span className="text-[11px]">🔑</span>}
                        {!job.confirmed && <span className="text-[10px] text-amber-500 font-medium">未確定</span>}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{job.suburb} · {job.hours}h</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ══════════════════════════════════════
            QUICK LINKS — image-backed cards
        ══════════════════════════════════════ */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">クイックリンク</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <ImageCard
              href="/roster"
              image="/images/hero-cairns.jpg"
              title="ロスター"
              subtitle="ドラッグ&ドロップで管理"
              badge="今週 24件"
              accent="from-teal-600/70"
            />
            <ImageCard
              href="/bookings"
              image="/images/reef.jpg"
              title="予約一覧"
              subtitle="全ジョブを確認・編集"
              badge="↗ 予約入力"
              accent="from-blue-700/70"
            />
            <ImageCard
              href="/wages"
              image="/images/cleaning.jpg"
              title="給与計算"
              subtitle="時間数・支払い管理"
              badge="次回 6/14払い"
              accent="from-sky-600/70"
            />
            <ImageCard
              href="/invoices"
              image="/images/rainforest.jpg"
              title="請求書"
              subtitle="エージェントへの請求"
              badge="$28,129 今月"
              accent="from-emerald-700/70"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM BRAND STRIP
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-2xl shadow-lg" style={{ height: '200px' }}>
          <div
            className="absolute inset-0 bg-cover bg-center img-card-bg"
            style={{ backgroundImage: 'url(/images/reef.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          <div className="relative z-10 h-full flex items-center px-8">
            <div className="text-white max-w-md">
              <div className="text-xs text-emerald-300 font-semibold tracking-widest uppercase mb-2">🐬 Dolphin Tours × JQ Cleaning</div>
              <h3 className="text-2xl font-bold mb-1">Palm Port Pty Ltd</h3>
              <p className="text-white/50 text-sm">ケアンズ・ポートダグラスを拠点とするバス・ガイド・クリーナー派遣会社</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-emerald-300 font-semibold">🚌 Bus 11台</span>
                <span className="text-sky-300 font-semibold">👤 Staff 28名</span>
                <span className="text-amber-300 font-semibold">🏠 Clients 230+</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Image-backed quick link card ── */
function ImageCard({ href, image, title, subtitle, badge, accent }: {
  href: string; image: string; title: string; subtitle: string; badge: string; accent: string;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      style={{ height: '168px' }}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center img-card-bg"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${accent} to-transparent`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Badge top-right */}
      <div className="absolute top-3 right-3">
        <span className="glass text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      </div>

      {/* Arrow top-right on hover */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-white/20 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Text bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="font-bold text-base leading-tight">{title}</div>
        <div className="text-xs opacity-65 mt-0.5">{subtitle}</div>
      </div>
    </Link>
  );
}
