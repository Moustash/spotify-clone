import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({req, secret: process.env.JWT_SECRET})
  const {pathname } = req.nextUrl

  if(token && pathname === '/login'){
    return NextResponse.redirect('/');
  }

  //if user wants to sign in
  if(pathname.includes('/api/auth') || token){
      return NextResponse.next();
  }

  //redirect to login if there is no token, and are requesting a protected route
  if(!token && pathname !== '/login'){
      return NextResponse.redirect('/login');
  }

}