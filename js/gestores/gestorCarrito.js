import {Carrito} from "../modelos/Carrito.js";
import { ItemCarrito } from "../modelos/ItemCarrito.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorCarrito {
    #items;
    #storage;
    #clave;

    constructor(storage, clave = "carrito"){
        this.#storage = storage;
        this.#clave = clave;
        this.#items = [];
        this.cargar();
    }

    obtenerTodos() {
        return [...this.#items];
    }

    buscarItem(idProducto) {
        let id = Number(idProducto);

        return this.#items.find(
            item => item.id === id
        );
    }

    agregarProducto(producto, cantidad = 1) {
        let cantidadNumerica = Number(cantidad);

        if (!producto.tieneStock(cantidadNumerica)) {
            return new Respuesta(false, "No tiene Stock suficiente");
        }

        let itemExistente = this.buscarItem(producto.id);

        if (itemExistente !== undefined) {
            let nuevaCantidad = itemExistente.cantidad + cantidadNumerica;

            if (!producto.tieneStock(nuevaCantidad)) {
                return new Respuesta(false, "La cantidad ingresada supera el stock");
            }

            itemExistente.cantidad = nuevaCantidad;
        } else {
            this.#items.push(
                new ItemCarrito(producto, cantidadNumerica)
            );
        }

        this.guardar();

        return new Respuesta(true, "Producto agregado al Carrito");
    }

    eliminarProducto(idProducto) {
        let id = Number(idProducto);
        let cantidadAnterior = this.#items.length;

        this.#items = this.#items.filter(
            item => item.producto.id !== id
        );

        let eliminado = cantidadAnterior !== this.#items.length;

        if (eliminado) {
            this.guardar();
        }

        return eliminado;
    }

    calcularTotal() {
        let total = 0;

        for (const item of this.#items) {
            total += item.calcularSubtotal();
        }

        return total;
    }

    vaciar() {
        this.#items = [];
        this.guardar();
    }

    guardar() {
        this.#storage.guardar(this.#clave, this.#items);
    }

    cargar() {
        let datos = this.#storage.obtener(this.#clave, []);

        this.#items = datos.map(
            datosItem => ItemCarrito.fromJSON(datosItem)
        );
    }

}