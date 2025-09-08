export abstract class FiguraGeometrica {
    protected nombre: string;

    constructor(nombre:string) {
        this.nombre = nombre
    }

    abstract calcularArea(): number
}