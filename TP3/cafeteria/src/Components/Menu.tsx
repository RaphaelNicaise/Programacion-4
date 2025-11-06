"use cliente";
import React from 'react'
import { useEffect, useState } from 'react';
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  titulo: z.string().min(2),
  precio: z.number().positive(),
})
const ProductsSchema = z.array(ProductSchema)

type Producto = {
    id: number,
    titulo: string,
    precio: number
}

const Menu: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    const fetchProductos = async () => {
        try {
            const response = await fetch("http://localhost/api/menu");
            const data = await response.json()
            const productosValidados = ProductsSchema.parse(data);
            setProductos(productosValidados);
        } catch (error) {
            console.log(`Error al cargar el menu: ${error}`)
        }
    }

    useEffect(() => {
        fetchProductos()
    }, [])
    
    
    return (
        <div>
            <ul>
            {
            productos.map((producto, index) => (
                <li key={index}> {producto.titulo} - {producto.precio} </li> 
            ))
            }
            </ul>
        </div>
    )
};

export default Menu;