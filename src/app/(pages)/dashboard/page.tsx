import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='w-1/2 flex flex-col gap-10'>
            <DashboardWidgets />
            <DashboardYearStats />
        </div>
    );
};

export default DashboardPage;