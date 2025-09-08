import { Vehiculo } from "./vehiculo";

export abstract class Auto extends Vehiculo {
    constructor(
        modelo: string,
        marca: string,
        color: string,
        anio: number,
        cantidadRuedas: number,
        velocidadMaxima: number,
        encendido: boolean,
        cantidadPuertas: number
    ) {
        super(modelo,marca,color,anio,cantidadRuedas,velocidadMaxima,encendido)
        this.cantidadRuedas = cantidadPuertas
    }

    abstract abrirPuertas(): void
    abstract cerrarPuertas(): void
}