import { Auto } from "./auto";
import { Electrico } from "./../interfaces/electrico.interface";

export class AutoElectrico extends Auto implements Electrico {
    private tipoBateria: string
    private marcaBateria: string
    private porcentajeBateria: number

    constructor(
        modelo: string,
        marca: string,
        color: string,
        anio: number,
        cantidadRuedas: number,
        velocidadMaxima: number,
        encendido: boolean,
        cantidadPuertas: number,
        tipoBateria: string,
        marcaBateria: string,
    ) {
        super(modelo, marca, color, anio, cantidadRuedas, velocidadMaxima, encendido, cantidadPuertas)
        this.tipoBateria = tipoBateria
        this.marcaBateria = marcaBateria
        this.porcentajeBateria = 100
    }

    public override arrancar(): void {
        console.log(`El auto electrico, marca ${this.marca} del año ${this.anio} arrancó. Su bateria de tipo ${this.tipoBateria} marca ${this.marcaBateria} comenzo a descargarse.`)
    }

    public override acelerar(): void {
        console.log(`El auto electrico, marca ${this.marca} del año ${this.anio} esta acelerando.`)
    }

    public override frenar(): void {
        console.log(`El auto electrico, marca ${this.marca} del año ${this.anio} freno.`)
    }

    public override hacerSonido(): void {
        console.log("tzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    }

    public override abrirPuertas(): void {
        console.log(`El auto electrico ${this.marca} ${this.modelo} abrio sus puertas`)
    }

    public override cerrarPuertas(): void {
        console.log(`El auto electrico ${this.marca} ${this.modelo} cerro sus puertas`)
    }

    public bateriaCompleta(): boolean {
        if (this.porcentajeBateria < 100) { return false }
        return true
    }

    public cargarBateria(carga: number): void {
        console.log(`El auto electrico ${this.marca} ${this.modelo} se cargó, en este momento esta cargado al ${carga}%`)
    }

    public obtenerPorcentajeBateria(): number {
        return this.porcentajeBateria
    }

    public obtenerTipoBateria(): string {
        return this.tipoBateria
    }

    public obtenerMarcaBateria(): string {
        return this.marcaBateria
    }
}