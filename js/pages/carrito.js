import {Storage} from "../gestores/gestorStorage.js";
import {GestorCarrito} from "../gestores/gestorCarrito.js";
import {GestorProductos} from "../gestores/gestorProductos.js"
let storage;
let gestorCarrito;
let gestorProductos;

document.addEventListener("DOMContentLoaded", function(){
	storage = new Storage();
	gestorCarrito = new GestorCarrito(storage);
	gestorProductos = new GestorProductos(storage);

	mostrarCarrito();
});

function mostrarCarrito(){
    let contenedorProductos = document.getElementById("seccionProductos");
    let items = gestorCarrito.obtenerTodos();

    if(items.length === 0){
        contenedorProductos.innerHTML="<p>No hay productos en el carrito <a href='index.html'>¡Agregá Productos!</a></p>"
		document.getElementById("montos").innerHTML = "";
        return
    }
    contenedorProductos.innerHTML = "";

    for(let i = 0; i < items.length; i++){
        let producto = gestorProductos.obtenerPorId(items[i].idProducto)
		
        contenedorProductos.innerHTML +=`
            <div class="producto-carrito miembro-card">
                <img src="${producto.imagen}" height="100px">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <input type="number"
						id="input${producto.id}"
                        value="${items[i].cantidad}"
                        min="1"
                        max="${producto.stock}"
                > 
				<button class="btn btn-small" type="button" onclick="actualizarCantidad(${producto.id})">OK</button>
				<h2>$${producto.precio} c/u</h2>
				<button class="btn btn-secondary" type="button" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `
		
    }
	mostrarMontos();
}

function mostrarMontos() {
	document.getElementById("subtotal").innerText = gestorCarrito.calcularSubtotal().toFixed(2);
    document.getElementById("iva").innerText = gestorCarrito.calcularIVA().toFixed(2);
    document.getElementById("total").innerText = gestorCarrito.calcularTotal().toFixed(2);
}