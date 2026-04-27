'use client'
import Content from '@/components/atoms/Content'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'
import {
    CategoryScale,
    Chart as ChartJS,
    type ChartOptions,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend)

const revenue = [45, 52, 49, 61, 58, 67, 72, 78]
const target  = [50, 50, 55, 55, 60, 60, 65, 70]

const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { boxWidth: 12, padding: 12, font: { size: 11 } },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { font: { size: 11 } },
        },
        y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
                font: { size: 11 },
                callback: (v) => `${v}k`,
            },
        },
    },
    interaction: { intersect: false, mode: 'index' },
}

const WeeklyRevenueChart = () => {
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].charts.weeklyRevenue

    const data = {
        labels: d.weekLabels,
        datasets: [
            {
                label: d.revenue,
                data: revenue,
                borderColor: 'rgba(60, 158, 255, 0.9)',
                backgroundColor: 'rgba(60, 158, 255, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(60, 158, 255, 1)',
                borderWidth: 2,
            },
            {
                label: d.plan,
                data: target,
                borderColor: 'rgba(251, 146, 60, 0.8)',
                backgroundColor: 'transparent',
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderDash: [5, 4],
                borderWidth: 2,
            },
        ],
    }

    return (
        <Content className='w-full'>
            <div className='flex items-start justify-between mb-4'>
                <div>
                    <h2 className='text-base font-semibold text-[var(--secondary)]'>{d.title}</h2>
                    <p className='text-xs text-[var(--accent-gray)] mt-0.5'>{d.subtitle}</p>
                </div>
            </div>
            <div className='w-full h-[200px] sm:h-[220px]'>
                <Line data={data} options={options} />
            </div>
        </Content>
    )
}

export default WeeklyRevenueChart
