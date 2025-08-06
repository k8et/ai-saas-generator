import { getUserFromCookie } from '@shared/lib/getUserFromCookie'
import { NextResponse } from 'next/server'

export async function GET() {
    const user = await getUserFromCookie()
    return NextResponse.json(user)
}
