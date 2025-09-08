import { Empleado } from "./empleado";

export class EmpleadoTiempoCompleto extends Empleado {
    constructor(nombre: string, salarioBase:number) {
        super(nombre,salarioBase)
    }

    public override calcularSalario(): number {
        return this.salarioBase += 20000
    }
}