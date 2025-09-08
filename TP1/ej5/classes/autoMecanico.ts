import { Auto } from "./auto";

export class AutoMecanico extends Auto{
    private tipoCombustible: string

        constructor(
        modelo: string,
        marca: string,
        color: string,
        anio: number,
        cantidadRuedas: number,
        velocidadMaxima: number,
        encendido: boolean,
        cantidadPuertas: number,
        tipoCombustible: string
    ) {
        super(modelo, marca, color, anio, cantidadRuedas, velocidadMaxima, encendido, cantidadPuertas)
        this.tipoCombustible = tipoCombustible
    }

    public override arrancar(): void {
        console.log(`El auto mecanico a ${this.tipoCombustible}, marca ${this.marca} del año ${this.anio} arrancó.`)
    }

    public override acelerar(): void {
        console.log(`El auto mecanico, marca ${this.marca} del año ${this.anio} esta acelerando.`)
    }

    public override frenar(): void {
        console.log(`El auto mecanico, marca ${this.marca} del año ${this.anio} freno.`)
    }

    public override hacerSonido(): void {
        console.log("prrrpprprprprprprpr")
    }

    public override abrirPuertas(): void {
        console.log("El auto mecanico abrio sus puertas")
    }

    public override cerrarPuertas(): void {
        console.log("El auto mecanico cerro sus puertas")
    }

    public cargarCombustible(): void {
        console.log("El auto mecanico esta cargando combustible...")
    }
}