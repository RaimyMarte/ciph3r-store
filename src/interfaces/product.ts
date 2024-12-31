import { ICategory } from "./category"
import { IUser } from "./user"

export interface IProduct {
    id: number
    uuid: string
    name: string
    resumen: string
    description: string
    sku: string
    nmp: string
    width: string
    height: string
    weight: string
    lenght: string
    depth: string
    price: string
    make_offer: number
    user: IUser
    brands: any[]
    offers: any[]
    categories: ICategory[]
    colors: any[]
    image: any
    images: any[]
    stock: number
    status: number
    cart: number
    favorite: number
}