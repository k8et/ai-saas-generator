export const mailHtml = `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 40px;">
    <table style="max-width: 600px; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <tr>
        <td style="text-align: center;">
          <h1 style="margin-bottom: 8px; font-size: 28px; color: #111827;">Добро пожаловать в <span style="color: #6366F1;">Creon.ai</span></h1>
          <p style="color: #6b7280; font-size: 16px;">Ты на шаг ближе к автоматизации своего AI-продукта.</p>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 30px; text-align: center;">
          <p style="color: #374151; font-size: 16px;">Нажми кнопку ниже, чтобы подтвердить свою почту и активировать аккаунт:</p>
          <a href="{{CONFIRM_URL}}" style="margin-top: 16px; display: inline-block; padding: 12px 28px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Подтвердить почту
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 36px; text-align: center;">
          <p style="color: #9ca3af; font-size: 13px;">Если ты не регистрировался на creon.ai, просто проигнорируй это письмо.</p>
          <p style="color: #d1d5db; font-size: 12px; margin-top: 8px;">© ${new Date().getFullYear()} Creon.ai — Генератор AI SaaS продуктов</p>
        </td>
      </tr>
    </table>
  </div>
`
