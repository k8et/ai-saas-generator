import { Telegraf } from 'telegraf'
import 'dotenv/config'

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!)

const domain = process.env.BASE_URL!
const webhookUrl = `${domain}/api/bot`

bot.telegram.setWebhook(webhookUrl).then(() => {
    console.log(`✅ Webhook установлен: ${webhookUrl}`)
})
