'use server'

import { cookies } from "next/headers";

export const createProduct = async (formData: FormData) => {

}

export const updateProduct = async (productId: string, formData: FormData) => {

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