'use client';

import { FormEvent, useState } from "react";
import { pizzaria_api } from "../services/util/pizzaria-api";

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (formEvent: FormEvent) => {

        formEvent.preventDefault();

        const loginRequest = {
            email: email,
            senha: senha
        }

        const loginResponse = await pizzaria_api.post('/session', loginRequest);

        console.log(loginResponse);

    }

    return (
        <div className="min-h-[100vh] grid lg:grid-cols-5 bg-red-600">
            <div className="flex flex-col items-center lg:justify-center lg:col-span-2 px-5 text-white my-10">
                <h2 className="text-center my-10 text-4xl font-semibold">
                    Não possui uma conta?!
                </h2>
                <small className="block text-center text-[1.1rem]">
                    Registre-se agora para acessar ofertas exclusivas, personalizar seus pedidos favoritos e ganhar recompensas deliciosas.
                </small>
                <div className="mt-10">
                    <button className="border border-white rounded-xl px-3 py-2 font-semibold hover:bg-white hover:text-black transition-colors" title="Criar conta">Criar conta</button>
                </div>
            </div>
            <form onSubmit={(event) => handleLogin(event)} className="h-[100%] rounded-sm flex flex-col items-center bg-white -order-1 lg:justify-center lg:order-1 lg:bg-gradient-to-b lg:col-span-3 p-5">
                <h2 className="mb-2 font-semibold text-4xl">Login</h2>
                <small className="block text-center text-[1.1rem] opacity-40 mb-5">
                    digite seu e-mail e senha cadastrados para acessar o sistema
                </small>
                <div className="w-full flex flex-col px-10 lg:max-w-[50%]">
                    <input type="email" className="p-3 rounded-sm text-black bg-zinc-100" placeholder="E-mail"
                    onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="mt-4 w-full flex flex-col px-10 lg:max-w-[50%]">
                    <input type="password" className="p-3 rounded-sm text-black bg-zinc-100" placeholder="Senha"
                    onChange={(event) => setSenha(event.target.value)} />
                </div>

                <div className="mt-4 w-full flex flex-col items-center px-10 lg:max-w-[50%]">
                    <button className="bg-green-400 p-2 rounded-sm w-full text-white font-semibold mb-6 hover:bg-green-600 transition-colors" title="Entrar">Entrar</button>

                    <small>Projeto pizzaria © 2024</small>
                </div>
            </form>
        </div>
    );
}