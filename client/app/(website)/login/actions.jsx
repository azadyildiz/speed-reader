'use server'
 
import { cookies } from 'next/headers'
 
async function setCookie(data) {
  cookies().set({
    name: 'token',
    value: data,
    httpOnly: true,
    path: '/',
  })
}

export default setCookie;