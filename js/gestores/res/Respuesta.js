export class Respuesta{
    #exito;
    #msj;
    #datos;

    constructor(exito, msj, datos){
        this.#exito = exito;
        this.#msj = msj;
        this.#datos = datos;
    }
}