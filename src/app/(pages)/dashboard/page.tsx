'use client'
import { useEffect, useState } from 'react'
import LocalStorage from '@/lib/LocalStorage'
import DashboardMetrics from '@/components/organisms/DashboardMetrics/DashboardMetrics'
import DashboardNews from '@/components/organisms/DashboardNews/DashboardNews'
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets'
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats'
import DashboardViewToggle, { ViewMode } from '@/components/molecules/DashboardViewToggle'
import WeeklyRevenueChart from '@/components/organisms/WeeklyRevenueChart/WeeklyRevenueChart'
import PipelineChart from '@/components/organisms/PipelineChart/PipelineChart'
import DepartmentRadar from '@/components/organisms/DepartmentRadar/DepartmentRadar'
import TopManagersChart from '@/components/organisms/TopManagersChart/TopManagersChart'
import CustomerRetentionChart from '@/components/organisms/CustomerRetentionChart/CustomerRetentionChart'
import RevenueBySourceChart from '@/components/organisms/RevenueBySourceChart/RevenueBySourceChart'
import MonthlyGoalsChart from '@/components/organisms/MonthlyGoalsChart/MonthlyGoalsChart'

const LS_KEY = 'dashboard_view_mode'

const DashboardPage = () => {
    const [mode, setMode] = useState<ViewMode>('extended')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = LocalStorage.get<ViewMode>(LS_KEY)
        if (saved === 'compact' || saved === 'extended') setMode(saved)
        setMounted(true)
    }, [])

    const handleModeChange = (newMode: ViewMode) => {
        setMode(newMode)
        LocalStorage.set(LS_KEY, newMode)
    }

    const compact = mode === 'compact'

    return (
        <div className="flex flex-col gap-4 lg:gap-6">

            {/* Toggle выбора вида */}
            <div className="flex items-center justify-end -mt-2">
                {mounted && (
                    <DashboardViewToggle mode={mode} onChange={handleModeChange} />
                )}
            </div>

            <div className="flex flex-col gap-4">

                <DashboardWidgets />

                <DashboardMetrics compact={compact} />

                <DashboardYearStats compact={compact} />

                {/* Графики — компактный режим: 2 ключевых */}
                {compact ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <WeeklyRevenueChart />
                        <PipelineChart />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
                            <WeeklyRevenueChart />
                            <DepartmentRadar />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <TopManagersChart />
                            <PipelineChart />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <CustomerRetentionChart />
                            <RevenueBySourceChart />
                        </div>

                        <MonthlyGoalsChart />
                    </>
                )}

                {/* Лента обновлений — полная ширина, без sidebar */}
                <DashboardNews />

            </div>
        </div>
    )
}

export default DashboardPage
