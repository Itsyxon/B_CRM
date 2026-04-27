'use client'
import Content from '@/components/atoms/Content'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    type ChartOptions,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const managers = ['Иванов А.', 'Петрова С.', 'Сидоров К.', 'Козлова М.', 'Новиков Д.']
const sales    = [42, 38, 35, 29, 24]

const BG_COLORS = [
    'rgba(60, 158, 255, 0.8)',
    'rgba(52, 211, 153, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(167, 139, 250, 0.8)',
    'rgba(251, 113, 133, 0.8)',
]

const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
        x: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { size: 11 } },
        },
        y: {
            grid: { display: false },
            ticks: { font: { size: 11 } },
        },
    },
}

const TopManagersChart = () => {
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].charts.topManagers

    const data = {
        labels: managers,
        datasets: [
            {
                label: d.dealsClosed,
                data: sales,
                backgroundColor: BG_COLORS,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 6,
            },
        ],
    }

    return (
        <Content className='w-full'>
            <div className='mb-4'>
                <h2 className='text-base font-semibold text-[var(--secondary)]'>{d.title}</h2>
                <p className='text-xs text-[var(--accent-gray)] mt-0.5'>{d.subtitle}</p>
            </div>
            <div className='w-full h-[200px] sm:h-[220px]'>
                <Bar data={data} options={options} />
            </div>
        </Content>
    )
}

export default TopManagersChart
