import {Producto} from "../modelos/Producto.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorProductos {
    #productos;
    #storage;
    #clave;

    constructor(storage, clave = "productos"){
        this.#storage = storage;
        this.#clave = clave;
        this.#productos = [];
        this.cargar();
    }

    obtenerTodos() {
        return [...this.#productos];
    }

    obtenerVisibles() {
        return this.#productos.filter(producto => producto.visible);
    }

    obtenerPorId(id) {
        let idNumerico = Number(id);
        return this.#productos.find(producto => producto.id === idNumerico);
    }

    obtenerSiguienteId() {
        if (this.#productos.length === 0) {
            return 1;
        }

        let mayorId = this.#productos[0].id;

        for (const producto of this.#productos) {
            if (producto.id > mayorId) {
                mayorId = producto.id;
            }
        }

        return mayorId + 1;
    }

    registrar(nombre, descripcion, precio, stock, tipoIVA, categoría, imagen) {
        let producto = new Producto(
            this.obtenerSiguienteId(),
            nombre, 
            descripcion, 
            precio, 
            stock, 
            tipoIVA, 
            categoría, 
            imagen
        );
		
        this.#productos.push(producto);
        this.guardar();

        return producto;
    }

    obtenerPorCategoria(categoria){
        if(categoria === 0){
            return new Respuesta(true, "Productos obtendios con exito", this.obtenerVisibles());
        }

        let productosFiltrados = this.#productos.filter(producto => producto.categoria === categoria);

        if(productosFiltrados.length === 0){
            return new Respuesta(false, "No se encontraron productos de esta categoría", null);
        }
        return new Respuesta(true, "Se encontraron productos de esta categoría", productosFiltrados);
    }
	
	eliminar (id){
		let producto = this.obtenerPorId(id);
		
        if(producto){
            producto.visible = false;
            this.guardar();
            return new Respuesta(true, "Eliminado correctamente", []);
        }
        return new Respuesta(false, "No se encontró el producto a eliminar", []);
    }

    actualizarStock(id, stock){
        let producto = this.obtenerPorId(id);
		
        if(producto){
            producto.stock += stock;
            this.guardar();
            return new Respuesta(true, "Actualizado correctamente", []);
        }
        return new Respuesta(false, "No se pudo actualizar", []);
    }

    restarStock(id, stock){
        let producto = this.obtenerPorId(id);
		
        if(producto){
            producto.stock -= stock;
            this.guardar();
            return new Respuesta(true, "Actualizado correctamente", []);
        }
        return new Respuesta(false, "No se pudo actualizar", []);
    }

    guardar() {
        let datos = this.#productos.map(p => p.toJSON());
        this.#storage.guardar(this.#clave, this.#productos);
    }

    cargar() {
        let datos = this.#storage.obtener(this.#clave, []);
        this.#productos = datos.map(d => Producto.fromJSON(d));
    }

}