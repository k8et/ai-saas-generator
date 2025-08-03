'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/components/ui'
import { RegisterForm } from '@/app/auth/register/form'
import { LoginForm } from '@/app/auth/login/form'
import Image from "next/image";

export default function Page() {
  const [tab, setTab] = useState('login')

  return (
      <div className='flex min-h-screen w-full items-center justify-center'>
          <div className={"bg-[url('/assets/background/landing.jpg')] max-2xl:hidden  min-h-screen w-full flex items-center justify-center"} >
              <Image width={80} height={80} src={"/assets/icons/logo.svg"} alt={"logo"}/>
          </div>
          <div className={"w-full flex items-center justify-center p-3"}>
              <div className='w-full max-w-[600px] rounded-lg border bg-card p-[30px]'>
                  <Tabs value={tab} onValueChange={setTab}>
                      <TabsList className='w-full'>
                          <TabsTrigger value='login'>Вход</TabsTrigger>
                          <TabsTrigger value='register'>Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value='login'>
                          <LoginForm/>
                      </TabsContent>
                      <TabsContent value='register'>
                          <RegisterForm/>
                      </TabsContent>
                  </Tabs>
              </div>
          </div>
      </div>
  )
}
