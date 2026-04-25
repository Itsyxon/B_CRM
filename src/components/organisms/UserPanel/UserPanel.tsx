import SearchForm from '@/components/molecules/SearchForm';
import UserHeaderCard from '../UserHeaderCard/UserHeaderCard';

const UserPanel = () => {
    return (
        <div className='pl-12 pr-4 md:pl-8 md:pr-8 py-2 bg-[var(--navbar)] border-b border-[var(--border)] flex w-full md:ml-[250px] md:w-[calc(100vw-250px)] justify-between'>
            <SearchForm />
            <UserHeaderCard />
        </div>
    );
};

export default UserPanel;