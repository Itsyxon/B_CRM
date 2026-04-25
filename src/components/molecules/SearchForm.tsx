'use client'
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const SearchForm = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathName = usePathname();

    const handleSearch = () => {
        const q = value.trim();
        if (!q) return;
        router.push(`/search?value=${q.toLowerCase()}`);
        setValue('');
        inputRef.current?.blur();
    };

    if (pathName.startsWith('/search')) return null;

    return (
        <div className="relative flex items-center">
            <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] pointer-events-none"
            />
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Поиск..."
                className="pl-9 pr-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 text-[var(--foreground)] placeholder:text-[var(--accent-gray)] transition-all w-[140px] sm:w-[220px] md:w-[280px] focus:w-[180px] sm:focus:w-[260px] md:focus:w-[320px]"
            />
            {value && (
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold bg-[var(--info)] text-white px-2 py-0.5 rounded cursor-pointer hover:opacity-90 transition"
                >
                    Найти
                </button>
            )}
        </div>
    );
};

export default SearchForm;
