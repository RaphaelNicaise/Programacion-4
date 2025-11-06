"use cliente";
import React, { useEffect, useState } from 'react';

type Producto = {
  id: number;
  titulo: string;
  precio: number;
};

const Pedido: React.FC = () => {
  const [productosDisponibles, setProductosDisponibles] = useState<Producto[]>([])
  const [pedido, setPedido] = useState<Producto[]>([])
  const [confirmado, setConfirmado] = useState(false)
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost/api/menu')
        if (!res.ok) {
          throw new Error('Error al cargar menu')
        }
        const data = await res.json()
        setProductosDisponibles(data)
      } catch (error) {
        console.log(`Error: ${error}`)
        setError(true);
      }
    };
    fetchProductos();
  }, []);

  const agregarProducto = (producto: Producto) => {
    setPedido((prev) => [...prev, producto])
  };

  const eliminarProducto = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPedido((prev) => prev.filter((p) => p.id !== id))
  };

  const enviarPedido = async () => {
    try {
      const res = await fetch('http://localhost/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
      })

      if (res.ok) {
        setConfirmado(true);
        setPedido([]);
      }
    } catch (error) {
      console.log('Error al enviar pedido:', error)
    }
  };

  const total = pedido.reduce((acc, p) => acc + p.precio, 0)

  return (
    <div>
      <h2>Productos disponibles</h2>
      {error ? (
        <p>Error al cargar menú</p>
      ) : productosDisponibles.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {productosDisponibles.map((producto) => (
            <li key={producto.id}>
              {producto.titulo} - ${producto.precio}
              <button onClick={() => agregarProducto(producto)}>Agregar</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Tu pedido</h2>
      {pedido.length === 0 ? (
        <p>No hay productos en el pedido</p>
      ) : (
        <ul role="list">
          {pedido.map((producto) => (
            <li key={producto.id}>
              {producto.titulo} - ${producto.precio}
              <button onClick={(e) => eliminarProducto(producto.id, e)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      <p>Total: ${total}</p>

      <button onClick={enviarPedido} disabled={pedido.length === 0}>
        Enviar pedido
      </button>

      {confirmado && <p>Pedido confirmado</p>}
    </div>
  );
};

export default Pedido;
