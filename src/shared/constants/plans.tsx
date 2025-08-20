import {BadgeCent, Rocket, Sparkles, TrendingUp} from "lucide-react";

export const plans = [
    {
        name: 'Free',
        short: 'Идеально для знакомства с сервисом',
        color: '#006FEE',
        icon: <Sparkles className='h-[34px] w-[34px] stroke-[1.5px] text-[#006FEE]' />,
        price: '0$ / мес',
        description: [
            'До 20 генераций в месяц',
            'TikTok-сценарии и текстовые посты',
            'Без публикации и изображений',
        ],
    },
    {
        name: 'Basic',
        short: 'Для активных пользователей и фрилансеров',
        color: '#9333EA',
        icon: <Rocket className='h-[34px] w-[34px] stroke-[1.5px] text-[#9333EA]' />,
        price: '19$ / мес',
        description: [
            'До 200 генераций в месяц',
            'Публикации в Telegram и TikTok',
            'Генерация изображений и аватаров',
        ],
    },
    {
        name: 'Pro',
        short: 'Максимум возможностей для роста',
        color: '#14b8a6',
        icon: <TrendingUp className='h-[34px] w-[34px] stroke-[1.5px] text-[#14b8a6]' />,
        price: '29$ / мес',
        description: [
            'До 500 генераций в месяц',
            'Лучшие AI-модели',
            'Сценарии, обложки, автопостинг',
        ],
    },
    {
        name: 'Business',
        short: 'Для команд и агентств',
        color: '#FACC15',
        icon: <BadgeCent className='h-[34px] w-[34px] stroke-[1.5px] text-[#FACC15]' />,
        price: '49$ / мес',
        description: [
            'Безлимит генераций',
            'Поддержка командной работы',
            'Автопостинг и интеграции',
        ],
    },
]