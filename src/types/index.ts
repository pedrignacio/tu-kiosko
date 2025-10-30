export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    quantity: number;
    created_at?: string; // ← AGREGAR ESTO
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Producto extends Product {
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl?: string;
}