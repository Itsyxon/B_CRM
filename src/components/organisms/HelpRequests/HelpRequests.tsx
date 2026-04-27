'use client'
import { useEffect, useState } from 'react'
import { USER_REQUESTS } from '@/lib/constants'
import LocalStorage from '@/lib/LocalStorage'
import { useSettings } from '@/context/SettingsContext'
import { helpDictionary, localeMap } from '@/lib/dictionaries'
import { ClipboardList, Clock, Tag } from 'lucide-react'

type Request = {
  id: number
  text: string
}

const parseRequest = (text: string) => {
  if (text.startsWith('TYPE:')) {
    const [typePart, ...bodyParts] = text.split('||BODY:')
    return {
      type: typePart.replace('TYPE:', ''),
      body: bodyParts.join('||BODY:'),
    }
  }
  const [typePart, ...rest] = text.split(', Текст: ')
  return {
    type: typePart.replace('Тип: ', '').trim(),
    body: rest.join(', Текст: ').trim(),
  }
}

const statusColors: Record<number, string> = {}
const getStatusColor = (id: number) => {
  if (!statusColors[id]) {
    const colors = [
      'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
      'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
    ]
    statusColors[id] = colors[Math.floor(Math.random() * colors.length)]
  }
  return statusColors[id]
}

const HelpRequests = () => {
  const { own } = useSettings()
  const d = helpDictionary[own.language]
  const locale = localeMap[own.language]

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })

  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    setRequests(LocalStorage.get<Request[]>(USER_REQUESTS) || [])
  }, [])

  return (
    <div className='rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-6 flex-1'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-lg bg-[var(--navbar)]'>
            <ClipboardList size={18} className='text-[var(--accent-gray)]' />
          </div>
          <div>
            <h2 className='text-base font-semibold text-[var(--secondary)]'>
              {d.requests.title}
            </h2>
            <p className='text-xs text-[var(--accent-gray)] mt-0.5'>
              {requests.length === 0
                ? d.requests.noRequests
                : d.requests.count(requests.length)}
            </p>
          </div>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <div className='w-12 h-12 rounded-full bg-[var(--navbar)] flex items-center justify-center mb-3'>
            <ClipboardList size={22} className='text-[var(--accent-gray)]' />
          </div>
          <p className='text-sm font-medium text-[var(--secondary)]'>
            {d.requests.emptyTitle}
          </p>
          <p className='text-xs text-[var(--accent-gray)] mt-1'>
            {d.requests.emptySubtitle}
          </p>
        </div>
      ) : (
        <div className='space-y-3 max-h-[420px] overflow-y-auto pr-1'>
          {[...requests].reverse().map((request) => {
            const { type, body } = parseRequest(request.text)
            const typeLabel =
              d.form.problemTypes.find((p) => p.value === type)?.label ?? type
            return (
              <div
                key={request.id}
                className='rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 hover:border-[var(--info)]/40 transition-colors'
              >
                <div className='flex items-start justify-between gap-3 mb-2'>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusColor(request.id)}`}
                  >
                    <Tag size={10} />
                    {typeLabel}
                  </span>
                  <span className='flex items-center gap-1 text-xs text-[var(--accent-gray)] shrink-0'>
                    <Clock size={11} />
                    {formatDate(request.id)}
                  </span>
                </div>
                <p className='text-sm text-[var(--foreground)] line-clamp-2 leading-relaxed'>
                  {body}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HelpRequests
