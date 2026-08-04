function detalleProducto(id)
{
	let respuesta = GestorProductos.obtenerPorId(id);
	let producto = respuesta.datos;
	let contenedorResultado = "resultado" + id;
	let contenedorDetalle = document.getElementById(contenedorResultado);
	contenedorDetalle.innerHTML = " ";
	if(producto.stock > 0){
		contenedorDetalle.innerHTML+=`
					<label><b>${producto.nombre}</b> $ ${producto.precio} </label><br>
					${producto.descripcion}<br>
					<input type="number" 
							id="cantidad${producto.id}" 
							name="cantidad" 
							placeholder="ingresar cantidad" 
							value="1"
							min="1"
							max="${producto.stock}"><br>
					<button type="button" onClick="agregarAlCarrito(${id})" class="btn btn-secondary">Agregar al Carrito</button>
					<br>
					<button type="button" onClick="ocultar(${contenedorResultado})" class="btn btn-small">Ocultar</button>
		`
	}else{
		contenedorDetalle.innerHTML+=`
			<label for='articulo'><b>${producto.nombre}</b> a $${producto.precio} </label><br>
			<p>${producto.descripcion}</p><br> 
			<p><b>En el momento no contamos con stock suficiente</b></p>
			<button type="button" onClick="ocultar(${contenedorResultado})">Ocultar</button>
		`
	}	
}

function ocultar(contenedorResultado)
{
	contenedorResultado.innerHTML = " ";
}

function agregarAlCarrito (id)
{
	if(comprobarDuplicado(id)){
		mostrarModal(false,"El producto ya está en el carrito");
		return
	}
	let carrito = leerDeStorage("carrito", []);
	let producto = GestorProductos.obtenerPorId(id).datos;
	let cantidad = parseInt(document.getElementById("cantidad" + id).value);

	if (producto.stock < cantidad){
		mostrarModal(false,"No hay suficientes productos: " + producto.stock + " en stock" );
		return
	}
	let itemCarrito = 
	{
		id: id,
		cantidad: cantidad
	}

	carrito.push(itemCarrito);
	guardarEnStorage("carrito", carrito);
	mostrarModal(true,"Se agregó al carrito " + cantidad + " unidades")
}

function comprobarDuplicado(id){
	let carrito = leerDeStorage("carrito", []);
	for (let i = 0; i < carrito.length; i++){
		if (carrito[i].id === id){
			return true;
		}
	}
	return false;
}