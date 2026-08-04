let GestorVentas = {
    clave: "ventas",

    obtenerTodos: function() {
        return leerDeStorage(this.clave, []);
    },
 
    guardarTodos: function(ventas) {
        guardarEnStorage(this.clave, ventas);
    },

    registrar: function(subtotal, iva, total, productos, usuario) {
        let ventas = this.obtenerTodos();
		let fecha = new Date().toString();

        let nuevo = crearVenta(subtotal, iva, total, usuario, fecha, productos, generarNuevoId(ventas));
        
        ventas.push(nuevo);
        this.guardarTodos(ventas);
        return { exito: true, mensaje: "Venta registrada!", datos: ventas };
    },

    obtenerPorId: function(id) {
        let ventas = this.obtenerTodos();
        let i;

        for (i = 0; i < ventas.length; i++) {
            if (ventas[i].id === id) {
                return { exito: true, mensaje: "Producto encontrado", datos: ventas[i] };
            }
        }

        return { exito: false, mensaje: "No se encontró el producto", datos:null };
    }
};
