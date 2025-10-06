import React from 'react';
import { widgetsData } from './WidgetsData';
import Content from '@/components/atoms/Content';

const DashboardWidgets = () => {
    return (
        <div className='w-1/2'>
            <div className='grid grid-cols-3 gap-5 mt-5 [&>*]:min-w-[350px]'>
                {widgetsData.map((widget) => (
                    <Content key={widget.id}>
                        <div className='flex flex-col'>
                            <div className='text-xl font-semibold text-gray-800'>{widget.title}</div>
                            <div className='text-sm text-gray-600 mb-3'>{widget.description}</div>
                            <div className='flex justify-between items-end'>
                                <div className='text-2xl font-semibold'>{widget.amount}</div>
                                <div className={`${widget.bonus[0] == '+' ? 'text-green-600' : 'text-red-800'} font-semibold`}>{widget.bonus}</div>
                            </div>
                        </div>
                    </Content>
                ))}
            </div>
        </div>
    );
};

export default DashboardWidgets;