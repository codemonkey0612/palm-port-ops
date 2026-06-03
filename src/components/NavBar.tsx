'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DolphinLogo() {
  return (
    <svg viewBox="0 0 48 32" fill="none" className="w-9 h-6" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path
        d="M6 20 C8 14 14 9 22 10 C27 11 30 14 34 13 C38 12 41 9 45 10 L44 13 C41 12 38 14 34 15 C29 17 25 15 21 15 C15 15 10 18 8 22 Z"
        fill="#34d399"
      />
      {/* Dorsal fin */}
      <path
        d="M22 10 C23 7 25 5 27 6 C26 8 25 10 24 10 Z"
        fill="#34d399"
      />
      {/* Tail */}
      <path
        d="M44 13 C46 10 48 9 48 11 L46 13 C47 14 48 16 46 16 C44 15 43 14 44 13 Z"
        fill="#34d399"
      />
      {/* Eye */}
      <circle cx="12" cy="17" r="1.2" fill="#0f766e" />
      {/* Smile line */}
      <path d="M8 20 Q10 21 12 20" stroke="#0f766e" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: '/',          label: 'ホーム' },
  { href: '/roster',    label: 'ロスター' },
  { href: '/bookings',  label: '予約管理' },
  { href: '/staff',     label: 'スタッフ' },
  { href: '/agents',    label: 'エージェント' },
  { href: '/invoices',  label: '請求書' },
  { href: '/wages',     label: '給与' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-950/95 backdrop-blur-md text-white shadow-xl shrink-0 border-b border-white/5">
      <div className="flex items-center gap-5 px-4 h-13" style={{ height: '52px' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-3 shrink-0 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:shadow-emerald-500/40 transition-shadow">
              <DolphinLogo />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-950 animate-pulse-glow" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight tracking-wide text-white group-hover:text-emerald-300 transition-colors">
              Palm Port
            </div>
            <div className="text-[9px] text-gray-500 leading-tight tracking-widest uppercase">
              Cairns Operations
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 shrink-0" />

        {/* Nav links */}
        <nav className="flex gap-0.5 text-xs font-medium overflow-x-auto">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold ring-1 ring-emerald-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2.5 shrink-0">
          <div className="text-[10px] text-emerald-400/70 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full font-semibold tracking-wide">
            DEMO
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow ring-2 ring-emerald-500/30">
              Y
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-medium text-white leading-tight">やすふく</div>
              <div className="text-[10px] text-gray-500">管理者</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
