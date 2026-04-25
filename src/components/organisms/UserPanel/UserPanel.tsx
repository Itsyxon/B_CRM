import SearchForm from '@/components/molecules/SearchForm';
import UserHeaderCard from '../UserHeaderCard/UserHeaderCard';

const UserPanel = () => {
    return (
        <div className='sticky top-0 z-30 pl-12 pr-3 md:pl-6 md:pr-6 h-14 bg-[var(--navbar)] border-b border-[var(--border)] flex w-full justify-between items-center gap-2'>
            <SearchForm />
            <UserHeaderCard />
        </div>
    );
};

export default UserPanel;