let GestorCategorias = {
    clave: "categorias",

    obtenerTodos: function() {
        return leerDeStorage(this.clave, []);
    },

    guardarTodos: function(productos) {
        guardarEnStorage(this.clave, productos);
    },

    registrar: function(nombre) {
        let categorias = this.obtenerTodos();
		
        let nueva = crearCategoria(nombre, generarNuevoId(categorias));
        categorias.push(nueva);
        this.guardarTodos(categorias);

        return { exito: true, mensaje: "Categoría Agregada", datos: null };
    },

    obtenerPorId: function(id) {
        let categorias = this.obtenerTodos();
        let i;

        for (i = 0; i < categorias.length; i++) {
            if (categorias[i].id === id) {
                return { exito: false, mensaje: "No se encontró la categoría", datos: categorias[i] };
            }
        }

        return { exito: false, mensaje: "No se encontró la categoría", datos:null };
    },
	
	eliminar: function(id){
		let categorias = this.obtenerTodos();
		
		for(let i = 0; i < categorias.length; i++){
			if (categorias[i].id === id) {
				categorias.splice(i, 1);
                return  { exito: true, mensaje: "Eliminado correctamente", datos:null };
            }
		}
		return  { exito: false, mensaje: "No se pudo eliminar", datos:null };
	}
	
};
