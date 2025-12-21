// HelpForm.tsx
'use client'
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import { HelpRequestType, Request } from '@/types/HelpForm';
import React, { ComponentProps } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import Button from '@/components/atoms/Button';
import LocalStorage from '@/lib/LocalStorage';
import { USER_REQUESTS } from '@/lib/constants';

const FormInput = ({ name, type = 'text', ...props }: { name: string } & ComponentProps<'input'>) => {
    const { register } = useFormContext()
    const commonProps = {
        className: 'w-full bg-[var(--tertiary)]',
        ...register(name),
        ...props
    }

    return <Input {...commonProps} type={type} />
}

const FormTextarea = ({ name, ...props }: { name: string } & ComponentProps<'textarea'>) => {
    const { register } = useFormContext()
    const commonProps = {
        className: 'w-full',
        ...register(name),
        ...props
    }

    return <TextArea {...commonProps} />
}

const FormSelect = ({ name, options, ...props }: { name: string; options: { value: string; label: string }[] } & ComponentProps<'select'>) => {
    const { register } = useFormContext()

    const commonProps = {
        className: 'w-full',
        ...register(name),
        ...props
    }

    return (
        <Select {...commonProps}>
            <option>Выберите тип проблемы</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    )
}

const HelpForm = ({ handleFormSubmit }: { handleFormSubmit: () => void }) => {
    const methods = useForm<HelpRequestType>({
        defaultValues: {
            problemType: undefined,
        }
    })

    const problemType = methods.watch('problemType')
    const showReasonField = problemType === 'other'

    const problemTypeOptions = [
        { value: 'web', label: 'С работой сайта' },
        { value: 'service', label: 'С работой сервисов' },
        { value: 'bug', label: 'Сообщить об ошибке' },
        { value: 'other', label: 'Другое' },
    ]

    const requestSubmit = (data: HelpRequestType) => {
        const newRequest: Request = {
            id: Date.now(),
            text: `Тип: ${problemTypeOptions.find(opt => opt.value === data.problemType)?.label}, Текст: ${data.problemText}`
        }

        const existingRequests = LocalStorage.get<Request[]>(USER_REQUESTS) || []
        const updatedRequests = [...existingRequests, newRequest]
        LocalStorage.set(USER_REQUESTS, updatedRequests)
        handleFormSubmit()
        console.log('Сохраненное обращение:', newRequest)
        methods.reset()
        alert('Обращение отправлено!')
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(requestSubmit)} className='flex flex-col gap-3 w-1/3'>
                <FormInput name='name' placeholder='Ваше ФИО' required />
                <FormInput name='email' type='email' placeholder='Ваш Email' required />

                <FormSelect
                    name='problemType'
                    options={problemTypeOptions}
                />

                {showReasonField && (
                    <FormInput
                        name='reason'
                        placeholder='Уточните, что именно у вас случилось?'
                        required
                    />
                )}

                <FormTextarea
                    name='problemText'
                    placeholder='Опишите вашу проблему подробно'
                    required
                    className='h-full'
                />

                <Button
                    type='submit'
                >
                    Отправить запрос
                </Button>
            </form>
        </FormProvider>
    );
};

export default HelpForm;