# Preguntas de teoría
### 1. Explique el ciclo Rojo → Verde → Refactor y por qué es importante el tamaño de los pasos. 

El ciclo TDD se basa en tres etapas: primero se escribe un test que falla (rojo), después se implementa lo mínimo para que pase (verde) y finalmente se mejora el código sin romper los tests (refactor). Este proceso ayuda a detectar errores rápido y mantener un diseño limpio.
Dar pasos chicos es importante porque evita problemas, hace más fácil encontrar fallas y permite avanzar con seguridad, sin tener que revisar grandes bloques de código cuando algo sale mal.

### 2. Diferencie tests unitarios, de integración y E2E en APIs.
Los tests unitarios validan funciones o métodos individuales, sin depender de otros módulos.
Los tests de integración prueban cómo interactúan varias partes juntas (por ejemplo, rutas + servicios + middlewares).
Los tests E2E (end-to-end) cubren todo el flujo del sistema, desde la entrada hasta la salida, simulando el uso real de la aplicación, como vimos con PlayWright en la teoría.
En este TP usamos tests unitarios para la lógica del servicio y de integración con Supertest para probar los endpoints HTTP.

### 3. ¿Qué es un doble de prueba? Defina mock, stub y spy y cuándo conviene cada uno. 
Un doble de prueba reemplaza un componente real durante un test.
Mock simula un módulo completo y permite verificar llamadas o comportamientos, stub devuelve un valor fijo o respuesta simulada, sin lógica, y spy observa una función real para ver cuántas veces se llamó o con qué parámetros. A mock conviene usarlo cuando hay que testear la interacción entre componentes, sin ejecutar la logica. El stub conviene usarlo cuando se necesita que una función siempre devuelva algo predecible (por ejemplo, evitar llamadas a una API o una base de datos) y los spies cuando cuando se necesite tanto verificar llamadas y controlar respunestas.

Se usan para aislar dependencias externas y probar el comportamiento real del código sin afectar el entorno.
### 4. ¿Por qué es útil separar app de server? Muestre (en 8–10 líneas) un ejemplo mínimo con makeApp() y un test de integración con Supertest.
Separar la aplicación del servidor permite testear sin levantar un puerto real. La función makeApp() devuelve la aplicación Express configurada, y server.ts solo se encarga de escuchar.
Por una parte en el archivo app.ts:
```bash
import express from 'express';
import { makeOrdersRouter } from './routes/orders.js';
import { errorHandler } from './middleware/errors.js';
import { OrdersService } from './services/ordersService.js';
export function makeApp() {
  const app = express()
  app.use(express.json())
  const service = new OrdersService()
  app.use('/orders', makeOrdersRouter(service))
  app.use(errorHandler)
  return app
}
```
Por otra parte en order.routes.test.ts
```bash
import request from 'supertest'
import { makeApp } from '../../src/app.js'

test('GET /orders?status=delivered filtra por estado', async () => {
  const app = makeApp()
  const res = await request(app).get('/orders').query({ status: 'delivered' })
  expect(res.status).toBe(200)
})
```
### 5. Zod: diferencia entre parse y safeParse. ¿Dónde usaría cada uno en una ruta Express y por qué? 
parse() tira un error si los datos son inválidos, mientras que safeParse() devuelve un objeto exitosamente o un error sin lanzar una excepción.
En Express se usa safeParse() en los middlewares para manejar los errores sin romper la ejecución.

### 6. Dé dos ejemplos de reglas de dominio que deben probarse con tests unitarios(no sólo validación de entrada). 
Ejemplo 1:No permitir cancelar un pedido entregado (OrdersService.cancel() debe lanzar error).
Ejemplo 2:Calcular el total según el tamaño y toppings (OrdersService.calcPrice() debe devolvernos el monto correcto).
Ambas deben testearse sin necesidad de usar endpoints.
### 7. ¿Qué malos olores suele haber en suites de tests? Dé 3 ejemplos (naming, duplicación,  asserts débiles, mocks frágiles, etc.). 
Ejemplo 1:Nombres poco claros, como “endpoint” o “testasd”. Los buenos tests explican lo que hacen.
Ejemplo 2:Duplicación de código en varios tests. Se soluciona con helpers o setup compartido.
Ejemplo 3: Asserts débiles, por ejemplo, solo verificar que “no tira error” en lugar de validar el resultado esperado.
También es común usar mocks innecesarios o probar detalles internos en vez de comportamiento.
## 8) Cómo trazar criterios de aceptación ↔ tests (mini tabla)
Un ejemplo de nuestro de nuestro tp
| ID   | Criterio / Caso                                   | Test asociado |
|------|----------------------------------------------------|---------------|
| CA1 | Crear un pedido válido devuelve 201           | `tests/integration/orders.routes.test.ts` → *crear un pedido válido* |
| CA5 | Cancelar pedido entregado devuelve 409 (Error) | `tests/integration/orders.routes.test.ts` → *cancelar entregado* |

### 9. ¿Por qué no perseguir 100% de cobertura a toda costa? Mencione riesgos limitaciones.
Tener 100% de cobertura no significa tener buenos tests. Es mejor cubrir los flujos importantes y las reglas del negocio de un proyecto.
Forzar tests solo para aumentar el porcentaje puede generar un codigo no escalable y complicado de mantener. Lo importante es que los tests aporten valor y nos salven errores importantes.

### 10. Defina y dé un ejemplo de helper/builder para tests.
Un helper o builder es una función o utilidad que se usa en los tests para crear datos de prueba de forma rápida y consistente.
Un ejemplo en nuestro proyecto
```bash
export function makeOrder(overrides = {}) {
  return {
    size: 'M',
    toppings: ['jamon'],
    items: ['napolitana'],
    address: 'Belgrano 123, Bahia Blanca',
    ...overrides
  }
}
```
Y en los tests podemos hacer :
```bash
const pedido = makeOrder(
    { 
        size: 'L' 
    }
    );
const result = service.create(pedido);
```