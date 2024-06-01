'use server'

import { cookies } from "next/headers";

export const createProduct = async (prevState: any, formData: FormData) => {

    const session = cookies().get('session');

    console.log(formData.get('file'));

    if((formData.get('file') as File).size === 0) {
        return {message: 'Por favor, selecione a foto do produto'}
    }

    await fetch('http://localhost:3333/product', {
        cache: 'no-store',
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${session?.value}`
        }
    });

    return await getProducts();
    
}

export const getProducts = async () => {

    const session = cookies().get('session');

    const products = await fetch('http://localhost:3333/product/category', {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.value}`
        }
    });

    const data = await products.json();
    return data;

}

export const getCategories = async () => {

    const session = cookies().get('session');

    const products = await fetch('http://localhost:3333/categories', {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.value}`
        }
    });

    const data = await products.json();
    return data;

}