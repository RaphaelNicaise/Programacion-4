import { Animal } from "./classes/animal";
import { Pajaro } from "./classes/pajaro";
import { Zorro } from "./classes/zorro";

const pajaro: Pajaro = new Pajaro("Angie", "Cardenal")
const zorro: Zorro = new Zorro("Choco", "Pteropus")

pajaro.hacerSonido()
pajaro.volar()

zorro.hacerSonido()