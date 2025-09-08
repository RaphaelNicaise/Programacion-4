import { Animal } from '../interfaces/interface.animal'

export class Perro implements Animal {
    
    hacerSonido(): void {
        console.log("Guau!")
    }

    moverse(): void {
        console.log("El perro corre")
    }
}

