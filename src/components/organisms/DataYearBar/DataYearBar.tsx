import { months } from '@/lib/utils';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

ChartJS.defaults.plugins.tooltip.backgroundColor = '#fff'
ChartJS.defaults.plugins.tooltip.bodyColor = '#000'
ChartJS.defaults.plugins.tooltip.titleColor = '#000'
ChartJS.defaults.plugins.tooltip.cornerRadius = 6
ChartJS.defaults.plugins.tooltip.boxWidth = 10
ChartJS.defaults.plugins.tooltip.boxHeight = 10
ChartJS.defaults.plugins.tooltip.borderWidth = 1
ChartJS.defaults.plugins.tooltip.borderColor = '#e5e7eb'

const DataYearBar = ({ yearData }: { yearData: number[] }) => {
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Продажи',
                data: yearData,
                backgroundColor: 'rgba(60, 158, 255, 0.15)',
                borderColor: 'rgba(60, 158, 255, 0.9)',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            }
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 } },
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { font: { size: 11 } },
            },
        },
    };

    return (
        <div className='w-full h-[200px] sm:h-[230px]'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default DataYearBar;
