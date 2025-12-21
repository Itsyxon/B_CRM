import { months } from '@/lib/utils';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.plugins.tooltip.backgroundColor = '#fff'
ChartJS.defaults.plugins.tooltip.bodyColor = '#000'
ChartJS.defaults.plugins.tooltip.titleColor = '#000'
ChartJS.defaults.plugins.tooltip.cornerRadius = 4
ChartJS.defaults.plugins.tooltip.boxWidth = 20
ChartJS.defaults.plugins.tooltip.boxHeight = 20
ChartJS.defaults.plugins.tooltip.borderWidth = 2
ChartJS.defaults.plugins.tooltip.borderColor = '#F6F6F6'

const DataYearBar = ({ yearData }: { yearData: number[] }) => {
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Данные за год',
                data: yearData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Данные по месяцам года',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='w-[685px] h-[300px]'>
            <Bar data={data} options={{
                ...options,
                responsive: true,
                maintainAspectRatio: false
            }} />
        </div>
    );
};

export default DataYearBar;