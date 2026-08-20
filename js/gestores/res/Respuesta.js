export class Respuesta {
    #exito;
    #msj;
    #datos;

    constructor(exito, msj, datos = null) {
        this.#exito = exito;
        this.#msj = msj;
        this.#datos = datos;
    }

    get exito() {
        return this.#exito;
    }

    set exito(valor) {
        this.#exito = Boolean(valor);
    }

    get msj() {
        return this.#msj;
    }

    set msj(valor) {
        this.#msj = String(valor).trim();
    }

    get datos() {
        return this.#datos;
    }

    set datos(valor) {
        this.#datos = valor;
    }
}
