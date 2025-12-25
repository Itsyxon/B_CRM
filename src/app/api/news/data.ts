import { DashboardNewsWithLimit } from '@/types/DashboardTypes'

export const dashboardNews: DashboardNewsWithLimit = {
  meta: {
    total: 15,
    limit: 3,
  },
  data: [
    {
      id: '1',
      title: 'Новая интеграция с Telegram',
      description:
        'Добавлена возможность отправки уведомлений и создания тикетов напрямую из Telegram-бота. Упростили процесс коммуникации с клиентами.',
      likes: 42,
      comments: 18,
      reposts: 0,
      createdAt: '2024-03-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'Обновление аналитики продаж',
      description:
        'В разделе аналитики появились новые графики и фильтры. Теперь можно отслеживать динамику продаж по регионам и категориям товаров.',
      likes: 89,
      comments: 24,
      reposts: 1,
      createdAt: '2024-03-14T14:20:00Z',
    },
    {
      id: '3',
      title: 'Автоматизация email-рассылок',
      description:
        'Запустили новый конструктор email-кампаний с шаблонами и A/B тестированием. Увеличили открываемость писем на 35%.',
      likes: 56,
      comments: 31,
      reposts: 0,
      createdAt: '2024-03-13T09:15:00Z',
    },
    {
      id: '4',
      title: 'Мобильное приложение CRM',
      description:
        'Вышло обновление мобильного приложения с поддержкой офлайн-режима и push-уведомлениями. Доступно в App Store и Google Play.',
      likes: 123,
      comments: 47,
      reposts: 2,
      createdAt: '2024-03-12T16:45:00Z',
    },
    {
      id: '5',
      title: 'Интеграция с AmoCRM',
      description:
        'Теперь можно синхронизировать контакты и сделки между нашей CRM и AmoCRM. Упрощен процесс миграции.',
      likes: 78,
      comments: 29,
      reposts: 0,
      createdAt: '2024-03-11T11:10:00Z',
    },
    {
      id: '6',
      title: 'Новый модуль складского учета',
      description:
        'Добавлен модуль управления складом с поддержкой штрих-кодов и инвентаризации в реальном времени.',
      likes: 94,
      comments: 42,
      reposts: 1,
      createdAt: '2024-03-10T13:25:00Z',
    },
    {
      id: '7',
      title: 'Обновление безопасности',
      description:
        'Внедрена двухфакторная аутентификация и улучшено шифрование данных. Повышена защита от кибератак.',
      likes: 65,
      comments: 19,
      reposts: 0,
      createdAt: '2024-03-09T15:30:00Z',
    },
    {
      id: '8',
      title: 'API для разработчиков',
      description:
        'Представлено новое REST API с документацией и примерами использования. Упрощена интеграция со сторонними сервисами.',
      likes: 112,
      comments: 58,
      reposts: 3,
      createdAt: '2024-03-08T10:00:00Z',
    },
    {
      id: '9',
      title: 'Умные отчеты',
      description:
        'Запущена функция автоматической генерации отчетов с AI-анализом. Система сама предлагает insights по данным.',
      likes: 87,
      comments: 33,
      reposts: 1,
      createdAt: '2024-03-07T14:15:00Z',
    },
    {
      id: '10',
      title: 'Чат-бот для поддержки',
      description:
        'Внедрен AI-чат-бот для первой линии поддержки клиентов. Уменьшил нагрузку на операторов на 40%.',
      likes: 145,
      comments: 67,
      reposts: 2,
      createdAt: '2024-03-06T09:45:00Z',
    },
    {
      id: '11',
      title: 'Кастомизация воронок продаж',
      description:
        'Добавлен визуальный конструктор воронок продаж. Теперь можно создавать сложные сценарии без помощи разработчиков.',
      likes: 76,
      comments: 28,
      reposts: 0,
      createdAt: '2024-03-05T16:20:00Z',
    },
    {
      id: '12',
      title: 'Интеграция с 1С',
      description:
        'Улучшена синхронизация с 1С:Предприятие. Теперь обмен данными происходит в фоновом режиме без задержек.',
      likes: 98,
      comments: 45,
      reposts: 1,
      createdAt: '2024-03-04T11:30:00Z',
    },
    {
      id: '13',
      title: 'Дашборд для менеджеров',
      description:
        'Созданы персонализированные дашборды для менеджеров с ключевыми метриками KPI и целями на месяц.',
      likes: 54,
      comments: 22,
      reposts: 0,
      createdAt: '2024-03-03T13:40:00Z',
    },
    {
      id: '14',
      title: 'Голосовые заметки',
      description:
        'Добавлена возможность добавлять голосовые заметки к контактам и сделкам. Упрощено ведение записей.',
      likes: 67,
      comments: 31,
      reposts: 0,
      createdAt: '2024-03-02T10:50:00Z',
    },
    {
      id: '15',
      title: 'Анализ тональности',
      description:
        'Внедрена система анализа тональности переписки с клиентами. Помогает выявить недовольных клиентов на раннем этапе.',
      likes: 81,
      comments: 39,
      reposts: 2,
      createdAt: '2024-03-01T15:10:00Z',
    },
  ],
}

export function getPaginatedNews(page: number = 1, limit: number = 3) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = dashboardNews.data.slice(startIndex, endIndex)

  return {
    meta: {
      total: dashboardNews.meta.total,
      limit,
      page,
      hasMore: endIndex < dashboardNews.data.length,
      nextPage: endIndex < dashboardNews.data.length ? page + 1 : null,
    },
    data: paginatedData,
  }
}
