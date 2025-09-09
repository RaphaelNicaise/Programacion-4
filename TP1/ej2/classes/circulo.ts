import { FiguraGeometrica } from "./figuraGeometrica"; 

export class Circulo extends FiguraGeometrica {
    private diametro:number

    constructor(diametro: number ){
        super()
        this.diametro = diametro
    }
    
    public override calcularArea(): number {
        const radio = this.diametro / 2
        return Math.PI * Math.pow(radio,2)
    }
}