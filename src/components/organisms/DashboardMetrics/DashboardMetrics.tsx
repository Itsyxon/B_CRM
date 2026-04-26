'use client'

import { useEffect, useRef, useState } from 'react'

const Sparkline = ({
  data,
  strokeClass,
}: {
  data: number[]
  strokeClass: string
}) => {
  const W = 72,
    H = 30
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W
      const y = H - ((v - min) / range) * (H - 4) - 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={W} height={H} className='overflow-visible shrink-0'>
      <polyline
        points={pts}
        fill='none'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={strokeClass}
      />
    </svg>
  )
}

const Ring = ({ pct, strokeClass }: { pct: number; strokeClass: string }) => {
  const r = 18,
    cx = 22,
    cy = 22
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={44} height={44} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill='none'
        strokeWidth={4}
        style={{ stroke: 'var(--border)' }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill='none'
        strokeWidth={4}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap='round'
        className={strokeClass}
        style={{ transition: 'stroke-dashoffset 0.7s ease-in-out' }}
      />
    </svg>
  )
}

interface M {
  conv: number
  clients: number
  clientsSpark: number[]
  deal: number
  tasks: number
  mrr: number
  mrrSpark: number[]
  nps: number
  check: number
  churn: number
  churnSpark: number[]
}

const INITIAL: M = {
  conv: 68.4,
  clients: 124,
  clientsSpark: [40, 55, 35, 70, 60, 80, 65, 90],
  deal: 4.2,
  tasks: 89,
  mrr: 2.4,
  mrrSpark: [180, 210, 195, 230, 215, 245, 260, 240],
  nps: 72,
  check: 48500,
  churn: 3.2,
  churnSpark: [4.8, 4.2, 3.9, 4.1, 3.7, 3.5, 3.4, 3.2],
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}
function jitter(v: number, d: number) {
  return v + (Math.random() - 0.5) * 2 * d
}
function shiftSpark(arr: number[], next: number) {
  return [...arr.slice(1), next]
}

function tick(m: M): M {
  const conv = +clamp(jitter(m.conv, 1.2), 60, 78).toFixed(1)
  const clients = Math.round(clamp(jitter(m.clients, 4), 108, 142))
  const clientsSpark = shiftSpark(
    m.clientsSpark,
    clamp(jitter(m.clientsSpark.at(-1)!, 12), 20, 110),
  )
  const deal = +clamp(jitter(m.deal, 0.25), 3.2, 5.8).toFixed(1)
  const tasks = Math.round(clamp(jitter(m.tasks, 2), 79, 99))
  const mrr = +clamp(jitter(m.mrr, 0.08), 1.9, 2.9).toFixed(1)
  const mrrSpark = shiftSpark(
    m.mrrSpark,
    clamp(jitter(m.mrrSpark.at(-1)!, 15), 150, 300),
  )
  const nps = Math.round(clamp(jitter(m.nps, 2), 62, 83))
  const check =
    Math.round(clamp(jitter(m.check, 400), 43000, 54000) / 100) * 100
  const churn = +clamp(jitter(m.churn, 0.2), 2.0, 4.8).toFixed(1)
  const churnSpark = shiftSpark(
    m.churnSpark,
    clamp(jitter(m.churnSpark.at(-1)!, 0.3), 1.8, 5.5),
  )
  return {
    conv,
    clients,
    clientsSpark,
    deal,
    tasks,
    mrr,
    mrrSpark,
    nps,
    check,
    churn,
    churnSpark,
  }
}

const card =
  'rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-4 flex flex-col gap-2'
const val =
  'text-xl xl:text-2xl font-bold text-[var(--foreground)] tabular-nums'

