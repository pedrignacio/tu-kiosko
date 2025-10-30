export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: string;
    quantity: number; // ← Cambiado de opcional a requerido
}

export interface Producto extends Product {
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl?: string;
}