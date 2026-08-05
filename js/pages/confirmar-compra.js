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