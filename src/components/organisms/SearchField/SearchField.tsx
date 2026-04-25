'use client'
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import SearchResults from '../SearchResults/SearchResults';

const SearchField = () => {
    const searchParam = useSearchParams().get('value') ?? '';
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        const q = inputRef.current?.value.trim() ?? '';
        if (!q) return;
        router.push(`/search?value=${q.toLowerCase()}`);
    };

    return (
        <div>
            <div className="relative max-w-2xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] pointer-events-none" />
                <input
                    key={searchParam}
                    ref={inputRef}
                    defaultValue={searchParam}
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Поиск по пользователям и персоналу..."
                    className="w-full pl-12 pr-24 py-3.5 text-sm bg-[var(--tertiary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 text-[var(--foreground)] placeholder:text-[var(--accent-gray)] transition-all shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {searchParam && (
                        <button
                            onClick={() => router.push('/search')}
                            className="p-1 rounded-md hover:bg-[var(--border)] text-[var(--accent-gray)] hover:text-[var(--foreground)] transition cursor-pointer"
                            aria-label="Очистить"
                        >
                            <X size={15} />
                        </button>
                    )}
                    <button
                        onClick={handleSearch}
                        className="px-3 py-1.5 text-xs font-semibold bg-[var(--info)] text-white rounded-lg hover:opacity-90 transition cursor-pointer"
                    >
                        Найти
                    </button>
                </div>
            </div>

            <SearchResults value={searchParam} />
        </div>
    );
};

export default SearchField;
