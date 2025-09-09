import { FiguraGeometrica } from "./classes/figuraGeometrica";
import { Circulo } from "./classes/circulo";
import { Triangulo } from "./classes/triangulo";
import { Cuadrado } from "./classes/cuadrado";

const circulo: Circulo = new Circulo(30)
const triangulo: Triangulo = new Triangulo(100, 50)
const cuadrado: Cuadrado = new Cuadrado(300)

console.log(`El area del circulo es: ${circulo.calcularArea()}`)
console.log(`El area del triangulo es: ${triangulo.calcularArea()}`)
console.log(`El area del cuadrado es: ${cuadrado.calcularArea()}`)