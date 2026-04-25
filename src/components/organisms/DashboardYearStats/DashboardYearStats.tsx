import DataYear from '../DataYear/DataYear';
import DataDiagram from '../DataDiagram/DataDiagram';

const DashboardYearStats = () => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4'>
            <DataYear />
            <DataDiagram />
        </div>
    );
};

export default DashboardYearStats;
