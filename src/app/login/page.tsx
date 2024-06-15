'use client';

import { login } from "./actions";
import { useFormState, useFormStatus } from 'react-dom';
import { FiArrowLeft } from "react-icons/fi";
import Link from 'next/link';
import { useState } from "react";

const initialState = {
    message: '',
}

export default function Login() {

    const { pending } = useFormStatus();
    const [loginState, loginAction] = useFormState(login, initialState);
    const [register, setRegister] = useState(false);

    return (
        <div className="min-h-[100vh] grid lg:grid-cols-5 bg-red-600">
            <div className="flex flex-col items-center lg:justify-center lg:col-span-2 px-5 text-white my-10">
                <h2 className="text-center my-10 text-4xl font-semibold">
                    {register ? 'Já possui uma conta?!' : 'Não possui uma conta?!'}
                </h2>
                <small className="block text-center text-[1.1rem]">
                    {register ? 'Entre e comece a gerenciar seus produtos!' : 'Registre-se agora para acessar ofertas exclusivas, personalizar seus pedidos favoritos e ganhar recompensas deliciosas.'}
                </small>
                <div className="mt-10">
                    <button className="border border-white rounded-xl px-3 py-2 font-semibold hover:bg-white hover:text-black transition-colors" title="Criar conta"
                        onClick={() => setRegister(!register)}>{register ? 'Fazer login' : 'Criar conta'}</button>
                    <Link href={'/'}>
                        <div className="text white mt-10 text-center flex items-center justify-center gap-3">
                            <FiArrowLeft />
                            Voltar
                        </div>
                    </Link>
                </div>
            </div>
            <form action={loginAction} className="h-[100%] rounded-sm flex flex-col items-center bg-white -order-1 lg:justify-center lg:order-1 lg:bg-gradient-to-b lg:col-span-3 p-5">
                <h2 className="mb-2 font-semibold text-4xl">{ register ? 'Cadastro' : 'Login' }</h2>
                <small className="block text-center text-[1.1rem] opacity-40 mb-5 w-auto lg:max-w-[350px]">
                    {register ? 'precisamos de algumas informações para criar sua conta' : 'digite seu e-mail e senha cadastrados para acessar o sistema'}
                </small>
                <div className="w-full flex flex-col px-10 lg:max-w-[50%]">
                    <input type="email" name="email" required className="p-3 rounded-sm text-black bg-zinc-100" placeholder="E-mail" />
                </div>

                {register ? <div className="mt-4 w-full flex flex-col px-10 lg:max-w-[50%]">
                    <input type="text" name="nome" required className="p-3 rounded-sm text-black bg-zinc-100" placeholder="Nome" />
                </div> : null}

                <div className="mt-4 w-full flex flex-col px-10 lg:max-w-[50%]">
                    <input type="password" name="senha" required className="p-3 rounded-sm text-black bg-zinc-100" placeholder="Senha" />
                </div>

                <div className="mt-4 w-full flex flex-col items-center px-10 lg:max-w-[50%]">
                    <button type="submit" disabled={pending} className="bg-green-400 disabled:opacity-50 p-2 rounded-sm w-full text-white font-semibold mb-6 hover:bg-green-600 transition-colors" title="Entrar">Entrar</button>
                    <div className="py-3">
                        {loginState?.message}
                    </div>
                    <small>Projeto pizzaria © 2024</small>
                </div>
            </form>
        </div>
    );
}