import DataYear from '../DataYear/DataYear';
import DataDiagram from '../DataDiagram/DataDiagram';

interface Props {
    compact?: boolean
}

const DashboardYearStats = ({ compact }: Props) => (
    <div className={`grid grid-cols-1 gap-4 ${compact ? '' : 'xl:grid-cols-[1fr_260px]'}`}>
        <DataYear />
        {!compact && <DataDiagram />}
    </div>
)

export default DashboardYearStats;
