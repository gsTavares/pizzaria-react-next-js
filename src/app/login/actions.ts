'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (prevState: any, formData: FormData) => {

    const loginRequest = {
        email: formData.get('email'),
        senha: formData.get('senha')
    }

    const loginResponse = await fetch('http://localhost:3333/session', {
        method: 'POST',
        body: JSON.stringify(loginRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const sessionData = await loginResponse.json();

    if (loginResponse.status === 200) {
        
        cookies().set('session', sessionData.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            secure: false,
            path: '/'
        });

        redirect('/products');
        
    } else {
        return {
            message: sessionData.error
        };
    }

}