const DashboardMetrics = ({ compact }: { compact?: boolean }) => {
  const [m, setM] = useState<M>(INITIAL)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const schedule = () => {
      timer.current = setTimeout(
        () => {
          setM((prev) => tick(prev))
          schedule()
        },
        2000 + Math.random() * 20,
      )
    }
    schedule()
    return () => clearTimeout(timer.current)
  }, [])

  const convPct = m.conv
  const dealPct = Math.round(clamp((m.deal / 7) * 100, 0, 100))
  const tasksPct = m.tasks
  const checkPct = Math.round(clamp(((m.check - 43000) / 11000) * 100, 0, 100))

  return (
    <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      {/* 1 – Конверсия */}
      <div className={card}>
        <p className='text-xs text-[var(--accent-gray)]'>Конверсия сделок</p>
        <p className={val}>{m.conv}%</p>
        <div className='h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden'>
          <div
            className='h-full bg-emerald-500 rounded-full'
            style={{
              width: `${convPct}%`,
              transition: 'width 0.7s ease-in-out',
            }}
          />
        </div>
        <p className='text-xs text-emerald-500 font-medium'>
          +4.1% к прошлому мес.
        </p>
      </div>

      {/* 2 – Новые клиенты */}
      <div className={card}>
        <p className='text-xs text-[var(--accent-gray)]'>Новые клиенты</p>
        <div className='flex items-end justify-between gap-2'>
          <div>
            <p className={val}>{m.clients}</p>
            <p className='text-xs text-[var(--accent-gray)] mt-0.5'>за месяц</p>
          </div>
          <Sparkline data={m.clientsSpark} strokeClass='stroke-blue-500' />
        </div>
        <p className='text-xs text-blue-500 font-medium'>+12 к прошлому мес.</p>
      </div>

      {/* 3 – Ср. время сделки */}
      <div className={card}>
        <p className='text-xs text-[var(--accent-gray)]'>Ср. время сделки</p>
        <div className='flex items-center gap-3'>
          <Ring pct={dealPct} strokeClass='stroke-amber-500' />
          <div>
            <p className={`${val} leading-none`}>{m.deal}</p>
            <p className='text-xs text-[var(--accent-gray)] mt-1'>дня</p>
          </div>
        </div>
        <p className='text-xs text-amber-500 font-medium'>−0.8 дн. от нормы</p>
      </div>

      {/* 4 – Задачи */}
      <div className={card}>
        <p className='text-xs text-[var(--accent-gray)]'>Задачи выполнены</p>
        <p className={val}>
          {m.tasks}{' '}
          <span className='text-sm xl:text-base font-medium text-[var(--accent-gray)]'>
            / 100
          </span>
        </p>
        <div className='h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden'>
          <div
            className='h-full bg-violet-500 rounded-full'
            style={{
              width: `${tasksPct}%`,
              transition: 'width 0.7s ease-in-out',
            }}
          />
        </div>
        <p className='text-xs text-[var(--accent-gray)]'>Текущий спринт</p>
      </div>

      {!compact && (
        <>
          {/* 5 – MRR */}
          <div className={card}>
            <p className='text-xs text-[var(--accent-gray)]'>MRR</p>
            <div className='flex items-end justify-between gap-2'>
              <div>
                <p className={val}>{m.mrr}M</p>
                <p className='text-xs text-[var(--accent-gray)] mt-0.5'>
                  ₽ / мес.
                </p>
              </div>
              <Sparkline data={m.mrrSpark} strokeClass='stroke-violet-500' />
            </div>
            <p className='text-xs text-violet-500 font-medium'>
              +8.3% к прошлому мес.
            </p>
          </div>

          {/* 6 – NPS */}
          <div className={card}>
            <p className='text-xs text-[var(--accent-gray)]'>NPS</p>
            <div className='flex items-center gap-3'>
              <Ring pct={m.nps} strokeClass='stroke-emerald-500' />
              <div>
                <p className={`${val} leading-none`}>{m.nps}</p>
                <p className='text-xs text-[var(--accent-gray)] mt-1'>из 100</p>
              </div>
            </div>
            <p className='text-xs text-emerald-500 font-medium'>
              +5 пт. к прошлому мес.
            </p>
          </div>

          {/* 7 – Средний чек */}
          <div className={card}>
            <p className='text-xs text-[var(--accent-gray)]'>Средний чек</p>
            <div className='flex items-baseline gap-1 min-w-0'>
              <p className={`${val} truncate`}>
                {m.check.toLocaleString('ru-RU')}
              </p>
              <span className='text-sm xl:text-base font-semibold text-[var(--accent-gray)] shrink-0'>
                ₽
              </span>
            </div>
            <div className='h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden'>
              <div
                className='h-full bg-amber-500 rounded-full'
                style={{
                  width: `${checkPct}%`,
                  transition: 'width 0.7s ease-in-out',
                }}
              />
            </div>
            <p className='text-xs text-amber-500 font-medium'>
              +2 100 ₽ к прошлому мес.
            </p>
          </div>

          {/* 8 – Отток */}
          <div className={card}>
            <p className='text-xs text-[var(--accent-gray)]'>Отток клиентов</p>
            <div className='flex items-end justify-between gap-2'>
              <div>
                <p className={val}>{m.churn}%</p>
                <p className='text-xs text-[var(--accent-gray)] mt-0.5'>
                  за месяц
                </p>
              </div>
              <Sparkline data={m.churnSpark} strokeClass='stroke-rose-500' />
            </div>
            <p className='text-xs text-emerald-500 font-medium'>
              −0.4% к прошлому мес.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardMetrics
