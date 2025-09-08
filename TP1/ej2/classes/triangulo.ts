import { FiguraGeometrica } from "./figuraGeometrica";

export class Triangulo extends FiguraGeometrica {
    constructor (nombre: string) {
        super(nombre)
    }

    public override calcularArea():number {
        return 1
    }
}