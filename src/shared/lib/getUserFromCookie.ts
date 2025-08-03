import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

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
