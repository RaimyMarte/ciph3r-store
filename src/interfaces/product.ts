export interface IProduct {
    id: string;
    name: string;
    resumen: string;
    price: string;
    sku: string;
    stock: number;
    image: string | null;
    user?: {
        rating: number;
    };
}