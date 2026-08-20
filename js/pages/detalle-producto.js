import { GestorProductos } from "../gestores/gestorProductos.js";
import { Storage } from "../gestores/GestorStorage.js";
import {GestorCarrito} from "../gestores/gestorCarrito.js";
import { mostrarModal } from "../comun.js";

let storage = new Storage
let gestorProductos = new GestorProductos(storage);
let gestorCarrito = new GestorCarrito(storage);

export function mostrarDetalle(id) {
    let producto = gestorProductos.obtenerPorId(id);
    let idContenedor = "resultado" + id;
    let contenedorDetalle = document.getElementById(idContenedor);
	

    contenedorDetalle.innerHTML = "";

    if (producto.stock > 0) {
        contenedorDetalle.innerHTML = `
            <label><b>${producto.nombre}</b> $ ${producto.precio}</label><br>
            ${producto.descripcion}<br>

            <input type="number" 
                id="cantidad${producto.id}" 
                name="cantidad" 
                placeholder="ingresar cantidad" 
                value="1"
                min="1"
                max="${producto.stock}"><br>

            <button type="button" id="agregar${producto.id}" class="btn btn-secondary">
                Agregar al Carrito
            </button>
            <br>

            <button type="button" id="ocultar${producto.id}" class="btn btn-small">
                Ocultar
            </button>
        `;

        // Agregar eventos
        let botonAgregar = document.getElementById("agregar" + producto.id);
        let botonOcultar = document.getElementById("ocultar" + producto.id);

        botonAgregar.addEventListener("click", function() {
            agregarAlCarrito(producto.id);
        });

		
        botonOcultar.addEventListener("click", function() {
            ocultar(contenedorDetalle);
        });

    } else {
        contenedorDetalle.innerHTML = `
            <label>
                <b>${producto.nombre}</b> a $${producto.precio}
            </label><br>

            <p>${producto.descripcion}</p><br> 

            <p>
                <b>En el momento no contamos con stock disponible</b>
            </p>

            <button type="button" id="ocultar${producto.id}">
                Ocultar
            </button>
        `;

		// Agregar eventos
        let botonOcultar = document.getElementById("ocultar" + producto.id);

        botonOcultar.addEventListener("click", function() {
            ocultar(contenedorDetalle);
        });
    }
}

function ocultar(contenedor) {
	contenedor.innerHTML = "";
}

function agregarAlCarrito(id) {
	let producto = gestorProductos.obtenerPorId(id);
	let cantidad = parseInt(document.getElementById("cantidad" + id).value);
	let r = gestorCarrito.agregarProducto(producto, cantidad);
	
	mostrarModal(r.exito, r.msj);
}