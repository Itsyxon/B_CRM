import React from 'react'
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Legend, Tooltip)

ChartJS.defaults.plugins.tooltip.backgroundColor = '#fff'
ChartJS.defaults.plugins.tooltip.bodyColor = '#000'
ChartJS.defaults.plugins.tooltip.titleColor = '#000'
ChartJS.defaults.plugins.tooltip.cornerRadius = 6
ChartJS.defaults.plugins.tooltip.borderWidth = 1
ChartJS.defaults.plugins.tooltip.borderColor = '#e5e7eb'

const COLORS = [
    'rgba(60, 158, 255, 0.8)',
    'rgba(52, 211, 153, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(167, 139, 250, 0.8)',
    'rgba(251, 113, 133, 0.8)',
    'rgba(251, 146, 60, 0.8)',
    'rgba(129, 140, 248, 0.8)',
    'rgba(94, 234, 212, 0.8)',
]

const DataPieBar = ({ clientsData, datasetLabel }: { clientsData: number[]; datasetLabel: string }) => {
    const data = {
        datasets: [
            {
                label: datasetLabel,
                data: clientsData,
                backgroundColor: COLORS.slice(0, clientsData.length),
                borderColor: 'transparent',
                borderWidth: 0,
                hoverOffset: 6,
            }
        ],
    }

    return (
        <div className='w-full max-w-[220px] mx-auto h-[190px] sm:h-[220px]'>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                                padding: 10,
                                font: { size: 11 },
                            },
                        },
                    },
                }}
            />
        </div>
    )
}

export default DataPieBar
