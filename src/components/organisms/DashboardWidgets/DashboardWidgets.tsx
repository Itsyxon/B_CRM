'use client'
import Content from '@/components/atoms/Content';
import Loader from '@/components/atoms/Loader';
import { useWidgets } from '@/app/api/widgets/useWidgets';
import { hidePrice } from '@/lib/utils';

const DashboardWidgets = () => {
    const { data: widgetsData, isLoading, isError } = useWidgets()

    if (isLoading) {
        return <Content className="w-full flex justify-center"><Loader className='m-auto w-32 h-32' /></Content>
    }

    if (isError) {
        return <Content>
            <p className='text-red-500 text-lg'>
                Ошибка загрузки данных
            </p>
        </Content>
    }
    return (
        <div className='flex gap-8 [&>*]:min-w-[350px]'>
            {widgetsData?.map((widget) => (
                <Content key={widget.id}>
                    <div className='flex flex-col'>
                        <div className='text-xl font-semibold text-[var(--secondary)]'>{widget.title}</div>
                        <div className='text-sm text-[var(--secondary)]/80 mb-3'>{widget.description}</div>
                        <div className='flex justify-between items-end'>
                            <div className='text-2xl font-semibold'>{hidePrice(widget.amount)}</div>
                            <div className={`${widget.bonus[0] == '+' ? 'text-green-600' : 'text-red-800'} font-semibold`}>{widget.bonus}</div>
                        </div>
                    </div>
                </Content>
            ))}
        </div>
    );
};

export default DashboardWidgets;