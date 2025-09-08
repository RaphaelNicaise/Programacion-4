import { Vehiculo } from "./vehiculo"

export class Moto extends Vehiculo{
    private cilindrada: number

    constructor(
        modelo: string,
        marca: string,
        color: string,
        anio: number,
        cantidadRuedas: number,
        velocidadMaxima: number,
        encendido: boolean,
        cilindrada: number
    ) {
        super(modelo,marca,color,anio,cantidadRuedas,velocidadMaxima,encendido)
        this.cilindrada = cilindrada
    }

    public override arrancar(): void {
        console.log(`La moto ${this.marca} ${this.modelo} ${this.cilindrada}cc  del año ${this.anio} arrancó.`)
    }

    public override acelerar(): void {
        console.log(`La moto ${this.marca} ${this.modelo} ${this.cilindrada}cc del año ${this.anio} esta acelerando.`)
    }

    public override frenar(): void {
        console.log(`La moto ${this.marca} ${this.modelo} ${this.cilindrada}cc del año ${this.anio} freno.`)
    }

    public override hacerSonido(): void {
        console.log("beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    }

    public hacerWilly(): void {
        console.log(`La moto ${this.marca} ${this.modelo} ${this.cilindrada}cc del año ${this.anio} esta haciendo Willie.`)
    }
}