import { supabase } from "@/lib/supabase";
import { NextResponse } from 'next/server'

export async function middleware(req) {
//   const { data: { session } } = await supabase.auth.getSession()

//   if (!session && req.nextUrl.pathname.startsWith('/test')) {
//     return NextResponse.redirect(new URL('/test-login', req.url))
//   }

  return NextResponse.next()
}

export const config = {
  matcher: ['/test/:path*'],
}