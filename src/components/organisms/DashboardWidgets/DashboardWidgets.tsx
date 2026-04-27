'use client'
import Content from '@/components/atoms/Content'
import Loader from '@/components/atoms/Loader'
import { useWidgets } from '@/app/api/widgets/useWidgets'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'
import { hidePrice } from '@/lib/utils'
import { ArrowDown, ArrowUp, DollarSign, Package, TrendingUp } from 'lucide-react'

const widgetMeta = [
    {
        icon: <Package size={18} />,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
        icon: <TrendingUp size={18} />,
        iconColor: 'text-emerald-500',
        iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
        icon: <DollarSign size={18} />,
        iconColor: 'text-violet-500',
        iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    },
]

const DashboardWidgets = () => {
    const { data: widgetsData, isLoading, isError } = useWidgets()
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].widgets

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[1, 2, 3].map((i) => (
                    <Content key={i} className="w-full flex justify-center items-center h-[120px]">
                        <Loader />
                    </Content>
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <Content>
                <p className='text-red-500 text-sm'>{d.error}</p>
            </Content>
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {widgetsData?.map((widget, i) => {
                const meta = widgetMeta[i % widgetMeta.length]
                const isPositive = widget.bonus[0] === '+'
                return (
                    <Content key={widget.id} className='w-full'>
                        <div className='flex items-start justify-between mb-4'>
                            <div className={`p-2 rounded-lg ${meta.iconBg}`}>
                                <span className={meta.iconColor}>{meta.icon}</span>
                            </div>
                            <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${isPositive
                                ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10'
                                : 'text-red-600 bg-red-50 dark:bg-red-500/10'
                                }`}>
                                {isPositive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                                {widget.bonus}
                            </span>
                        </div>
                        <div className='text-2xl font-bold text-[var(--secondary)] mb-0.5'>
                            {hidePrice(widget.amount)}
                        </div>
                        <div className='text-sm text-[var(--accent-gray)]'>{widget.title}</div>
                    </Content>
                )
            })}
        </div>
    )
}

export default DashboardWidgets
