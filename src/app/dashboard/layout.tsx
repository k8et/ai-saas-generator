import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { Sidebar } from '@/app/dashboard/sidebar'
import {db} from "@/db";
import {telegramPosts} from "@/db/schema";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export type UserPayload = {
  id: number
  email: string
}

export async function getUserFromCookie(): Promise<UserPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      id: Number(payload.sub),
      email: payload.email as string,
    }
  } catch {
    return null
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookie()
  const posts = await db.select().from(telegramPosts);
  console.log(posts,"posts")

  return (
    <div className='flex min-h-screen'>
      <Sidebar user={user}/>
      <main className='flex-1 p-6'>{children}</main>
    </div>
  )
}
