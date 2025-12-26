import React from 'react';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Legend,
    Tooltip,
);
ChartJS.defaults.plugins.tooltip.backgroundColor = '#fff'
ChartJS.defaults.plugins.tooltip.bodyColor = '#000'
ChartJS.defaults.plugins.tooltip.titleColor = '#000'
ChartJS.defaults.plugins.tooltip.cornerRadius = 4
ChartJS.defaults.plugins.tooltip.boxWidth = 20
ChartJS.defaults.plugins.tooltip.boxHeight = 20
ChartJS.defaults.plugins.tooltip.borderWidth = 2
ChartJS.defaults.plugins.tooltip.borderColor = '#F6F6F6'

const DataPieBar = ({ clientsData }: { clientsData: number[] }) => {
    const data = {
        datasets: [
            {
                label: 'Новые клиенты',
                data: clientsData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    return (
        <div className='w-[255px] h-[285px]'>
            <Pie data={data} />
        </div>
    );
};

export default DataPieBar;