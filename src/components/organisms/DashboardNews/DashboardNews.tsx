'use client'
import { useNews } from "@/app/api/news/useNews";
import Button from "@/components/atoms/Button";
import Content from "@/components/atoms/Content";
import Loader from "@/components/atoms/Loader";
import { MessageSquareMore, Repeat2, ThumbsUp } from "lucide-react";

const SkeletonCard = () => (
    <div className="animate-pulse rounded-lg border border-[var(--border)] p-4 space-y-2.5">
        <div className="h-3 bg-[var(--skeleton)] rounded w-16" />
        <div className="h-4 bg-[var(--skeleton)] rounded w-3/4" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-full" />
        <div className="h-3 bg-[var(--skeleton)] rounded w-4/5" />
        <div className="flex gap-3 pt-1">
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
            <div className="h-3 bg-[var(--skeleton)] rounded w-6" />
        </div>
    </div>
)

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })

const DashboardNews = () => {
    const {
        data: newsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useNews()

    const allNews = newsData?.pages.flatMap(p => p.data) ?? []
    const total = newsData?.pages[0]?.meta.total ?? 0

    if (isLoading) {
        return (
            <Content className="w-full">
                <div className="h-5 bg-[var(--skeleton)] rounded w-28 mb-4 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                </div>
            </Content>
        )
    }

    if (isError) {
        return (
            <Content className="w-full">
                <p className="text-red-500 text-sm">Ошибка загрузки новостей</p>
            </Content>
        )
    }

    return (
        <Content className="w-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-semibold text-[var(--secondary)]">Лента обновлений</h2>
                    <p className="text-xs text-[var(--accent-gray)] mt-0.5">{total} записей</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {allNews.map(item => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-2 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--info)]/40 hover:shadow-sm transition-all cursor-pointer group"
                    >
                        <p className="text-[10px] text-[var(--accent-gray)] font-medium tracking-wide uppercase">
                            {formatDate(item.createdAt)}
                        </p>
                        <h3 className="text-sm font-semibold text-[var(--info)] leading-snug line-clamp-2 group-hover:underline">
                            {item.title}
                        </h3>
                        <p className="text-xs text-[var(--accent-gray)] line-clamp-2 leading-relaxed flex-1">
                            {item.description}
                        </p>
                        <div className="flex gap-3 items-center text-[var(--accent-gray)] text-xs pt-1 border-t border-[var(--border)]">
                            <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                                <ThumbsUp size={11} /> {item.likes}
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <MessageSquareMore size={11} /> {item.comments}
                            </span>
                            <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                                <Repeat2 size={12} /> {item.reposts}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 space-y-2">
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
                ) : allNews.length > 0 ? (
                    <p className="text-[var(--accent-gray)] text-center text-xs py-1">
                        Все записи загружены
                    </p>
                ) : null}
            </div>
        </Content>
    )
}

export default DashboardNews
