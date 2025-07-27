import Image from "next/image"
export const LandingHeader = () => {
    return (
        <header className={"h-[70px] bg-black  w-full px-[30px] fixed  flex justify-center"}>
            <div className={"text-white font-semibold flex items-center justify-between max-w-screen-xl w-full"}>
                <div className={"flex items-center gap-2"}> <Image src={"/assets/icons/logo.svg"} width={39} height={39} alt={"logo"}/><span>Creon.ai</span></div>
                <div className={"space-x-[40px]"}>
                    <span>Главная</span>
                    <span>Предложение</span>
                    <span>Тарифы</span>
                </div>
            </div>
        </header>
    );
};

