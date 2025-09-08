import { FiguraGeometrica } from "./figuraGeometrica"; 

export class Circulo extends FiguraGeometrica {
    constructor(nombre:string){
        super(nombre)
    }
    
    public override calcularArea(): number {
        return 1
    }
}