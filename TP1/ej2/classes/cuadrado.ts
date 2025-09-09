import { FiguraGeometrica } from "./figuraGeometrica";

export class Cuadrado extends FiguraGeometrica {
    private longitudLado: number
    constructor (longitudLado: number) {
        super()
        this.longitudLado = longitudLado
    }

    public override calcularArea(): number {
        return Math.pow(this.longitudLado, 2)
    }
}