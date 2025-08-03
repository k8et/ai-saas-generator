'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@shared/components/ui'
import { RegisterForm } from '@/app/auth/register/form'
import { LoginForm } from '@/app/auth/login/form'
import Image from 'next/image'

export default function Page() {
    const [tab, setTab] = useState('login')

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="bg-[url('/assets/background/landing.jpg')] max-2xl:hidden min-h-screen w-full flex items-center justify-center">
                <Image width={80} height={80} src="/assets/icons/logo.svg" alt="logo" />
            </div>

            <div className="w-full flex items-center justify-center p-3">
                <div className="w-full max-w-[600px] rounded-lg border bg-card p-[26px] ">
                    <Tabs   value={tab} onValueChange={setTab}>
                        <TabsList className="grid w-full grid-cols-2 max-w-[522px] mx-auto ">
                            <TabsTrigger value="login">Вход</TabsTrigger>
                            <TabsTrigger value="register">Регистрация</TabsTrigger>
                        </TabsList>
                        <TabsContents className={"px-2"} >
                        <TabsContent className={"px-2"} value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent className={"px-2"} value="register">
                            <RegisterForm />
                        </TabsContent>
                        </TabsContents>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
