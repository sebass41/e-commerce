import { ItemCarrito } from "../modelos/ItemCarrito.js";
import { Respuesta } from "./res/Respuesta.js";
import { GestorProductos } from "./gestorProductos.js";

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
            item => item.idProducto === id
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

    actualizarCantidad(idProducto, nuevaCantidad) {
        let item = this.buscarItem(idProducto);
        let producto = new GestorProductos(this.#storage)
                                    .obtenerPorId(idProducto);

        if (!item) {
            return new Respuesta(false, "Item no encontrado");
        }

        if (!producto.tieneStock(nuevaCantidad)) {
            return new Respuesta(false, "No hay stock suficiente");
        }

        item.actualizarCantidad(nuevaCantidad);
        this.guardar();
        return new Respuesta(true, "Actualizado correctamente");
    }


    eliminarProducto(idProducto) {
        let id = Number(idProducto);
        let cantidadAnterior = this.#items.length;

        this.#items = this.#items.filter(
            item => item.idProducto !== id
        );

        let eliminado = cantidadAnterior !== this.#items.length;

        if (eliminado) {
            this.guardar();
        }

        return eliminado;
    }

    calcularSubtotal() {
        return this.#items.reduce((acum, item) => acum + item.subtotal, 0);
    }

    calcularIVA(){
        return this.#items.reduce((acum, item) => acum + item.calcularIVA(), 0);
    }

    calcularTotal() {
        return this.calcularSubtotal() + this.calcularIVA();
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