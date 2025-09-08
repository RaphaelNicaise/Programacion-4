export interface Electrico {
    obtenerTipoBateria(): string;
    obtenerMarcaBateria(): string;
    obtenerPorcentajeBateria(): number;
    bateriaCompleta(): boolean,
    cargarBateria(carga:number): void,
}