import { Animal } from './animal'

export class Zorro extends Animal {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie
    }

    public override hacerSonido(): void {
        console.log("El zorro hace su sonido.")
    }
}