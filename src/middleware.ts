import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    
    const session = cookies().get('session')?.value;    

    if (!session && request.nextUrl.pathname.startsWith('/products')) {
        return Response.redirect(new URL('/login', request.url))
    }

}