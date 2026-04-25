'use client'
import { useNews } from "@/app/api/news/useNews";
import Button from "@/components/atoms/Button";
import Content from "@/components/atoms/Content";
import Loader from "@/components/atoms/Loader";
import { MessageSquareMore, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useRef } from "react";

const SkeletonItem = () => (
    <div className="animate-pulse py-3">
        <div className="flex items-center gap-2 mb-2">
            <div className="h-3 bg-[var(--skeleton)] rounded w-16" />
        </div>
        <div className="h-4 bg-[var(--skeleton)] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-full mb-1" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-4/5 mb-3" />
        <div className="flex gap-3">
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
        </div>
    </div>
);

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

const DashboardNews = () => {
    const {
        data: newsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useNews();

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
            <Content className="w-full lg:w-[300px] xl:w-[320px] lg:shrink-0 flex flex-col">
                <div className="h-5 bg-[var(--skeleton)] rounded w-28 mb-4 animate-pulse" />
                <div className="flex flex-col divide-y divide-[var(--border)]">
                    {[1, 2, 3].map(i => <SkeletonItem key={i} />)}
                </div>
            </Content>
        );
    }

    if (isError) {
        return (
            <Content className="w-full lg:w-[300px] xl:w-[320px] lg:shrink-0">
                <p className="text-red-500 text-sm">Ошибка загрузки новостей</p>
            </Content>
        );
    }

    return (
        <Content className="w-full lg:w-[300px] xl:w-[320px] lg:shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-4 shrink-0">
                <div>
                    <h2 className="text-base font-semibold text-[var(--secondary)]">Лента обновлений</h2>
                    <p className="text-xs text-[var(--accent-gray)] mt-0.5">{total} записей</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)] max-h-[420px] lg:max-h-[calc(100vh-14rem)] pr-0.5">
                {allNews.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 group">
                        <p className="text-[10px] text-[var(--accent-gray)] mb-1.5 font-medium tracking-wide uppercase">
                            {formatDate(item.createdAt)}
                        </p>
                        <h3 className="text-sm font-semibold mb-1 text-[var(--info)] leading-snug group-hover:underline cursor-pointer">
                            {item.title}
                        </h3>
                        <p className="text-xs text-[var(--accent-gray)] line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>
                        <div className="flex gap-3 items-center mt-2 text-[var(--accent-gray)] text-xs">
                            <span className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                                <ThumbsUp size={11} /> {item.likes}
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                                <MessageSquareMore size={11} /> {item.comments}
                            </span>
                            <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                                <Repeat2 size={12} /> {item.reposts}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="shrink-0 mt-3 space-y-2">
                {isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2 py-1.5 text-sm text-[var(--accent-gray)]">
                        <Loader className="w-4 h-4" />
                        <span>Загружаем…</span>
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
                        Все записи загружены
                    </p>
                )}
            </div>
        </Content>
    );
};

export default DashboardNews;
