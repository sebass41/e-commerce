import {Venta} from "../modelos/Venta.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorVentas {
    #ventas;
    #storage;
    #clave;

    constructor(storage, clave = "ventas"){
        this.#storage = storage;
        this.#clave = clave;
        this.#ventas = [];
        this.cargar();
    }

     obtenerSiguienteId() {
        if (this.#ventas.length === 0) {
            return 1;
        }

        let mayorId = this.#ventas[0].id;

        for (const venta of this.#ventas) {
            if (producto.id > mayorId) {
                mayorId = producto.id;
            }
        }

        return mayorId + 1;
    }

    obtenerTodos() {
        return [...this.#ventas];
    }

    registrar (subtotal, iva, total, productos, usuario, direccion) {
	
        let venta = new Venta(obtenerSiguienteID(), subtotal, iva, total, usuario, productos, direccion);
        
        this.#ventas.push(nuevo);
        this.guardar();
        return venta;
    }

    obtenerPorId(id) {
        let idNumerico = Number(id);
        return this.#ventas.find(venta => venta.id === idNumerico);
    }

    guardar() {
        this.#storage.guardar(this.#clave, this.#ventas);
    }

    cargar() {
        let datos = this.#storage.obtener(this.#clave, []);
        this.#ventas = datos.map(d => JSON.parse(d));
    }
}
