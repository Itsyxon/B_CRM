'use client'
import Content from '@/components/atoms/Content'

type Goal = {
    label: string
    current: number
    target: number
    color: string
    inverse?: boolean
    format: (n: number) => string
}

const goals: Goal[] = [
    {
        label: 'Выручка',
        current: 2_840_000,
        target: 3_200_000,
        color: 'bg-blue-500',
        format: (n) => `${(n / 1_000_000).toFixed(1)}M ₽`,
    },
    {
        label: 'Новые клиенты',
        current: 124,
        target: 150,
        color: 'bg-emerald-500',
        format: (n) => `${n}`,
    },
    {
        label: 'Закрытые сделки',
        current: 89,
        target: 100,
        color: 'bg-violet-500',
        format: (n) => `${n}`,
    },
    {
        label: 'NPS',
        current: 72,
        target: 80,
        color: 'bg-amber-500',
        format: (n) => `${n} pt`,
    },
    {
        label: 'Отток клиентов',
        current: 3.2,
        target: 2.0,
        inverse: true,
        color: 'bg-rose-500',
        format: (n) => `${n}%`,
    },
]

const MonthlyGoalsChart = () => (
    <Content className="w-full">
        <div className="mb-5">
            <h2 className="text-base font-semibold text-[var(--secondary)]">Цели месяца</h2>
            <p className="text-xs text-[var(--accent-gray)] mt-0.5">Прогресс по ключевым показателям</p>
        </div>

        <div className="flex flex-col gap-3.5">
            {goals.map(({ label, current, target, color, format, inverse }) => {
                const pct = inverse
                    ? Math.min(100, (target / current) * 100)
                    : Math.min(100, (current / target) * 100)
                const done = inverse ? current <= target : current >= target

                return (
                    <div key={label} className="flex items-center gap-4">
                        {/* Label — фиксированная ширина, не переносится */}
                        <span className="w-36 shrink-0 text-sm font-medium text-[var(--secondary)] truncate">
                            {label}
                        </span>

                        {/* Прогресс-бар + подпись */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--accent-gray)]">
                                    {format(current)} / {format(target)}
                                </span>
                                <span className={`text-xs font-semibold ${done ? 'text-emerald-500' : 'text-[var(--foreground)]'}`}>
                                    {done ? 'Готово' : `${Math.round(pct)}%`}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-[var(--border)] rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${done ? 'bg-emerald-500' : color} rounded-full transition-all duration-500`}
                                    style={{ width: `${pct.toFixed(1)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </Content>
)

export default MonthlyGoalsChart
