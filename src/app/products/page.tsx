'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FiMenu, FiTag, FiX } from "react-icons/fi";
import { createProduct, getCategories, getProducts, logout } from "./actions";

type Product = {
    id: string,
    nome: string,
    categoria: string,
    descricao: string,
    preco: string,
    banner: string,
    url?: string,
}

type Category = {
    id: string,
    nome: string
}

export default function Products() {

    const [menuEnabled, setMenuEnabled] = useState(false);
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [productFormState, productAction] = useFormState(createProduct, []);

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    const formRef = useRef<HTMLFormElement>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(product => JSON.stringify(product).toLowerCase().includes(search.toLowerCase()))
            .slice((page - 1) * size, page * size);
    }, [products, search, page, size]);

    const getMaxPages = () => {
        return Math.ceil(products.length / size);
    }

    useEffect(() => {

        const fetchData = async () => {

            if (Array.isArray(productFormState)) {
                setFile(undefined);
                formRef.current?.reset();
            }

            const [products, categories] = await Promise.all([getProducts(), getCategories()]);
            setProducts(products);
            setCategories(categories);

        }

        fetchData();

    }, [productFormState]);

    useEffect(() => {

        const handleFileSelect = () => {

            if (!file) {
                setPreview(undefined);
                return;
            }

            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            () => URL.revokeObjectURL(objectUrl)

        }

        handleFileSelect();

    }, [file])

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
                        <span>Produtos</span>
                        <FiTag />
                    </li>
                    <li className="mt-3">
                        <form action={logout}>
                            <button className="border border-red-600 rounded-xl px-4 py-2 text-red-600 w-[50%]">Logout</button>
                        </form>
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
                        <span className="font-bold">Pizza next</span>
                    </div>
                </header>

                <header className="hidden lg:block">
                    <div className="lg:py-4 lg:px-24 lg:flex lg:items-center lg:justify-between">
                        <span className="lg:font-bold">Pizza next</span>
                        <nav>
                            <ul className="lg:flex lg:gap-10">
                                <li className="text-xl font-bold">Produtos</li>
                            </ul>
                        </nav>
                        <div>
                            <form action={logout}>
                                <button className="lg:border lg:border-red-600 lg:rounded-xl lg:px-4 lg:py-2 lg:text-red-600 lg:hover:bg-red-600 lg:hover:text-white">Logout</button>
                            </form>
                        </div>
                    </div>
                </header>

                <section className={`bg-red-600 ${menuEnabled ? 'blur-sm' : ''} max-h-[60vh] lg:max-h-[70vh]`}>
                    <div className="pt-6">
                        <div className="bg-white mt-0 rounded-lg m-6 lg:mx-24 p-6 shadow-lg">
                            <form ref={formRef} action={productAction} className="">
                                <header className="mb-2 pb-2 text-xl font-bold col-span-4">
                                    <p>Gerenciar Produto</p>
                                </header>
                                <div className="mt-3">
                                    <label className="block font-semibold">Nome</label>
                                    <input type="text" name="nome" required placeholder="Nome" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Categoria</label>
                                    <select name="id_categoria" className="p-2 border-2 w-full rounded-lg">
                                        {categories.map(category => <option key={category.id} value={category.id}>{category.nome}</option>)}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Descrição</label>
                                    <input type="text" name="descricao" required placeholder="Descrição" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Preço</label>
                                    <input type="number" name="preco" required step=".01" min={0} placeholder="Preço" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className="block font-semibold">Foto do produto</label>
                                    <label className="block cursor-pointer mt-1 rounded-lg border-2 border-red-600 w-max p-2" htmlFor="foto">Escolher arquivo</label>
                                    <input type="file" id="foto" name="file" accept=".png, .svg, .jpg, .jpeg" onChange={(event) => setFile(event.target.files?.[0])} className="hidden" />

                                    {
                                        file ?
                                            <img src={preview} alt={file?.name} className="w-[150px] h-[150px] mt-3" />
                                            : null
                                    }

                                    <div className="py-2">
                                        {productFormState.message && !file ? <p className="text-red-600">{productFormState.message}</p> : null}
                                    </div>

                                </div>

                                <div className="mt-6 flex flex-col items-end pt-2 lg:col-span-4">
                                    <button type="submit" title="Salvar" className="bg-green-400 py-2 px-4 text-white font-semibold rounded-lg mt-3">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <section className="p-6 py-3">
                        <input type="text" className="w-full border-2 p-2 rounded-lg" onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }} placeholder="Pesquisar produto..." />
                    </section>

                    <section className={`${menuEnabled ? 'blur-sm' : ''} w-full overflow-x-scroll p-6 lg:overflow-x-hidden lg:flex lg:flex-col lg:items-center bg-white`}>
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="min-w-[150px] border p-2">Nome</th>
                                    <th className="min-w-[150px] border p-2">Categoria</th>
                                    <th className="min-w-[150px] border p-2">Descrição</th>
                                    <th className="min-w-[150px] border p-2">Preço</th>
                                    <th className="min-w-[150px] border p-2">Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product =>
                                    <tr key={product.id}>
                                        <td className="border p-2">{product.nome}</td>
                                        <td className="border p-2">{product.categoria ?? 'Não informada'}</td>
                                        <td className="border p-2">{product.descricao}</td>
                                        <td className="border p-2">{product.preco}</td>
                                        <td className="border p-2 text-center">
                                            <a href={product.url} className="text-blue-600 underline" target="_blank">Ver foto</a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    <section className="p-6 flex items-center justify-center gap-10 pb-20">
                        <div className="flex items-center gap-3">
                            <span>Items por página</span>
                            <select className="rounded-lg border-2 border-zinc-200 p-2 hover:cursor-pointer" value={size} onChange={(event) => {
                                setSize(Number(event.target.value))
                                setPage(1);
                            }}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="p-2 w-[30px] rounded-lg border-2 border-zinc-200 hover:cursor-pointer disabled:opacity-50" disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>{'<'}</button>
                            <span>{page}</span>
                            <button className="p-2 w-[30px] rounded-lg border-2 border-zinc-200 hover:cursor-pointer disabled:opacity-50" disabled={page === getMaxPages()} onClick={() => setPage((prevState) => prevState + 1)}>{'>'}</button>
                        </div>
                    </section>
                </section>


            </main>
        </>
    );
}