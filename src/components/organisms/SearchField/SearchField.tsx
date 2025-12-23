'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import SearchResults from '../SearchResults/SearchResults';
import Input from '@/components/atoms/Input';
import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';

const SearchField = () => {
    const params = useSearchParams()
    const router = useRouter()
    const searchParams = params.get('value')
    const [value, setValue] = useState<string>(searchParams || '')

    useEffect(() => {
        if (searchParams) {
            setValue(searchParams);
        }
    }, [searchParams]);

    return (
        <>
            <div className='flex gap-4'>
                <Input className='w-1/2 bg-[var(--tertiary)]' placeholder='Поиск...' value={value} onChange={(e) => setValue(e.target.value)} />
                <Button onClick={() => router.push(`/search?value=${value.toLowerCase()}`)}>Поиск</Button>
            </div>
            <SearchResults value={searchParams || ''} />
        </>
    );
};

export default SearchField;