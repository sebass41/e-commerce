function detalleVenta(id)
{
	let respuesta = GestorVentas.obtenerPorId(id);
	let ventas = respuesta.datos;
	let contenedorResultado = "resultado" + id;
	let contenedorDetalle = document.getElementById(contenedorResultado);
	let productos = ventas.productos;

	contenedorDetalle.innerHTML = " ";
	for(let i = 0; i < productos.length; i ++){
		let p = document.createElement("p");

		let producto = GestorProductos.obtenerPorId(productos[i].id).datos;
		p.innerText = producto.nombre + " - " + productos[i].cantidad + "u";
		contenedorDetalle.appendChild(p);
	}
	contenedorDetalle.innerHTML += `<button type="button" onClick="ocultar(${contenedorResultado})" class="btn btn-small">Ocultar</button>`
}

function ocultar(contenedorResultado)
{
	contenedorResultado.innerHTML = " ";
}
