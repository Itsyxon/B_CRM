'use client'
import { useNews } from "@/app/api/news/useNews";
import Button from "@/components/atoms/Button";
import Content from "@/components/atoms/Content";
import Loader from "@/components/atoms/Loader";
import { MessageSquareMore, Repeat2, ThumbsUp } from "lucide-react";

const DashboardNews = () => {
    const {
        data: newsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useNews()

    const allNews = newsData?.pages.flatMap(page => page.data) || [];
    const total = newsData?.pages[0]?.meta.total || 0;

    if (isLoading) {
        return <Content className="w-full flex justify-center"><Loader className="w-32 h-32" /></Content>
    }

    if (isError) {
        return <div className="text-red-500">Ошибка загрузки новостей</div>
    }

    return (
        <Content className="w-full flex flex-col justify-between h-[533px]">
            <div className="text-xl text-secondary font-semibold">Лента <span className="text-sm align-top text-secondary">{total}</span></div>
            <div className="flex flex-col gap-4 my-4 overflow-y-auto font-accent">
                {allNews.map((item) => (
                    <div key={item.id}>
                        <h2 className="text-xl mb-2 text-[var(--info)]">{item.title}</h2>
                        <p className="text-sm">{item.description}</p>
                        <div className="flex gap-5 items-center mt-5 text-secondary">
                            <p className="flex items-center gap-2"><ThumbsUp size={12} /> {item.likes}</p>
                            <p className="flex items-center gap-2"><MessageSquareMore size={12} /> {item.comments}</p>
                            <p className="flex items-center gap-2"><Repeat2 size={14} /> {item.reposts}</p>
                        </div>
                    </div>
                ))}
                {isFetchingNextPage && <Loader className="mx-auto w-24 h-24" />}
            </div>
            {hasNextPage ? (
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full py-2 px-4 rounded-lg"
                >
                    {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
                </Button>
            ) : <p className="text-[var(--accent-gray)] text-center">Показаны все новости</p>}
        </Content>
    );
};

export default DashboardNews;