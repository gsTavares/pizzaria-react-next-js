'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit, FiMenu, FiTag, FiX } from "react-icons/fi";
import { createProduct, getProducts, updateProduct } from "./actions";

type Product = {
    id: string,
    nome: string,
    categoria: string,
    descricao: string,
    preco: string,
    banner: string,
}

export default function Products() {

    const params = useSearchParams();
    const productId = params.get('productId');
    let updateProductAction;

    if (productId) {
        updateProductAction = updateProduct.bind(null, productId);
    }

    const [menuEnabled, setMenuEnabled] = useState(false);
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        }

        fetchProducts();

    }, []);

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
                        <button className="border border-red-600 rounded-xl px-4 py-2 text-red-600 w-[50%]">Logout</button>
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
                            <button className="lg:border lg:border-red-600 lg:rounded-xl lg:px-4 lg:py-2 lg:text-red-600 lg:hover:bg-red-600 lg:hover:text-white">Logout</button>
                        </div>
                    </div>
                </header>

                <section className={`bg-red-600 ${menuEnabled ? 'blur-sm' : ''} shadow-xl`}>
                    <div className="p-6 lg:px-24">
                        <div className="bg-white rounded-lg p-6">
                            <form action={productId ? updateProductAction : createProduct} className="lg:grid lg:grid-cols-4 lg:gap-x-5">
                                <header className="mb-2 pb-2 text-xl font-bold col-span-4">
                                    <p>Gerenciar Produto</p>
                                </header>
                                <div className="mt-3">
                                    <label className="block font-semibold">Nome</label>
                                    <input type="text" name="nome" required placeholder="Nome" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Categoria</label>
                                    <input type="text" name="categoria" required placeholder="Categoria" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Descrição</label>
                                    <input type="text" name="descricao" required placeholder="Descrição" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3">
                                    <label className="block font-semibold">Preço</label>
                                    <input type="text" name="preco" required placeholder="Preço" className="p-2 border-2 w-full rounded-lg" />
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <label className="block font-semibold">Foto do produto</label>
                                    <label className="block cursor-pointer mt-1 rounded-lg border-2 border-red-600 w-max p-2" htmlFor="foto">Escolher arquivo</label>
                                    <input type="file" id="foto" name="foto" accept=".png, .svg, .jpg, .jpeg" onChange={(event) => setFile(event.target.files?.[0])} className="hidden" />

                                    {
                                        file ?
                                            <img src={preview} alt={file?.name} className="w-[150px] h-[150px] mt-3" />
                                            : null
                                    }

                                </div>

                                <div className="mt-6 flex flex-col items-end pt-2 lg:col-span-4">
                                    <button type="submit" title="Salvar" className="bg-green-400 py-2 px-4 text-white font-semibold rounded-lg mt-3">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className={`${menuEnabled ? 'blur-sm' : ''} w-full overflow-x-scroll p-6 lg:flex lg:flex-col lg:items-center`}>
                    <table className="max-w-full">
                        <thead>
                            <tr>
                                <th className="min-w-[150px] border p-2">Nome</th>
                                <th className="min-w-[150px] border p-2">Categoria</th>
                                <th className="min-w-[150px] border p-2">Descrição</th>
                                <th className="min-w-[150px] border p-2">Preço</th>
                                <th className="min-w-[150px] border p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr key={product.id}>
                                    <td className="border p-2">{product.nome}</td>
                                    <td className="border p-2">{product.categoria ?? 'Não informada'}</td>
                                    <td className="border p-2">{product.descricao}</td>
                                    <td className="border p-2">{product.preco}</td>
                                    <td className="border p-2 flex items-center justify-center">
                                        <button>
                                            <FiEdit size={32} className="text-orange-500" />
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}