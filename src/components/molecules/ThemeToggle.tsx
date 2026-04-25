'use client'
import { useSettings } from '@/context/SettingsContext'
import { Theme } from '@/types/SettingsTypes'

const options: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Светлая' },
    { value: 'dark', label: 'Тёмная' },
]

const ThemeToggle = () => {
    const { own, updateOwn } = useSettings()

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
