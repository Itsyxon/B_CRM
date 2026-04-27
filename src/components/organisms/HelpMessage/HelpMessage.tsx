'use client'
import { CheckCircle2, HeadphonesIcon } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { helpDictionary } from '@/lib/dictionaries'

const HelpMessage = ({ isSubmitted }: { isSubmitted: boolean }) => {
    const { own } = useSettings()
    const d = helpDictionary[own.language].message

    if (isSubmitted) {
        return (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{d.successTitle}</p>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80 mt-0.5">{d.successSubtitle}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--info)]/20 bg-[var(--info)]/5">
            <HeadphonesIcon size={20} className="text-[var(--info)] shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-semibold text-[var(--secondary)]">{d.infoTitle}</p>
                <p className="text-xs text-[var(--accent-gray)] mt-0.5">{d.infoSubtitle}</p>
            </div>
        </div>
    )
}

export default HelpMessage
