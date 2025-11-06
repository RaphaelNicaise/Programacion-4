// src/stest/TodoApp.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { server } from './mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import Pedido from '../Components/Pedido';
import Menu from '../Components/Menu'


describe('Menu Tests', () => {
  
  test('HU1 — Visualización inicial del menu', async () => {
    render(<Menu />)
    expect(await screen.findByText(/Cafe/i)).toBeInTheDocument()
  })

  test('HU2 — Agregar ítem al pedido', async () => {
    render(<Pedido />);

    const botonAgregar = await screen.findByRole('button', { name: /agregar/i })
    userEvent.click(botonAgregar)

    const itemsPedido = screen.getAllByRole('listitem')
    expect(itemsPedido.length).toBe(1)
  })

  test('HU3 — Calcular total del pedido', async () => {
    render(<Pedido />);
    const botones = await screen.findAllByRole('button', { name: /agregar/i })

    userEvent.click(botones[0])
    userEvent.click(botones[1])

    expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument();
  })

  test('HU4 — Eliminar ítem del pedido', async () => {
    render(<Pedido />);

    const botonAgregar = await screen.findByRole('button', { name: /agregar/i })
    userEvent.click(botonAgregar);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    });

    const botonEliminar = screen.getByRole('button', { name: /eliminar/i })
    userEvent.click(botonEliminar)

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument()
    });

    expect(screen.getByText(/no hay productos en el pedido/i)).toBeInTheDocument()
  })

  test('HU5 — Enviar pedido y confirmar', async () => {
    render(<Pedido />);

    const botonesAgregar = await screen.findAllByRole('button', { name: /agregar/i })
    userEvent.click(botonesAgregar[0])
    userEvent.click(botonesAgregar[1])

    const botonEnviar = screen.getByRole('button', { name: /enviar pedido/i })
    userEvent.click(botonEnviar);

    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument()
    });

    expect(screen.getByText(/no hay productos en el pedido/i)).toBeInTheDocument()
  })

  test('HU6 — Mostrar mensaje si el menú está vacío', async () => {
    server.use(
      rest.get('http://localhost/api/menu', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
      })
    );

    render(<Pedido />);
    await waitFor(() => {
      expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument()
    })
  })
})



