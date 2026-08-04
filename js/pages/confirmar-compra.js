document.addEventListener("DOMContentLoaded", function(){
	let carrito = leerDeStorage("carrito", []);

	if(carrito.length === 0){
		console.log(seccionDetalle)
        seccionDetalle.innerHTML="<p>No hay productos en el carrito</p>";
		document.getElementById("montos").innerHTML = "";
        return
    }

    mostrarDetalle(carrito);
	let montos = calcularMontos(carrito)
	mostrarMontos(montos.subtotal, montos.iva, montos.total);
	let form = document.getElementById("form-venta");

	form.addEventListener("submit", function(e){
		e.preventDefault();

		let usuario = document.getElementById("usuario").value;
		
		let r = GestorVentas.registrar(montos.subtotal, montos.iva, montos.total, carrito, usuario);

		if(r.exito){
			for(let i=0; i < carrito.length; i++){
				let rStock = GestorProductos.restarStock(carrito[i].id, carrito[i].cantidad);
			}
			
			alert("Compra realizada con exito!");
			eliminarDeStorage("carrito");
			window.location.href = "index.html";
		}
	});
});

function mostrarDetalle(carrito){
    let contenedorDetalle = document.getElementById("seccionDetalle");
    
    contenedorDetalle.innerHTML = "<h2>Detalle de Compra</h2>";

    for(let i = 0; i < carrito.length; i++){
        let respuesta = GestorProductos.obtenerPorId(carrito[i].id);
        let producto = respuesta.datos;
		let iva = parseFloat(GestorProductos.calcularIVA(producto));
		let cantidad = carrito[i].cantidad

        contenedorDetalle.innerHTML +=`
            <div class="producto-detalle equipo-card">
                <h3>${producto.nombre}</h3>
				<p class="equipo-info">Subtotal: $${producto.precio * cantidad}</p>
				<p class="equipo-info">IVA: $${iva * cantidad}</p>
            </div>
        `
		
    }
}


function mostrarMontos(subtotal, iva, total) {

   document.getElementById("subtotal").innerText = "$" + subtotal;
   document.getElementById("iva").innerText = "$" + iva;
   document.getElementById("total").innerText = "$" + total;
}


function calcularMontos(carrito){
	let subtotal = 0;
	let IVA = 0;
	for(let i = 0; i < carrito.length; i++){
        let respuesta = GestorProductos.obtenerPorId(carrito[i].id);
        let producto = respuesta.datos;
		let cantidad = parseInt(carrito[i].cantidad);
     	let precio = parseFloat(producto.precio);
		
		subtotal += precio*cantidad;
		IVA += GestorProductos.calcularIVA(producto)*cantidad;
   	}

   return {subtotal: subtotal, iva: IVA, total: subtotal + IVA};
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


function agregarCantidad(id)
{
	let carrito = leerDeStorage("carrito", []);
	for(let i= 0; i < carrito.length; i++){
		if(carrito[i].id === id){
			let producto = GestorProductos.obtenerPorId(id).datos;
			if(producto.stock > carrito[i].cantidad){
				carrito[i].cantidad ++;
				
				guardarEnStorage("carrito", carrito);
				mostrarCarrito();
				return;
			}else{
				alert("Disculpe las molestias, en el momento no contamos con stock suficiente");
				return;
			}
		}
	}	
}
function restarCantidad(id)
{
	let carrito = leerDeStorage("carrito", []);

	for(let i= 0; i < carrito.length; i++){
		if(carrito[i].cantidad > 1){
			if(carrito[i].id === id){
			carrito[i].cantidad --;
			
			guardarEnStorage("carrito", carrito);
			mostrarCarrito();
			return;
			}
		}
	}	
}

//A ver implementación
function actualizarCantidad(id){
	let carrito = leerDeStorage("carrito", []);
	let inputCant = document.getElementById("input"+id);
	
	for(let i= 0; i < carrito.length; i++){
		if(carrito[i].id === id){
			let producto = GestorProductos.obtenerPorId(id).datos;
			let cantidad = inputCant.value;

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