import {CardWrapper} from "@shared/components/ui";
import {TelegramForm} from "@/app/dashboard/telegram/form";

export default function Page() {
    return (
     <div className={"space-y-6"}>
         <h1 className={"font-medium text-[clamp(20px,3.2vw,28px)]"}>Телеграм-посты</h1>
         <CardWrapper className={"max-w-[500px]"}>
             <TelegramForm/>
         </CardWrapper>
     </div>
    )
}