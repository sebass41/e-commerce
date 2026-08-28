import {Categoria} from "../modelos/Categoria.js";
import {Respuesta} from "./res/Respuesta.js";

export class GestorCategorias {
    #clave;
	#storage;
	#categorias;
	
	constructor(storage, clave= "categorias"){
		this.#clave = clave;
		this.#storage = storage;
		this.#categorias = [];
		this.cargar();
	}
		
    obtenerTodos(){
		return [...this.#categorias];
	}

    registrar(nombre) {
		if(this.existeCategoria(nombre)){
			return new Respuesta(false, "Ya existe esta categoría");
		}

		let categoria = new Categoria(
			this.obtenerSiguienteId(),
			nombre
		);
		
		this.#categorias.push(categoria);
		this.guardar();
		
		return new Respuesta(true, "Registrado con éxito");
	}
    
	existeCategoria(nombre) {
		console.log(this.#categorias)
		let nombreNorm = nombre.trim().toLowerCase();

		return this.#categorias.some(categoria => 
			categoria.nombre.toLowerCase() === nombreNorm
		);
	}



    obtenerPorId(id){
		let idNumerico= Number(id);
		return this.#categorias.find(categoria => categoria.id === idNumerico);
	} 
	
	obtenerSiguienteId() {
		if (this.#categorias.length === 0){
			return 1;
		}
		
		let mayorId= this.#categorias[0].id;
		
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
		let datos = this.#storage.obtener(this.#clave, []);
		this.#categorias = datos.map(d => Categoria.fromJSON(d));
	}

	
}
