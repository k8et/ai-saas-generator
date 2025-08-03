import { ReactNode } from 'react'
import { Sidebar } from '@/app/dashboard/sidebar'
import {db} from "@/db";
import {telegramPosts} from "@/db/schema";
import {getUserFromCookie} from "@shared/lib/getUserFromCookie";

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
