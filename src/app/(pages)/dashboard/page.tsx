import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='flex flex-col gap-10 max-w-[calc(85%-250px)]'>
            <DashboardWidgets />
            <DashboardYearStats />
        </div>
    );
};

export default DashboardPage;