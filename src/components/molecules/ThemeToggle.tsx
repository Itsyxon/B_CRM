'use client'
import { useSettings } from '@/context/SettingsContext'
import { settingsDictionary } from '@/lib/dictionaries'
import { Theme } from '@/types/SettingsTypes'

const ThemeToggle = () => {
    const { own, updateOwn } = useSettings()
    const labels = settingsDictionary[own.language].theme

    const options: { value: Theme; label: string }[] = [
        { value: 'light', label: labels.light },
        { value: 'dark',  label: labels.dark },
    ]

    return (
        <div className="inline-flex rounded-lg overflow-hidden border border-[var(--border)]">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateOwn({ ...own, theme: opt.value })}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer
                        ${own.theme === opt.value
                            ? 'bg-[var(--info)] text-white'
                            : 'bg-[var(--tertiary)] text-[var(--secondary)] hover:bg-[var(--navbar)]'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}

export default ThemeToggle
