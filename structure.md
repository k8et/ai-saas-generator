# 📁 Project Structure Guide

Описание архитектуры проекта AI SaaS с использованием **Next.js App Router**, **Server Actions** и модульной структуры через **`/shared`** для переиспользуемого кода.

---

## 🔗 `/app`

Основная точка маршрутизации:
```
/app
  /dashboard              ← Кабинет с генераторами
    /layout.tsx           ← Использует DashboardLayout
    /telegram             ← Генератор постов Telegram
    /tiktok               ← Генератор TikTok-сценариев
    /images               ← Генератор обложек/аватарок
  /login                  ← Страница входа
  /register               ← Регистрация
  /pricing                ← Тарифы
  /api/webhook/telegram   ← Webhook от Telegram-бота
```

> Каждая поддиректория маршрута может содержать свой layout или страницу (`route.ts`, `layout.tsx`).

---

## 🧩 `/shared/layout`

Layout-обёртки для разных зон сайта:
```
/shared/layout
  /DashboardLayout
    DashboardLayout.tsx
    /components
      DashboardSidebar.tsx
  /LandingLayout
    LandingLayout.tsx
    /components
      Header.tsx
      Footer.tsx
```

---

## 🧠 Feature-based разделение

Каждая фича включает:
- `route.ts` — UI страницы
- `form.tsx` — форма генерации
- `schema.ts` — валидация через Zod
- `actions.ts` — серверные действия
- `utils.ts` — форматирование, промптинг

Пример: `/dashboard/telegram`
```
/app/dashboard/telegram
  route.ts
  form.tsx
  schema.ts
  actions.ts
  utils.ts
```

Доп. компоненты:
```
/shared/components/telegram
  TopicInputBlock.tsx
  SettingsBlock.tsx
  AddChannelModal.tsx
  AddChannelForm.tsx
  PostPreviewModal.tsx
```

> Аналогично для TikTok и Images.

---

## 💵 `/replenishments` (Пополнения)

```
/replenishments
  route.ts
  table.tsx
  columns.ts
  utils.ts
  types.ts
  actions.ts
```

---

## 🧰 `/shared`

Глобальные общие ресурсы, не привязанные к одной фиче:

```
/shared
  /components
    /ui                  ← Базовые UI-компоненты
      Button.tsx
      Input.tsx
      Select.tsx
      Textarea.tsx
      Card.tsx
    /forms               ← Формы фич
      TelegramPostForm.tsx
      TiktokScriptForm.tsx
      ImageGeneratorForm.tsx
  /layout                ← Layout-компоненты
  /lib
    /openai              ← Работа с OpenAI API
      generateTelegramPost.ts
      generateTiktokScript.ts
      generateImage.ts
    /auth
      getUser.ts
    /db
      drizzle.ts
      queries.ts
    /validators
      common.ts
    /utils
      cn.ts
      formatDate.ts
      formatPrice.ts
  /constants
    telegram.ts
    limits.ts
  /styles
    globals.css
    tailwind.config.ts
```

---

## 🖼 `/public`

Публичные ассеты:
```
/public
  /icons
  /og-images
```

---

## 📌 Архитектурные принципы

- **Feature-first**: каждая фича изолирована и масштабируема
- **Shared-first**: весь переиспользуемый код — в `/shared`
- **Server Actions**: логика генерации работает на сервере
- **App Router**: маршруты и layout'ы определяются на уровне файловой структуры