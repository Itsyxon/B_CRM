'use client'
import { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useRouter } from 'next/navigation';

const SearchForm = () => {

    const [value, setValue] = useState<string>('') // ? можно было использовать React-hook-form, но не стал усложнять компонент, достаточно состояния.
    const router = useRouter()

    const handleSearch = () => {
        router.push(`/search/?value=${value.toLowerCase()}`)
        setValue('')
    }

    return (
        <div className='flex items-center gap-2'>
            <Input value={value} onChange={(e) => setValue(e.target.value)} className='relative w-[350px]' placeholder='Поиск...' />
            {value && <Button onClick={handleSearch} className='transition'>Поиск</Button>}
        </div>
    );
};

export default SearchForm;