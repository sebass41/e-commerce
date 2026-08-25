import {Storage} from "../gestores/gestorStorage.js";
import {GestorCarrito} from "../gestores/gestorCarrito.js";
import {GestorProductos} from "../gestores/gestorProductos.js";
import { mostrarModal } from "../comun.js";;

let storage = new Storage();
let gestorCarrito = new GestorCarrito(storage);
let gestorProductos = new GestorProductos(storage);

let contenedorProductos = document.getElementById("seccionProductos");

inicializar();

function inicializar(){
    contenedorProductos.addEventListener("click", manejarClickCarrito)
    mostrarCarrito();
}

function manejarClickCarrito(evento) {
    let boton = evento.target.closest("button[data-accion][data-id]");

    if (boton === null) {
        return;
    }

    let idProducto = Number(boton.dataset.id);
    let accion = boton.dataset.accion;

    if (accion === "cambiarCantidad") {
        let input = document.querySelector(`input[data-id="${idProducto}"]`);
        let nuevaCantidad = Number(input.value);

        let respuesta = gestorCarrito.actualizarCantidad(idProducto, nuevaCantidad);

        if(!respuesta.exito){
            mostrarModal(false, respuesta.msj);
        }
    }

    if (accion === "eliminar") {
        gestorCarrito.eliminarProducto(idProducto);
    }

    mostrarCarrito();
}

function mostrarCarrito(){
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
						data-id="${producto.id}"
                        value="${items[i].cantidad}"
                        min="1"
                        max="${producto.stock}"
                >
				<button class="btn btn-small" 
                        type="button"
                        data-accion="cambiarCantidad"
                        data-id="${producto.id}">OK</button>
				<h2>$${items[i].subtotal}</h2>
				<button class="btn btn-secondary" 
                        type="button" 
                        data-accion="eliminar" 
                        data-id="${producto.id}">Eliminar</button>
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

function actualizarCantidad(){
    
}