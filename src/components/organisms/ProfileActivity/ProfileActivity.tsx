'use client'
import {
    CheckCircle2,
    FolderPlus,
    UserPlus,
    MessageSquare,
    FileText,
    ArrowUpRight,
    Handshake,
} from 'lucide-react'

const events = [
    {
        icon: FolderPlus,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        action: 'Создан проект',
        detail: '«Редизайн главной страницы»',
        time: '2 ч назад',
    },
    {
        icon: CheckCircle2,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        action: 'Закрыта сделка',
        detail: 'с клиентом ООО «Альфа-Строй»',
        time: 'Вчера, 15:42',
    },
    {
        icon: UserPlus,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        action: 'Добавлен сотрудник',
        detail: 'Мария Сидорова — Менеджер',
        time: '2 дня назад',
    },
    {
        icon: ArrowUpRight,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        action: 'Обновлён статус',
        detail: 'Проект «CRM интеграция» → Активный',
        time: '3 дня назад',
    },
    {
        icon: MessageSquare,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        action: 'Проведена встреча',
        detail: 'с клиентом ИП Петров К.А.',
        time: '5 дней назад',
    },
    {
        icon: Handshake,
        color: 'text-rose-400',
        bg: 'bg-rose-400/10',
        action: 'Новый контракт',
        detail: 'ГК «Технологии будущего»',
        time: '6 дней назад',
    },
    {
        icon: FileText,
        color: 'text-slate-400',
        bg: 'bg-slate-400/10',
        action: 'Сформирован отчёт',
        detail: 'Ежеквартальный отчёт Q1 2025',
        time: '8 дней назад',
    },
]

const ProfileActivity = () => (
    <div className="rounded-2xl bg-[var(--tertiary)] border border-[var(--border)] p-6">
        <div className="mb-5">
            <h2 className="text-base font-semibold text-[var(--secondary)]">Недавняя активность</h2>
            <p className="text-xs text-[var(--accent-gray)] mt-0.5">{events.length} событий за последние 30 дней</p>
        </div>

        <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--border)]" />

            <div className="flex flex-col">
                {events.map(({ icon: Icon, color, bg, action, detail, time }, i) => (
                    <div key={i} className="relative flex items-start gap-4 pb-5 last:pb-0">
                        <div className={`relative z-10 w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                            <Icon size={15} className={color} />
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <span className="text-sm font-medium text-[var(--secondary)]">{action}</span>
                                    <p className="text-xs text-[var(--accent-gray)] mt-0.5 leading-snug">{detail}</p>
                                </div>
                                <span className="text-[11px] text-[var(--accent-gray)] shrink-0 mt-0.5 whitespace-nowrap">{time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default ProfileActivity
