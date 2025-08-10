import { CardWrapper } from '@shared/components/ui'
import { ImageGeneratorForm } from '@/app/dashboard/image-generator/form'

export default function Page() {
  return (
    <div className={"space-y-6"}>
      <h1 className={"font-medium text-[clamp(20px,3.2vw,28px)]"}>Генератор изображений</h1>
      <CardWrapper className={"max-w-[500px]"}>
        <ImageGeneratorForm />
      </CardWrapper>
    </div>
  )
}