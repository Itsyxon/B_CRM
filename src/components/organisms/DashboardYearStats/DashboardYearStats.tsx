'use client'
import DataYear from '../DataYear/DataYear';
import DataDiagram from '../DataDiagram/DataDiagram';

const DashboardYearStats = () => {
    return (
        <div className='flex gap-8'>
            <DataYear />
            <DataDiagram />
        </div>
    );
};

export default DashboardYearStats;