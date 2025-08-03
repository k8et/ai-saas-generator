import { NextResponse } from 'next/server'
import {appRoutes} from "@shared/constants/appRoutes";

export async function GET() {
  return NextResponse.redirect(new URL(appRoutes.TELEGRAM_ROUTE, process.env.BASE_URL))
}
