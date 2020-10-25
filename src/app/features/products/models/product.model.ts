export interface Product{
    id: number;
    name: string;
    price: number;
    inCart: boolean;
    imgSrc: string;
    quantity?: number;
}
