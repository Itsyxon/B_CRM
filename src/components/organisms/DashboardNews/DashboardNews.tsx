'use client'
import { useNews } from "@/app/api/news/useNews";
import Button from "@/components/atoms/Button";
import Content from "@/components/atoms/Content";
import Loader from "@/components/atoms/Loader";
import { MessageSquareMore, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useRef } from "react";

const SkeletonItem = () => (
    <div className="animate-pulse py-3">
        <div className="h-4 bg-[var(--skeleton)] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-full mb-1" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-5/6 mb-3" />
        <div className="flex gap-4">
            <div className="h-3 bg-[var(--skeleton)] rounded w-8" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-8" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-8" />
        </div>
    </div>
);

const DashboardNews = () => {
    const {
        data: newsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useNews();

    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const pagesCount = newsData?.pages.length ?? 0;

    useEffect(() => {
        if (pagesCount > 1 && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [pagesCount]);

    const allNews = newsData?.pages.flatMap(page => page.data) ?? [];
    const total = newsData?.pages[0]?.meta.total ?? 0;

    if (isLoading) {
        return (
            <Content className="w-full lg:w-[300px] lg:shrink-0 flex flex-col min-h-[300px] lg:h-[533px]">
                <div className="h-6 bg-[var(--skeleton)] rounded w-24 mb-4 animate-pulse" />
                <div className="flex flex-col divide-y divide-[var(--border)]">
                    {[1, 2, 3].map(i => <SkeletonItem key={i} />)}
                </div>
            </Content>
        );
    }

    if (isError) {
        return (
            <Content className="w-full lg:w-[300px] lg:shrink-0">
                <p className="text-red-500 text-sm">Ошибка загрузки новостей</p>
            </Content>
        );
    }

    return (
        <Content className="w-full lg:w-[300px] lg:shrink-0 flex flex-col lg:h-[533px]">
            <div className="text-xl text-secondary font-semibold mb-3 shrink-0">
                Лента{' '}
                <span className="text-xs align-top text-secondary/60 font-normal">{total}</span>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto divide-y divide-[var(--border)] max-h-[300px] lg:max-h-none pr-0.5"
            >
                {allNews.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0">
                        <h2 className="text-sm font-semibold mb-1 text-[var(--info)] leading-snug">
                            {item.title}
                        </h2>
                        <p className="text-xs text-secondary/70 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>
                        <div className="flex gap-4 items-center mt-2 text-secondary/50 text-xs">
                            <span className="flex items-center gap-1">
                                <ThumbsUp size={11} /> {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageSquareMore size={11} /> {item.comments}
                            </span>
                            <span className="flex items-center gap-1">
                                <Repeat2 size={12} /> {item.reposts}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="shrink-0 mt-3 space-y-2">
                {isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2 py-1.5 text-sm text-secondary/60">
                        <Loader className="w-4 h-4" />
                        <span>Загружаем новости…</span>
                    </div>
                )}

                {hasNextPage ? (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="w-full py-2 px-4 rounded-lg text-sm"
                    >
                        Загрузить ещё
                    </Button>
                ) : (
                    <p className="text-[var(--accent-gray)] text-center text-xs py-1">
                        Показаны все новости
                    </p>
                )}
            </div>
        </Content>
    );
};

export default DashboardNews;
