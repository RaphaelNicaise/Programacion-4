export abstract class Vehiculo {
    protected modelo: string;
    protected marca: string;
    protected color: string;
    protected anio: number;
    protected cantidadRuedas: number;
    protected velocidadMaxima: number;
    protected encendido: boolean;

    constructor(
        modelo: string,
        marca: string,
        color: string,
        anio: number,
        cantidadRuedas: number,
        velocidadMaxima: number,
        encendido: boolean
    ) {
        this.modelo = modelo
        this.marca = marca
        this.color = color
        this.anio = anio
        this.cantidadRuedas = cantidadRuedas
        this.velocidadMaxima = velocidadMaxima
        this.encendido = encendido
    }

    abstract arrancar(): void
    abstract acelerar(): void
    abstract frenar(): void
    abstract hacerSonido(): void
}