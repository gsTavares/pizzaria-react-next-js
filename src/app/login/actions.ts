'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (prevState: any, formData: FormData) => {

    const loginRequest = {
        email: formData.get('email'),
        senha: formData.get('senha'),
        nome: formData.get('nome')
    }

    if (loginRequest.nome && loginRequest.nome !== '') {
        const registerResponse = await fetch('http://localhost:3333/user', {
            method: 'POST',
            body: JSON.stringify(loginRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const registerData = await registerResponse.json();

        if (registerResponse.status === 200) {

            return await doLogin(loginRequest);

        } else {

            return {
                message: registerData.error
            };

        }

    } else {

        return await doLogin(loginRequest);

    }

}

const doLogin = async (loginRequest: any) => {

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