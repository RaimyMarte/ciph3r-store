import { defineStore } from 'pinia';
import api from '../utils/api';
import { IProduct } from '../interfaces/product';


export const useProductStore = defineStore('products', {
    state: () => ({

    }),
    actions: {
        async fetchProducts() {
            const { data: response } = await api.get('/shop?page=2');
            return response?.data as IProduct[];
        },
        async fetchCategories() {
            console.log('first')
            // try {
            //     const { data } = await api.get('/categories');
            //     this.categories = data;
            // } catch (error) {
            //     console.log(error)
            // }

        },
        filterProducts(category: string, name: string) {
            console.log({ category, name })
        },
    },
});
