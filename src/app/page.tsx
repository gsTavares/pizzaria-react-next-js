'use client';

import Link from 'next/link';
import { useState } from "react";
import { FiInfo, FiLayers, FiMenu, FiUsers, FiX } from "react-icons/fi";

export default function Home() {

  const [menuEnabled, setMenuEnabled] = useState(false);

  return (
    <>
      <nav className={`fixed w-[80vw] lg:hidden min-h-screen top-0 -translate-x-full ${menuEnabled ? 'translate-x-0' : ''} transition-transform ease-in-out duration-700 z-10 bg-white`}>
        <ul className="p-3 flex flex-col gap-3">
          <li className="flex pb-3" onClick={() => {
            setMenuEnabled(false);
          }}>
            <span className="text-xl font-bold">Navegação</span>
            <FiX className="ms-auto" size={25} />
          </li>
          <li className="text-lg rounded-lg p-2 bg-red-500 font-semibold text-white flex items-center justify-between">
            <span>Serviços</span>
            <FiLayers />
          </li>
          <li className="text-lg rounded-lg p-2 bg-red-500 font-semibold text-white flex items-center justify-between">
            <span>Novidades</span>
            <FiInfo />
          </li>
          <li className="text-lg rounded-lg p-2 bg-red-500 font-semibold text-white flex items-center justify-between">
            <span>Sobre nós</span>
            <FiUsers />
          </li>
          <li className="mt-3">
            <Link href={'/login'} className="flex justify-center">
              <button className="border border-red-600 rounded-xl px-4 py-2 text-red-600 w-[50%]">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <header className="lg:hidden">
          <div className={`p-4 flex items-center justify-between ${menuEnabled ? 'blur-sm' : ''}`}>
            <button onClick={() => {
              setMenuEnabled(true);
            }}>
              <FiMenu size={25} />
            </button>

            <Link href={'/'}>
              <span className="font-bold">Pizza next</span>
            </Link>
          </div>
        </header>

        <header className="hidden lg:block">
          <div className="lg:py-4 lg:px-24 lg:flex lg:items-center lg:justify-between">
            <Link href={'/'}>
              <span className="lg:font-bold">Pizza next</span>
            </Link>
            <nav>
              <ul className="lg:flex lg:gap-10">
                <li className="lg:cursor-pointer">Serviços</li>
                <li className="lg:cursor-pointer">Novidade</li>
                <li className="lg:cursor-pointer">Sobre nós</li>
              </ul>
            </nav>
            <div>
              <Link href={'/login'}>
                <button className="lg:border lg:border-red-600 lg:rounded-xl lg:px-4 lg:py-2 lg:text-red-600 lg:hover:bg-red-600 lg:hover:text-white">Login</button>
              </Link>
            </div>
          </div>
        </header>

        <section className={`bg-red-600 ${menuEnabled ? 'blur-sm' : ''}`}>
          <div className="p-6 lg:px-24 lg:grid lg:grid-cols-6 lg:items-center">
            <div className="lg:col-span-3">
              <h1 className="font-semibold text-4xl text-white">Mudando a forma de como você gerencia seus <span className="text-black">pedidos</span></h1>
              <small className="block text-lg opacity-75 text-white mt-6">Apresentamos um sistema completo capaz de acompanhar o progresso dos pedidos desde a mesa do cliente até a cozinha.</small>
              <Link href={'/login'}>
                <button className="mt-10 mb-12 text-white rounded-lg border border-white px-4 py-2">Começar</button>
              </Link>
            </div>
            <div className="lg:col-span-3 lg:flex lg:items-center lg:justify-center text-white">
              imagem_aqui
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white shadow-2xl rounded-lg m-4 p-6 divide-y-2 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:divide-y-0 lg:shadow-none">
            <p className="font-bold text-xl pb-2 lg:col-span-3 lg:text-center lg:pb-10">Principais vantagens do Pizza Next</p>
            <div className="pt-3 lg:shadow-2xl">
              <h2 className="text-lg font-semibold lg:px-4">Praticidade</h2>
              <p className="pt-1 pb-2 lg:px-4">Com poucos clicks, é possível criar e acompanhar pedidos criados pelo cliente do início ao fim</p>
            </div>
            <div className="pt-3 lg:shadow-2xl">
              <h2 className="text-lg font-semibold lg:px-4">Velocidade</h2>
              <p className="pt-1 pb-2 lg:px-4">Otimizamos o processo de criação de comandas utilizando as melhores tecnologias para este tipo de cenário</p>
            </div>
            <div className="pt-3 lg:shadow-2xl">
              <h2 className="text-lg font-semibold lg:px-4">Segurança</h2>
              <p className="pt-1 lg:px-4">Quanto aos seus dados, fique tranquilo. Utilizamos uma criptografia personalizada para garantir a sua integridade e de seus clientes</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
