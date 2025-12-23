import SearchField from '@/components/organisms/SearchField/SearchField';
import React, { Suspense } from 'react';

const SearchPage = () => {
    return (
        <div>
            <Suspense fallback='Поиск...'>
                <SearchField />
            </Suspense>
        </div>
    );
};

export default SearchPage;