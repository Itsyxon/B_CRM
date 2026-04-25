import DashboardMetrics from '@/components/organisms/DashboardMetrics/DashboardMetrics';
import DashboardNews from '@/components/organisms/DashboardNews/DashboardNews';
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start'>
            <div className='flex flex-col gap-4 flex-1 min-w-0'>
                <DashboardWidgets />
                <DashboardMetrics />
                <DashboardYearStats />
            </div>
            <div className='w-full lg:w-auto lg:shrink-0 lg:sticky lg:top-4'>
                <DashboardNews />
            </div>
        </div>
    );
};

export default DashboardPage;
