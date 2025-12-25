import DashboardNews from '@/components/organisms/DashboardNews/DashboardNews';
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='flex flex-col gap-10 flex-wrap w-1/2'>
            <DashboardWidgets />
            <DashboardYearStats />
            <DashboardNews />
        </div>
    );
};

export default DashboardPage;