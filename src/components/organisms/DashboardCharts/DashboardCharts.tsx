import DepartmentRadar from '../DepartmentRadar/DepartmentRadar'
import PipelineChart from '../PipelineChart/PipelineChart'
import TopManagersChart from '../TopManagersChart/TopManagersChart'
import WeeklyRevenueChart from '../WeeklyRevenueChart/WeeklyRevenueChart'

const DashboardCharts = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4'>
                <WeeklyRevenueChart />
                <DepartmentRadar />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <TopManagersChart />
                <PipelineChart />
            </div>
        </div>
    )
}

export default DashboardCharts
