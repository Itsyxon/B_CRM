import StaffTable from '@/components/organisms/StaffTable/StaffTable';

const StaffPage = () => {
    return (
        <div>
            <h1 className='text-xl'>Сотрудники вашей компании</h1>
            <StaffTable />
        </div>
    );
};

export default StaffPage; 