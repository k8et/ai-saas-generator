export default function Page() {
    return (
        <div className="flex flex-col">
            <section
                className="min-h-screen bg-[url('/assets/background/landing.jpg')] bg-cover bg-center flex items-center justify-center"
            >
                <div className="flex flex-col justify-center items-center max-w-[816px] gap-[48px]">
                    <h1 className="text-[32px] font-bold text-white ">Создавай и публикуй контент с AI за секунды</h1>
                    <p className={"text-[24px] font-semibold text-white text-center leading-[33px]"}>Creon.ai — универсальный генератор
                        Telegram-постов, сценариев для TikTok и визуального контента.
                        Генерируй, редактируй и публикуй в один клик. Без дизайнеров, копирайтеров и дедлайнов.</p>
                </div>
            </section>

            <section className="min-h-screen bg-white flex items-center justify-center">
                <h2 className="text-[28px] font-bold text-primary">Second Section</h2>
            </section>

            <section className="min-h-screen bg-gray-100 flex items-center justify-center">
                <h2 className="text-[28px] font-bold text-primary">Third Section</h2>
            </section>
        </div>
    )
}
