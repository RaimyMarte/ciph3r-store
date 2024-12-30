import { defineStore } from 'pinia';
import api from '../utils/api';


export const useProductStore = defineStore('products', {
    state: () => ({
        products: [
            {
                "description": "",
                "id": "pair_9ef9f060777041f7bc5ec1cf36b1e683",
                "name": "name",
                "value": "Product K"
            }
        ],
        categories: [          {
            "description": "",
            "id": "pair_9ef9f060777041f7bc5ec1cf36b1e683",
            "name": "name",
            "value": "Product K"
    }],
    }),
    actions: {
        async fetchProducts() {
            const { data } = await api.get('/me');
                // const { data } = await api.get('/products');
                console.log({ data })
                this.products = data;
            

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
