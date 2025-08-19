import { Telegraf } from 'telegraf'
import 'dotenv/config'

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!)

const domain = process.env.BASE_URL!

bot.telegram.setMyCommands([
    { command: 'start', description: 'Начать авторизацию' },
    { command: 'help', description: 'Помощь' },
]).then(() => {
    console.log('✅ Команды успешно установлены')
}).catch((err) => {
    console.error('❌ Ошибка при установке команд:', err)
})

bot.start(async (ctx) => {
    const loginUrl = `${domain}/api/auth/telegram/redirect-handler`

    await ctx.reply('👋 Привет! Нажми кнопку, чтобы авторизоваться:', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🔐 Авторизоваться',
                        login_url: {
                            url: loginUrl,
                            request_write_access: true,
                        },
                    },
                ],
            ],
        },
    })
})

bot.help(async (ctx) => {
    await ctx.reply('🆘 Помощь:\n\n- Нажми /start чтобы начать\n- Авторизация работает через Telegram Login URL\n- Если ты видишь это сообщение, значит бот работает ✅')
})