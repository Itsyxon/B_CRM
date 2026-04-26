'use client'
import Content from '@/components/atoms/Content'
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

const labels = ['Нед. 1', 'Нед. 2', 'Нед. 3', 'Нед. 4', 'Нед. 5', 'Нед. 6', 'Нед. 7', 'Нед. 8']

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
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: {
            min: 70,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { size: 11 }, callback: (v) => `${v}%` },
        },
    },
    interaction: { intersect: false, mode: 'index' },
}

const CustomerRetentionChart = () => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Удержание',
                data: [92, 89, 91, 88, 93, 90, 94, 96],
                borderColor: 'rgba(52, 211, 153, 0.9)',
                backgroundColor: 'rgba(52, 211, 153, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(52, 211, 153, 1)',
                borderWidth: 2,
            },
            {
                label: 'Отрасль',
                data: [85, 85, 85, 85, 85, 85, 85, 85],
                borderColor: 'rgba(251, 113, 133, 0.7)',
                backgroundColor: 'transparent',
                fill: false,
                tension: 0,
                pointRadius: 0,
                borderDash: [5, 4],
                borderWidth: 2,
            },
        ],
    }

    return (
        <Content className="w-full">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-base font-semibold text-[var(--secondary)]">Удержание клиентов</h2>
                    <p className="text-xs text-[var(--accent-gray)] mt-0.5">Retention rate vs отрасль, %</p>
                </div>
            </div>
            <div className="w-full h-[200px] sm:h-[220px]">
                <Line data={chartData} options={options} />
            </div>
        </Content>
    )
}

export default CustomerRetentionChart
