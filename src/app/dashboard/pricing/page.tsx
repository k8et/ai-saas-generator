import { Button } from '@/shared/components/ui'
import { CircleCheckBig } from 'lucide-react'
import {plans} from "@shared/constants/plans";

export default function PricingSection() {
  return (
      <div
          className='space-y-6'
      >
        <h1 className={'text-[clamp(20px,3.2vw,28px)] font-medium'}>Тарифы</h1>
        <div className="grid grid-cols-2 max-w-[900px] max-lg:grid-cols-1  gap-5">
          {plans.map((plan, i) => (
              <div
                  key={i}
                  className='bg-card relative flex w-full  flex-col items-start gap-[21px] rounded-[20px] p-[30px] transition-colors duration-300'
                  style={{
                    border: `1px solid ${plan.color}`,
                  }}

              >
                {plan.icon}

                <div className='min-h-[85px]'>
                  <h2 className='text-[clamp(1.25rem,3vw,24px)] font-semibold'>{plan.name}</h2>
                  <p className='text-muted-foreground text-md text-start font-medium'>{plan.short}</p>
                </div>

                <span className='text-[28px] font-bold '>{plan.price}</span>

                <div className='flex flex-col gap-2 pt-2'>
                  {plan.description.map((line, j) => (
                      <div key={j} className='text-md flex items-center gap-2 font-semibold '>
                        <CircleCheckBig className='h-[18px] w-[18px] text-green-500'/> {line}
                      </div>
                  ))}
                </div>
                <Button
                    className='mt-auto w-full '
                >
                  {plan.price === '0$ / мес' ? 'Попробовать бесплатно' : 'Оформить'}
                </Button>
              </div>
          ))}
        </div>
      </div>
  )
}
