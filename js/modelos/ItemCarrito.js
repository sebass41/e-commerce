export class ItemCarrito {
    #idProducto;
    #nombre;
    #precio;
    #cantidad;
    #subtotal;
    #tipoIVA;

    constructor(producto, cantidad){
        this.#idProducto = producto.id;
        this.#nombre = producto.nombre;
        this.#precio = producto.precio;
        this.#cantidad = cantidad;
        this.#subtotal = this.#precio * this.#cantidad;
        this.#tipoIVA = producto.tipoIVA;
    }

    get idProducto() { 
        return this.#idProducto; 
    }

    get nombre() { 
        return this.#nombre; 
    }

    get precio() { 
        return this.#precio; 
    }

    get cantidad() { 
        return this.#cantidad; 
    }

    get subtotal() { 
        return this.#subtotal; 
    }

    get tipoIVA() { 
        return this.#tipoIVA; 
    }

    set cantidad(valor) {
        let cant = Number(valor);
        if (!Number.isInteger(cant) || cant <= 0) {
            throw new Error("La cantidad debe ser un entero mayor que cero.");
        }
        this.#cantidad = cant;
        this.#subtotal = this.#precio * this.#cantidad;
    }
    actualizarCantidad(cantidad){
        this.#cantidad = cantidad;
        this.#subtotal = this.#precio * this.#cantidad;
    }
}