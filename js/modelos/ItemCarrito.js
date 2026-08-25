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

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }

    calcularIVA() {
        let porcentaje = 0;
        switch (this.#tipoIVA) {
            case "minimo": 
                porcentaje = 0.22; 
                break;
            case "basico": 
                porcentaje = 0.10; 
                break;
            case "exento": 
                porcentaje = 0; 
                break;
        }
        return this.#subtotal * porcentaje;
    }

    actualizarCantidad(cantidad){
        this.#cantidad = cantidad;
        this.#subtotal = this.#precio * this.#cantidad;
    }

    toJSON() {
        return {
            idProducto: this.#idProducto,
            nombre: this.#nombre,
            precio: this.#precio,
            cantidad: this.#cantidad,
            tipoIVA: this.#tipoIVA
        };
    }

    static fromJSON(datos) {
        let producto = {
            id: datos.idProducto,
            nombre: datos.nombre,
            precio: datos.precio,
            tipoIVA: datos.tipoIVA
        };

        return new ItemCarrito(producto, datos.cantidad);
    }
}