import { CheckCircle2, HeadphonesIcon } from 'lucide-react';

const HelpMessage = ({ isSubmitted }: { isSubmitted: boolean }) => {
    if (isSubmitted) {
        return (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Обращение отправлено!</p>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80 mt-0.5">
                        Мы получили ваш запрос и ответим в ближайшее время.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--info)]/20 bg-[var(--info)]/5">
            <HeadphonesIcon size={20} className="text-[var(--info)] shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-semibold text-[var(--secondary)]">Нужна помощь?</p>
                <p className="text-xs text-[var(--accent-gray)] mt-0.5">
                    Опишите проблему в форме — служба поддержки ответит в течение 24 часов.
                </p>
            </div>
        </div>
    )
}

export default HelpMessage
