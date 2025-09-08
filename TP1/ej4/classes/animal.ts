export abstract class Animal {
    protected nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre
    }

    abstract hacerSonido(): void
}