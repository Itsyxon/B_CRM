'use client'
import Content from '@/components/atoms/Content'
import { useSettings } from '@/context/SettingsContext'
import { dashboardDictionary } from '@/lib/dictionaries'
import {
    Chart as ChartJS,
    type ChartOptions,
    Filler,
    Legend,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const current  = [85, 72, 91, 68, 80, 74]
const previous = [70, 65, 78, 75, 60, 68]

const options: ChartOptions<'radar'> = {
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
        r: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.07)' },
            angleLines: { color: 'rgba(0,0,0,0.07)' },
            ticks: { display: false, stepSize: 20 },
            pointLabels: { font: { size: 11 } },
        },
    },
}

const DepartmentRadar = () => {
    const { own } = useSettings()
    const d = dashboardDictionary[own.language].charts.departmentRadar

    const data = {
        labels: d.departments,
        datasets: [
            {
                label: d.currentPeriod,
                data: current,
                backgroundColor: 'rgba(60, 158, 255, 0.12)',
                borderColor: 'rgba(60, 158, 255, 0.9)',
                pointBackgroundColor: 'rgba(60, 158, 255, 1)',
                borderWidth: 2,
                pointRadius: 3,
            },
            {
                label: d.previousPeriod,
                data: previous,
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderColor: 'rgba(251, 191, 36, 0.8)',
                pointBackgroundColor: 'rgba(251, 191, 36, 1)',
                borderWidth: 2,
                pointRadius: 3,
                borderDash: [4, 3],
            },
        ],
    }

    return (
        <Content className='w-full'>
            <div className='mb-4'>
                <h2 className='text-base font-semibold text-[var(--secondary)]'>{d.title}</h2>
                <p className='text-xs text-[var(--accent-gray)] mt-0.5'>{d.subtitle}</p>
            </div>
            <div className='w-full h-[220px] sm:h-[240px]'>
                <Radar data={data} options={options} />
            </div>
        </Content>
    )
}

export default DepartmentRadar
