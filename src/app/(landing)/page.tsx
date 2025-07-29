import { buttonVariants } from '@shared/components/ui'
import { ProgressLink } from '@shared/components/progress'
import { appRoutes } from '@shared/constants/appRoutes'
import { BadgeDollarSign, BadgePercent, Palette, Send, Sparkles } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    title: 'Сценарии для TikTok',
    text: 'Creon поможет придумать цепляющий сценарий даже для самого скучного продукта.',
  },
  {
    icon: <Send className='h-[34px] w-[34px] stroke-[1.5px]' />,
    title: 'Telegram-посты',
    text: 'Автоматически создавай готовые посты для Telegram: новости, промо, мемы, обзоры, рассылки.',
  },
  {
    icon: <Palette className='h-[34px] w-[34px] stroke-[1.5px]' />,
    title: 'Обложки и логотипы',
    text: 'Нейросеть за секунды создаст визуал, который выглядит профессионально.',
  },
]

const plans = [
  {
    name: 'Free',
    color: '#006FEE',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '0$ – мес',
    description: [
      'Идеально для знакомства с сервисом.',
      'До 20 генераций в месяц',
      'TikTok-сценарии и текстовые посты',
      'Без публикации и изображений',
    ],
  },
  {
    name: 'Pro',
    color: '#F5A524',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '9$ – мес',
    description: [
      'Подходит для блогеров и SMM-специалистов.',
      'Публикация в Telegram',
      'Генерация изображений',
      'Планировщик и расширенная история',
    ],
  },
  {
    name: 'Business',
    color: '#17C964',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '29$ – мес',
    description: [
      'Полный доступ и расширенные возможности.',
      'Безлимит на генерации',
      'White-label + приоритетная поддержка',
      'Интеграции и кастомизация',
    ],
  },
]

export default function Page() {
  return (
    <div className='flex flex-col'>
      <section
        id='hero'
        className="flex min-h-screen items-center justify-center bg-[url('/assets/background/landing.jpg')] bg-cover bg-center px-[20px]"
      >
        <div className='flex max-w-[816px] flex-col items-center justify-center gap-[48px]'>
          <h1 className='text-center text-[clamp(1.5rem,5vw,36px)] font-bold text-white'>
            Создавай и публикуй контент с AI за секунды
          </h1>
          <p className='text-center text-[clamp(1rem,3.2vw,24px)] leading-[33px] font-semibold text-white'>
            Creon.ai — универсальный генератор Telegram-постов, сценариев для TikTok и визуального
            контента. Генерируй, редактируй и публикуй в один клик. Без дизайнеров, копирайтеров и
            дедлайнов.
          </p>
          <ProgressLink
            href={appRoutes.MAIN_ROUTE}
            className={buttonVariants({ variant: 'secondary', size: 'lg' })}
          >
            Вперёд
          </ProgressLink>
        </div>
      </section>

      <section
        id='features'
        className='flex min-h-screen flex-col items-center justify-center gap-9 bg-white px-[20px] py-[100px]'
      >
        <div className='flex flex-col items-center'>
          <BadgePercent className='h-[60px] w-[60px] stroke-[1.3px]' />
          <h1 className='text-center text-[clamp(1.75rem,4vw,38px)] font-semibold'>
            Что мы предлагаем?
          </h1>
        </div>
        <div className='flex gap-5 max-2xl:flex-col'>
          {features.map((feature, i) => (
            <div
              key={i}
              className='border-border flex max-w-[438px] flex-col items-center gap-9 rounded-[20px] border p-[30px]'
            >
              {feature.icon}
              <h2 className='text-center text-[clamp(1.25rem,3vw,24px)] font-semibold'>
                {feature.title}
              </h2>
              <p className='text-muted-foreground text-center text-[clamp(1rem,2.4vw,16px)] leading-5 font-semibold'>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id='pricing'
        className='flex min-h-screen flex-col items-center justify-center gap-9 bg-white px-[20px] py-[100px]'
      >
        <div className='flex flex-col items-center'>
          <BadgeDollarSign className='h-[60px] w-[60px] stroke-[1.3px]' />
          <h1 className='text-[clamp(1.75rem,4vw,38px)] font-semibold'>Тарифы</h1>
        </div>
        <div className='flex gap-5 max-2xl:flex-col'>
          {plans.map((plan, i) => (
            <div
              key={i}
              className='flex max-w-[438px] flex-col items-center gap-[21px] rounded-[20px] p-[30px]'
              style={{ border: `1px solid ${plan.color}` }}
            >
              {plan.icon}
              <h2 className='text-[clamp(1.25rem,3vw,24px)] font-semibold'>{plan.name}</h2>
              <p className='text-muted-foreground text-center leading-5 font-semibold'>
                {plan.description.map((line, j) => (
                  <span key={j}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <span className='text-foreground text-[clamp(1rem,2.4vw,16px)] font-semibold'>
                {plan.price}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
