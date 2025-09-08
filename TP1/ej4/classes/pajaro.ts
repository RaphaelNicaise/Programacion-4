import { Animal } from "./animal"
import { Volador } from "./../interfaces/interface.volador"

export class Pajaro extends Animal implements Volador {
    private especie: string

    constructor(nombre: string, especie: string) {
        super(nombre)
        this.especie = especie
    }

    public override hacerSonido(): void {
        console.log ("El pajaro hace su sonido.")
    }

    public volar(): void {
        console.log ("El pajaro esta volando.")
    }
}