document.addEventListener("DOMContentLoaded", function(){
    mostrarCarrito();
	
});

function mostrarCarrito(){
    let contenedorProductos = document.getElementById("seccionProductos");
    let carrito = leerDeStorage("carrito", []);
    if(carrito.length === 0){
        contenedorProductos.innerHTML="<p>No hay productos en el carrito <a href='index.html'>¡Agregá Productos!</a></p>"
		document.getElementById("montos").innerHTML = "";
        return
    }
    contenedorProductos.innerHTML = "";

    for(let i = 0; i < carrito.length; i++){
        let respuesta = GestorProductos.obtenerPorId(carrito[i].id);
        let producto = respuesta.datos;
		
        contenedorProductos.innerHTML +=`
            <div class="producto-carrito miembro-card">
                <img src="${producto.imagen}" height="100px">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <input type="number"
						id="input${producto.id}"
                        value="${carrito[i].cantidad}"
                        min="1"
                        max="${producto.stock}"
                > 
				<button class="btn btn-small" type="button" onclick="actualizarCantidad(${producto.id})">OK</button>
				<h2>$${producto.precio} c/u</h2>
				<button class="btn btn-secondary" type="button" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `
		
    }
	mostrarMontos(carrito);
}


function mostrarMontos(carrito)
{
	let subtotal = 0;
	let IVA = 0;
	for(let i = 0; i < carrito.length; i++){
        let respuesta = GestorProductos.obtenerPorId(carrito[i].id);
        let producto = respuesta.datos;
		let cantidad = carrito[i].cantidad;
     	let precio = producto.precio;
		
		subtotal += precio*cantidad;
		IVA += GestorProductos.calcularIVA(producto) * cantidad;
   	}
   document.getElementById("subtotal").innerText = subtotal;
   document.getElementById("iva").innerText = IVA.toFixed(2);
   document.getElementById("total").innerText = (subtotal + IVA);   
}

function eliminarProducto(id)
{
	let carrito = leerDeStorage("carrito", []);
	for(let i= 0; i < carrito.length; i++){
		if(carrito[i].id === id){
			carrito.splice(i, 1);
			
			guardarEnStorage("carrito", carrito);
			mostrarCarrito();
			return;
		}
	}	
}

function actualizarCantidad(id){
	let carrito = leerDeStorage("carrito", []);
	let inputCant = document.getElementById("input"+id);
	
	for(let i= 0; i < carrito.length; i++){
		if(carrito[i].id === id){
			let producto = GestorProductos.obtenerPorId(id).datos;
			let cantidad = parseInt(inputCant.value);

			if(producto.stock >= cantidad && cantidad > 0){
				carrito[i].cantidad = cantidad;
				
				guardarEnStorage("carrito", carrito);
				mostrarCarrito();
				return;
			}else {
				mostrarModal(false, "Cantidad inválida o no hay suficiente stock");
				return;
			}
		}
	}

}