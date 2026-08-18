import {Categoria} from "../modelos/Categoria.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorCategorias {
    #clave;
	#storage;
	#categorias;
	
	constructor(storage, clave= "categorias"){
		this.#clave= clave;
		this.#storage= storage;
		this.#cateegorías= [];
		this.cargar();
	}
		
    obtenerTodo()
		return [...this.#categorias];
	}

   // guardarTodos: function(productos) {
    //    guardarEnStorage(this.clave, productos);
    //},

    registrar(nombre) {
		let categoria= new Categoria(
			this.obtenerSiguientId(),
			nombre
		);
		
		this.#cateegorías.push(categoria);
		this.guardar();
		
		return categoria;
	}
    

    obtenerPorId(id){
		let idNumerico= number(id);
		return this.#categorias.find(categoria => categoria.id === idNumerico);
	} 
	
	obtenerSiguienteId() {
		if (this.#categorias.length === 0){
			return 1;
		}
		
		let mayorId= this.#cateegorías[0].id;
		
		for (const categoria of this.#categorias){
			if (categoria.id > mayorId){
				mayorId= categoria.id;
			}
		}
		return mayorId + 1;
	}
    
	guardar() {
		this.#storage.guardar(this.#clave, this.#categorias);
	}
	
	cargar() {
		let datos= this.#storage.obtener(this.#clave, []);
		this.#productos= datos.map(d => JSON.parse(d));
	}
	
};
