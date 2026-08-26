export class Venta {
    #id;
    #subtotal;
    #iva;
    #total;
    #usuario;
    #fecha;
    #productos;
    #direccion;

    constructor(id, subtotal, iva, total, usuario, productos, direccion){
        this.#id = id;
        this.#subtotal = subtotal;
        this.#iva = iva;
        this.#total = total;
        this.#usuario = usuario;
        this.#fecha = new Date().toString();;
        this.#productos = productos;
        this.#direccion = direccion
    }
}