'use client'
import { CheckCircle2, FolderOpen, TrendingUp, Users } from 'lucide-react'

const stats = [
    {
        label: 'Активных проектов',
        value: '3',
        sub: '+1 на этой неделе',
        icon: FolderOpen,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        label: 'Задач выполнено',
        value: '47',
        sub: 'за последние 30 дней',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
    },
    {
        label: 'Ведётся клиентов',
        value: '12',
        sub: '3 новых в этом месяце',
        icon: Users,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
    },
    {
        label: 'KPI рейтинг',
        value: '94%',
        sub: '↑ 2% к прошлому месяцу',
        icon: TrendingUp,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
    },
]

const ProfileStats = () => (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
            <div
                key={label}
                className="rounded-xl bg-[var(--tertiary)] border border-[var(--border)] p-4 flex items-center gap-3.5"
            >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={color} />
                </div>
                <div className="min-w-0">
                    <p className="text-xl font-bold text-[var(--foreground)] leading-tight">{value}</p>
                    <p className="text-xs text-[var(--accent-gray)] leading-tight mt-0.5 truncate">{label}</p>
                    <p className="text-[10px] text-[var(--accent-gray)]/60 mt-0.5 truncate">{sub}</p>
                </div>
            </div>
        ))}
    </div>
)

export default ProfileStats
