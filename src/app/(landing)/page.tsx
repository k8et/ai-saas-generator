'use client'

import { motion, Variants } from 'framer-motion'
import { ProgressLink } from '@shared/components/progress'
import { appRoutes } from '@shared/constants/appRoutes'
import {
  BadgeDollarSign,
  BadgePercent,
  CircleCheckBig,
  Palette,
  Send,
  Sparkles,
} from 'lucide-react'
import { StarsBackground } from '@shared/components/ui/StarBackground'

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
    short: 'Идеально для знакомства с сервисом',
    color: '#006FEE',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '0$ – мес',
    description: [
      'До 20 генераций в месяц',
      'TikTok-сценарии и текстовые посты',
      'Без публикации и изображений',
    ],
  },
  {
    name: 'Basic',
    short: 'Для стартапов и индивидуальных пользователей',
    color: '#FFFFFF',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '5$ / мес',
    description: ['AI-powered analytics', 'Basic support', '5 projects limit', 'Access to basic AI tools'],
  },
  {
    name: 'Pro',
    short: 'Для блогеров и SMM-специалистов',
    color: '#F5A524',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '10$ – мес',
    description: [
      'Публикация в Telegram',
      'Генерация изображений',
      'Планировщик и расширенная история',
    ],
  },
  {
    name: 'Business',
    short: 'Для агентств и команд',
    color: '#17C964',
    icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px]' />,
    price: '30$ – мес',
    description: [
      'Безлимит на генерации',
      'White-label + приоритетная поддержка',
      'Интеграции и кастомизация',
    ],
  },
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export default function Page() {
  return (
    <div className='flex flex-col bg-black pb-[100px]'>
      <StarsBackground className='absolute inset-0 z-0 h-[1000px]' />

      <section
        id='hero'
        className='relative z-10 flex h-[1000px] flex-col items-center justify-center px-[20px] pt-[150px]'
      >
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeInUp}
          className='flex max-w-[816px] flex-col items-center justify-center gap-[48px]'
        >
          <motion.h1
            className='text-center text-[clamp(1.5rem,5vw,36px)] font-bold text-white'
            variants={fadeInUp}
            custom={1}
          >
            Создавай и публикуй контент с AI за секунды
          </motion.h1>
          <motion.p
            className='text-center text-[clamp(1rem,3.2vw,24px)] leading-[33px] font-semibold text-white'
            variants={fadeInUp}
            custom={2}
          >
            Creon.ai — универсальный генератор Telegram-постов, сценариев для TikTok и визуального
            контента.
          </motion.p>
          <motion.div variants={fadeInUp} custom={3}>
            <ProgressLink href={appRoutes.AUTH_ROUTE} variant='secondary' size='lg'>
              Вперёд
            </ProgressLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='animate-border mt-[100px] max-h-[600px] overflow-hidden rounded-xl'
        >
          <img
            className='relative z-0 w-full rounded-xl object-cover'
            src='/assets/image/dashboard.png'
            alt='ad'
          />
        </motion.div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black via-black/30 to-transparent' />
      </section>

      <section
        id='features'
        className='flex flex-col items-center justify-center gap-9 bg-black px-[20px] py-[100px] text-white'
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='flex flex-col items-center'
        >
          <BadgePercent className='h-[60px] w-[60px] stroke-[1.3px]' />
          <h1 className='text-center text-[clamp(1.75rem,4vw,38px)] font-semibold'>
            Что мы предлагаем?
          </h1>
        </motion.div>

        <div className='grid grid-cols-1 justify-center gap-5  xl:grid-cols-3'>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeInUp}
              className='bg-card-foreground flex max-w-[438px] flex-col items-center gap-9 rounded-[20px] border border-white/40 p-[30px]'
            >
              {feature.icon}
              <h2 className='text-center text-[clamp(1.25rem,3vw,24px)] font-semibold'>
                {feature.title}
              </h2>
              <p className='text-muted-foreground text-center text-[clamp(1rem,2.4vw,16px)] leading-5 font-semibold'>
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id='pricing'
        className='flex flex-col items-center justify-center gap-9 px-[20px] py-[100px] text-white'
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='flex flex-col items-center'
        >
          <BadgeDollarSign className='h-[60px] w-[60px] stroke-[1.3px]' />
          <h1 className='text-[clamp(1.75rem,4vw,38px)] font-semibold'>Тарифы</h1>
        </motion.div>

        <div className='grid grid-cols-4 justify-center gap-5 max-md:grid-cols-1 max-2xl:grid-cols-2'>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              className={`bg-card-foreground flex w-full max-w-[438px] flex-col items-start gap-[21px] rounded-[20px] p-[30px] ${
                plan.name === 'Basic' ? 'border border-white' : ''
              }`}
              style={{ border: plan.name !== 'Basic' ? `1px solid ${plan.color}` : '' }}
              whileHover={{ scale: 1.03 }}
            >
              {plan.icon}
              <div className='min-h-[85px]'>
                <h2 className='text-[clamp(1.25rem,3vw,24px)] font-semibold'>{plan.name}</h2>
                <p className='text-muted-foreground text-md text-start font-medium'>{plan.short}</p>
              </div>
              <span className='text-[28px] font-bold text-white'>{plan.price}</span>
              <div className='flex flex-col gap-2 pt-2'>
                {plan.description.map((line, j) => (
                  <div key={j} className='text-md flex items-center gap-2 text-white'>
                    <CircleCheckBig className={'text-green-500'} /> {line}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
