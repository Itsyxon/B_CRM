'use client'
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import { HelpRequestType, Request } from '@/types/HelpForm';
import React, { ComponentProps } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import LocalStorage from '@/lib/LocalStorage';
import { USER_REQUESTS } from '@/lib/constants';
import { MessageSquarePlus, Send } from 'lucide-react';

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-sm font-medium text-[var(--secondary)] mb-1.5">
        {children}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
)

const FormInput = ({ name, type = 'text', label, required, ...props }: {
    name: string;
    label?: string;
    required?: boolean;
} & ComponentProps<'input'>) => {
    const { register } = useFormContext()
    return (
        <div>
            {label && <Label required={required}>{label}</Label>}
            <Input
                className="w-full"
                {...register(name, { required })}
                type={type}
                {...props}
            />
        </div>
    )
}

const FormTextarea = ({ name, label, required, ...props }: {
    name: string;
    label?: string;
    required?: boolean;
} & ComponentProps<'textarea'>) => {
    const { register } = useFormContext()
    return (
        <div className="flex-1 flex flex-col">
            {label && <Label required={required}>{label}</Label>}
            <TextArea
                className="w-full flex-1 min-h-[120px]"
                {...register(name, { required })}
                {...props}
            />
        </div>
    )
}

const FormSelect = ({ name, label, options, ...props }: {
    name: string;
    label?: string;
    options: { value: string; label: string }[]
} & ComponentProps<'select'>) => {
    const { register } = useFormContext()
    return (
        <div>
            {label && <Label>{label}</Label>}
            <Select className="w-full" {...register(name)} {...props}>
                <option value="">— Выберите тип проблемы —</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </Select>
        </div>
    )
}

const problemTypeOptions = [
    { value: 'web', label: 'С работой сайта' },
    { value: 'service', label: 'С работой сервисов' },
    { value: 'bug', label: 'Сообщить об ошибке' },
    { value: 'other', label: 'Другое' },
]

const HelpForm = ({ handleFormSubmit }: { handleFormSubmit: () => void }) => {
    const methods = useForm<HelpRequestType>()
    const problemType = methods.watch('problemType')

    const onSubmit = (data: HelpRequestType) => {
        const typeLabel = problemTypeOptions.find(o => o.value === data.problemType)?.label ?? data.problemType
        const newRequest: Request = {
            id: Date.now(),
            text: `Тип: ${typeLabel}, Текст: ${data.problemText}`,
        }
        const existing = LocalStorage.get<Request[]>(USER_REQUESTS) || []
        LocalStorage.set(USER_REQUESTS, [...existing, newRequest])
        handleFormSubmit()
        methods.reset()
    }

    return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-6 w-full md:w-[380px] md:shrink-0">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-[var(--info)]/10 shrink-0">
                    <MessageSquarePlus size={18} className="text-[var(--info)]" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-[var(--secondary)]">Новое обращение</h2>
                    <p className="text-xs text-[var(--accent-gray)] mt-0.5">Мы ответим в течение 24 часов</p>
                </div>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                        <FormInput name="name" label="Ваше ФИО" placeholder="Иван Иванов" required />
                        <FormInput name="email" type="email" label="Email" placeholder="ivan@company.com" required />
                    </div>

                    <FormSelect
                        name="problemType"
                        label="Тип обращения"
                        options={problemTypeOptions}
                    />

                    {problemType === 'other' && (
                        <FormInput
                            name="reason"
                            label="Уточните проблему"
                            placeholder="Опишите кратко"
                            required
                        />
                    )}

                    <FormTextarea
                        name="problemText"
                        label="Описание"
                        placeholder="Подробно опишите проблему или вопрос..."
                        required
                    />

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--info)] text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                    >
                        <Send size={15} />
                        Отправить обращение
                    </button>
                </form>
            </FormProvider>
        </div>
    )
}

export default HelpForm
