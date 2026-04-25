'use client'

// ── Sparkline ─────────────────────────────────────────────────────────────────
const Sparkline = ({ data, strokeClass }: { data: number[]; strokeClass: string }) => {
    const W = 72, H = 30
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const pts = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * W
            const y = H - ((v - min) / range) * (H - 4) - 2
            return `${x.toFixed(1)},${y.toFixed(1)}`
        })
        .join(' ')

    return (
        <svg width={W} height={H} className="overflow-visible shrink-0">
            <polyline
                points={pts}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={strokeClass}
            />
        </svg>
    )
}

// ── Ring ──────────────────────────────────────────────────────────────────────
const Ring = ({ pct, strokeClass }: { pct: number; strokeClass: string }) => {
    const r = 18, cx = 22, cy = 22
    const circ = 2 * Math.PI * r
    const offset = circ * (1 - pct / 100)
    return (
        <svg width={44} height={44} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={4} style={{ stroke: 'var(--border)' }} />
            <circle
                cx={cx} cy={cy} r={r} fill="none" strokeWidth={4}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={strokeClass}
            />
        </svg>
    )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

const DashboardMetrics = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1 – Conversion (progress bar) */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-4 flex flex-col gap-2">
                <p className="text-xs text-[var(--accent-gray)]">Конверсия сделок</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">68.4%</p>
                <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68.4%' }} />
                </div>
                <p className="text-xs text-emerald-500 font-medium">↑ +4.1% к прошлому мес.</p>
            </div>

            {/* Card 2 – New clients (sparkline) */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-4 flex flex-col gap-2">
                <p className="text-xs text-[var(--accent-gray)]">Новые клиенты</p>
                <div className="flex items-end justify-between gap-2">
                    <div>
                        <p className="text-2xl font-bold text-[var(--foreground)]">124</p>
                        <p className="text-xs text-[var(--accent-gray)] mt-0.5">за месяц</p>
                    </div>
                    <Sparkline
                        data={[40, 55, 35, 70, 60, 80, 65, 90]}
                        strokeClass="stroke-blue-500"
                    />
                </div>
                <p className="text-xs text-blue-500 font-medium">↑ +12 к прошлому мес.</p>
            </div>

            {/* Card 3 – Avg deal time (ring) */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-4 flex flex-col gap-2">
                <p className="text-xs text-[var(--accent-gray)]">Ср. время сделки</p>
                <div className="flex items-center gap-3">
                    <Ring pct={42} strokeClass="stroke-amber-500" />
                    <div>
                        <p className="text-2xl font-bold text-[var(--foreground)] leading-none">4.2</p>
                        <p className="text-xs text-[var(--accent-gray)] mt-1">дня</p>
                    </div>
                </div>
                <p className="text-xs text-amber-500 font-medium">↓ −0.8 дн от нормы</p>
            </div>

            {/* Card 4 – Tasks done (fraction + bar) */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-4 flex flex-col gap-2">
                <p className="text-xs text-[var(--accent-gray)]">Задачи выполнены</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                    89{' '}
                    <span className="text-base font-medium text-[var(--accent-gray)]">/ 100</span>
                </p>
                <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '89%' }} />
                </div>
                <p className="text-xs text-[var(--accent-gray)]">Текущий спринт</p>
            </div>

        </div>
    )
}

export default DashboardMetrics
