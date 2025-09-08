import { AutoElectrico } from "./classes/autoElectrico";
import { AutoMecanico } from "./classes/autoMecanico";
import { Moto } from "./classes/moto";

const autoElectrico: AutoElectrico = new AutoElectrico("Tesla", "SpaceX", "Azul", 2025, 4, 230, false, 4, "Litio", "LitioForm")
const autoMecanico: AutoMecanico = new AutoMecanico("Focus", "Ford", "Negro", 2005, 4, 200, true, 4, "Gasoil")
const moto: Moto = new Moto("Ninja", "Kawazaki", "Azul", 2015, 2, 240, false, 1000)

moto.acelerar()
moto.arrancar()
moto.frenar()
moto.hacerSonido()
moto.hacerWilly()
console.log("-------------------------------------------------------------------------------------")
autoElectrico.acelerar()
autoElectrico.arrancar()
autoElectrico.frenar()
autoElectrico.hacerSonido()
autoElectrico.obtenerPorcentajeBateria()
if (autoElectrico.bateriaCompleta()) {
    console.log("El auto electrico tiene la bateria completa")
} else {
    console.log("El auto electrico no tiene la bateria completa")
}
autoElectrico.cargarBateria(30)
autoElectrico.abrirPuertas()
autoElectrico.cerrarPuertas()
autoElectrico.obtenerMarcaBateria()
autoElectrico.obtenerTipoBateria()
console.log("-------------------------------------------------------------------------------------")
autoMecanico.acelerar()
autoMecanico.arrancar()
autoMecanico.frenar()
autoMecanico.hacerSonido()
autoMecanico.cargarCombustible()
autoMecanico.abrirPuertas()
autoMecanico.cerrarPuertas()
