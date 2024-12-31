import { defineStore } from 'pinia';
import { ICategory, IProduct } from '../interfaces/';
import { api } from '../utils/';

interface FilterProductsProps {
    categoryUuid: string
    search: string
}

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [] as IProduct[],
        categories: [] as ICategory[],
        filteredProducts: [] as IProduct[],
        filtersActive: false,
    }),
    actions: {
        async fetchProducts() {
            const { data: response } = await api.get('/shop');

            this.products = response?.data as IProduct[]
            this.categories = response?.filters?.categories as ICategory[]
        },

        filterProducts({ categoryUuid, search }: FilterProductsProps) {
            let filteredProducts = [...this.products];

            if (!categoryUuid && !search)
               return this.filtersActive = false

            if (categoryUuid) {
                filteredProducts = filteredProducts.filter(product =>
                    product.categories.some(category => category.uuid === categoryUuid)
                );
            }

            if (search) {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            this.filteredProducts = filteredProducts;
            this.filtersActive = true
        },
    },
});
