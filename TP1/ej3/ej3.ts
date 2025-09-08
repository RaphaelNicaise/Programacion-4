import { Empleado } from "./classes/empleado";
import { EmpleadoMedioTiempo } from "./classes/empleadoMedioTiempo";
import { EmpleadoTiempoCompleto } from "./classes/empleadoTiempoCompleto";

const empleadoMedioTiempo1: EmpleadoMedioTiempo = new EmpleadoMedioTiempo("Nico", 80000)
const empleadoTiempoCompleto1: EmpleadoTiempoCompleto = new EmpleadoTiempoCompleto("Rapha", 80000)
const empleadoMedioTiempo2: EmpleadoMedioTiempo = new EmpleadoMedioTiempo("Abner", 90000)
const empleadoTiempoCompleto2: EmpleadoTiempoCompleto = new EmpleadoTiempoCompleto("Santi", 85000)

const arregloEmpleados: Empleado[] = [empleadoMedioTiempo1, empleadoTiempoCompleto1, empleadoMedioTiempo2, empleadoTiempoCompleto2]

for (let empleado in arregloEmpleados) {
    console.log(arregloEmpleados[empleado].calcularSalario())
}