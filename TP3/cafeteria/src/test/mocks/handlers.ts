import { rest } from 'msw';

// Definimos los manejadores de las peticiones que queremos interceptar
export const handlers = [
  // Intercepta peticiones GET a '/api/tasks'
  rest.get('http://localhost/api/menu', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { 
          id: 1,
          titulo: 'Cafe Expresso',
          precio: 2500 
        },
      ]),
      ctx.delay(150)
    );
  }),
  rest.post('http://localhost/api/orders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ mensaje: 'Pedido confirmado' }),
      ctx.delay(200)
    );
  }),
];