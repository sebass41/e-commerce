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
        this.#fecha = new Date().toString();
        this.#productos = productos; // array de items del carrito
        this.#direccion = direccion; // string: dirección escrita o lat/lng
    }

    get id() { return this.#id; }
    get subtotal() { return this.#subtotal; }
    get iva() { return this.#iva; }
    get total() { return this.#total; }
    get usuario() { return this.#usuario; }
    get fecha() { return this.#fecha; }
    get productos() { return this.#productos; }
    get direccion() { return this.#direccion; }

    
    toJSON() {
        return {
            id: this.#id,
            subtotal: this.#subtotal,
            iva: this.#iva,
            total: this.#total,
            usuario: this.#usuario,
            fecha: this.#fecha,
            productos: this.#productos,
            direccion: this.#direccion
        };
    }

    static fromJSON(datos) {
        return new Venta(
            datos.id,
            datos.subtotal,
            datos.iva,
            datos.total,
            datos.usuario,
            datos.productos,
            datos.direccion
        );
    }

}
