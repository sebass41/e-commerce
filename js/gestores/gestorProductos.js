let GestorProductos = {
    clave: "productos",

    obtenerTodos: function() {
        return leerDeStorage(this.clave, []);
    },
 
    guardarTodos: function(productos) {
        guardarEnStorage(this.clave, productos);
    },

    obtenerVisibles: function(){
        let productos = this.obtenerTodos();
        let productosVisibles = [];

        for(let i=0; i < productos.length; i++){
            if(productos[i].visible){
                productosVisibles.push(productos[i]);
            }
        }

        return productosVisibles;
    },

    registrar: function(nombre, descripcion, precio, stock, tipoIVA, categoría, imagen) {
        let productos = this.obtenerTodos();
		
        let nuevo = crearProducto(nombre, descripcion, precio, stock, categoría, tipoIVA || "minimo", imagen || "https://cdn-icons-png.flaticon.com/512/17003/17003579.png", generarNuevoId(productos));
        productos.push(nuevo);
        this.guardarTodos(productos);

        return { exito: true, mensaje: "Producto Agregado", datos: productos };
    },

    obtenerPorId: function(id) {
        let productos = this.obtenerTodos();
        let i;

        for (i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                return { exito: true, mensaje: "Producto encontrado", datos: productos[i] };
            }
        }

        return { exito: false, mensaje: "No se encontró el producto", datos:null };
    },

    obtenerPorCategoria: function(categoria){
        console.log(categoria === 0);
        if(categoria === 0){
            return {exito: true, mensaje: "Obtenido correctamente", datos: this.obtenerVisibles()};
        }

        let productos = this.obtenerVisibles();
        let productosFiltrados = []
        let i;

        for(i = 0; i < productos.length; i++){
            if(productos[i].categoria == categoria){
                productosFiltrados.push(productos[i]);
            }
        }

        if(productosFiltrados.length === 0){
            return {exito: false, mensaje: "No se encontraron productos de esta categoría", datos: null};
        }
        return {exito: true, mensaje:"Se encontraron productos de esta categoría", datos:productosFiltrados};
    },
	
	eliminar: function(id){
		let productos = this.obtenerTodos();
		
		for(let i = 0; i < productos.length; i++){
			if (productos[i].id === id) {
				productos[i].visible = false;

                this.guardarTodos(productos);
                return  { exito: true, mensaje: "Eliminado correctamente", datos:null };
            }
		}
		return  { exito: false, mensaje: "No se pudo eliminar", datos:null };
	},
	
	aumentarStock(id, stock){
		let productos = this.obtenerTodos();
		
		for(let i = 0; i < productos.length; i++){
			if (productos[i].id === id) {
				productos[i].stock += stock;

                this.guardarTodos(productos);
                return  { exito: true, mensaje: "Modificado correctamente", datos: productos[i].stock };
            }
		}
		return  { exito: false, mensaje: "No se pudo modificar", datos:null };
	},

    restarStock(id, stock){
        let productos = this.obtenerTodos();
		
		for(let i = 0; i < productos.length; i++){
			if (productos[i].id === id) {
                console.log(id, stock)
				productos[i].stock -= stock;

                this.guardarTodos(productos)
                return  { exito: true, mensaje: "Modificado correctamente", datos: productos[i].stock };
            }
		}
		return  { exito: false, mensaje: "No se pudo modificar", datos:null };
    },

	calcularIVA: function(producto) {
        let IVA = 0;
        switch (producto.tipoIVA) {
            case "minimo":
                IVA = 0.21;
                break;
            case "basico":
                IVA = 0.10;
                break;
            case "exento":
                IVA = 0;
                break;
        }
        let ivaTotal = producto.precio * IVA 
        return ivaTotal.toFixed(2);
    }


};
