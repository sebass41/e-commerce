import {ItemCarrito} from "../modelos/ItemCarrito.js";
import {Respuesta} from "./res/Respuesta.js";

export class gestorItemCarrito{
    #itemsCarrito;
    #storage;
    #clave;

    constructor(storage, clave = "itemCarrito"){
        this.#storage = storage;
        this.#clave = clave;
        this.#itemsCarrito = [];
        this.cargar();
    }

    obtenerTodos() {
        return [...this.#itemsCarrito];
    }

    registrar(producto, cantidad) {
        let itemCarrito = new ItemCarrito(
            cantidad,
            producto
        );
		
        this.#itemsCarrito.push(itemCarrito);
        this.guardar();

        return itemCarrito;
    }

    guardar() {
        this.#storage.guardar(this.#clave, this.#itemsCarrito);
    }

    cargar() {
        let datos = this.#storage.obtener(this.#clave, []);
        this.#itemsCarrito = datos.map(d => JSON.parse(d));
    }
}