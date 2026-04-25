import DataYear from '../DataYear/DataYear';
import DataDiagram from '../DataDiagram/DataDiagram';

const DashboardYearStats = () => {
    return (
        <div className='flex flex-col xl:flex-row gap-6'>
            <DataYear />
            <DataDiagram />
        </div>
    );
};

export default DashboardYearStats;