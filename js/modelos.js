function crearProducto(nombre, descripcion, precio, stock, categoria, tipoIVA, imagen, id){
		return{
			id: id,
			nombre: nombre,
			descripcion: descripcion,
			precio: precio,
			stock: stock,
			tipoIVA: tipoIVA,
			categoria: categoria,
			imagen: imagen,
			visible: true
		};
}

function crearVenta(subtotal, iva, total, usuario, fecha, productos, id){
		return{
			id: id,
			subtotal: subtotal,
			iva: iva,
			total: total,
			usuario: usuario,
			fecha: fecha, 
			productos: productos
		};
}

function crearCategoria(nombre, id){
	return{
		id: id,
		nombre: nombre
	};
}