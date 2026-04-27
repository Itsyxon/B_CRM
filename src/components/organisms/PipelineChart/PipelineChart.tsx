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

const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: { boxWidth: 10, padding: 10, font: { size: 11 } },
        },
    },
    scales: {
        x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { size: 11 } },
        },
        y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { size: 11 } },
        },
    },
}

const PipelineChart = () => {
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].charts.pipeline

    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: d.leads,
                data: [120, 145, 130, 160],
                backgroundColor: 'rgba(60, 158, 255, 0.75)',
                borderWidth: 0,
                borderRadius: 0,
            },
            {
                label: d.qualification,
                data: [80, 95, 88, 110],
                backgroundColor: 'rgba(52, 211, 153, 0.75)',
                borderWidth: 0,
                borderRadius: 0,
            },
            {
                label: d.proposal,
                data: [50, 60, 55, 72],
                backgroundColor: 'rgba(251, 191, 36, 0.75)',
                borderWidth: 0,
                borderRadius: 0,
            },
            {
                label: d.closing,
                data: [30, 38, 34, 45],
                backgroundColor: 'rgba(167, 139, 250, 0.75)',
                borderWidth: 0,
                borderRadius: 4,
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

export default PipelineChart
