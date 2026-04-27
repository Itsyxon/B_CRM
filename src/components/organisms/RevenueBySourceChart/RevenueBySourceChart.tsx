'use client'
import Content from '@/components/atoms/Content'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'
import { ArcElement, Chart as ChartJS, type ChartOptions, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: { boxWidth: 10, padding: 12, font: { size: 11 } },
        },
    },
}

const RevenueBySourceChart = () => {
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].charts.revenueBySource

    const chartData = {
        labels: d.sources,
        datasets: [
            {
                data: [38, 27, 22, 13],
                backgroundColor: [
                    'rgba(60, 158, 255, 0.85)',
                    'rgba(52, 211, 153, 0.85)',
                    'rgba(251, 191, 36, 0.85)',
                    'rgba(167, 139, 250, 0.85)',
                ],
                borderWidth: 0,
                hoverOffset: 6,
            },
        ],
    }

    return (
        <Content className="w-full">
            <div className="mb-4">
                <h2 className="text-base font-semibold text-[var(--secondary)]">{d.title}</h2>
                <p className="text-xs text-[var(--accent-gray)] mt-0.5">{d.subtitle}</p>
            </div>
            <div className="w-full h-[200px] sm:h-[220px]">
                <Doughnut data={chartData} options={options} />
            </div>
        </Content>
    )
}

export default RevenueBySourceChart
