export class Venta {
    #id;
    #subtotal;
    #iva;
    #total;
    #usuario;
    #fecha;
    #productos;

    constructor(id, subtotal, iva, total, usuario, fecha, productos){
        this.#id = id;
        this.#subtotal = subtotal;
        this.#iva = iva;
        this.#total = total;
        this.#usuario = usuario;
        this.#fecha = fecha;
        this.#productos = productos;
    }

}