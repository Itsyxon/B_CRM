'use client'
import { LayoutGrid, List } from 'lucide-react'

export type ViewMode = 'extended' | 'compact'

interface Props {
    mode: ViewMode
    onChange: (mode: ViewMode) => void
}

const DashboardViewToggle = ({ mode, onChange }: Props) => (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--tertiary)] border border-[var(--border)]">
        <button
            onClick={() => onChange('extended')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                mode === 'extended'
                    ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                    : 'text-[var(--accent-gray)] hover:text-[var(--foreground)]'
            }`}
        >
            <LayoutGrid size={13} />
            Расширенный
        </button>
        <button
            onClick={() => onChange('compact')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                mode === 'compact'
                    ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                    : 'text-[var(--accent-gray)] hover:text-[var(--foreground)]'
            }`}
        >
            <List size={13} />
            Компактный
        </button>
    </div>
)

export default DashboardViewToggle
