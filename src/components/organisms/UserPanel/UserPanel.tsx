import SearchInput from '@/components/molecules/SearchInput';
import UserHeaderCard from '../UserHeaderCard/UserHeaderCard';

const UserPanel = () => {
    return (
        <div className='ml-[250px] px-8 py-2 bg-[var(--navbar)] border-b border-gray-300 flex w-[calc(100vw-250px)] justify-between'>
            <SearchInput />
            <UserHeaderCard />
        </div>
    );
};

export default UserPanel;