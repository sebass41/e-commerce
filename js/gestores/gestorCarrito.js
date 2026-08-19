import {Carrito} from "../modelos/Carrito.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorCarrito {
    #carrito
    #storage;
    #clave;

    constructor(storage, clave = "carrito"){
        this.#storage = storage;
        this.#clave = clave;
        this.#carrito = new Carrito();
        this.cargar();
    }

    obtenerCarrito() {
        return this.#carrito.obtenerItems();
    }

    agregarProducto(producto, cantidad){
        if(!producto.tieneStock(cantidad)){
            return new Respuesta(false, "No hay stock suficiente", producto.stock);
        }
        this.#carrito.agregarItem(producto, cantidad);
        this.guardar();
        return this.#carrito.obtenerItems();
    }

    eliimnarProducto(idProducto){
        this.#carrito.eliminarItem(idProducto);
        this.guardar();
        return this.#carrito.obtenerItems();
    }

    guardar() {
        this.#storage.guardar(this.#clave, this.#carrito.obtenerItems());
    }

    cargar() {
        let datos = this.#storage.obtener(this.#clave, []);
        this.#carrito = new Carrito();
        datos.forEach(function(d) {
            let item = JSON.parse(d);
            this.#carrito.agregarItem(item, item.cantidad);
        });
    }
}