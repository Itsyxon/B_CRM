import DashboardNews from '@/components/organisms/DashboardNews/DashboardNews';
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-6'>
            <div className='flex flex-col gap-6 flex-1 min-w-0'>
                <DashboardWidgets />
                <DashboardYearStats />
            </div>
            <DashboardNews />
        </div>
    );
};

export default DashboardPage;