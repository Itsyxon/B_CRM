import DashboardNews from '@/components/organisms/DashboardNews/DashboardNews';
import DashboardWidgets from '@/components/organisms/DashboardWidgets/DashboardWidgets';
import DashboardYearStats from '@/components/organisms/DashboardYearStats/DashboardYearStats';

const DashboardPage = () => {
    return (
        <div className='flex gap-8'>
            <div className='flex flex-col gap-8'>
                <DashboardWidgets />
                <DashboardYearStats />
            </div>
            <DashboardNews />
        </div>
    );
};

export default DashboardPage;