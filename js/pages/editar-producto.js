import { Storage } from "../gestores/gestorStorage.js";
import { GestorProductos } from "../gestores/gestorProductos.js";
import { esAdmin } from "../comun.js";

let storage = new Storage();
let gestorProductos = new GestorProductos(storage);

let seccionProductos = document.getElementById("seccionProductos");
seccionProductos.addEventListener("click", manejarClick)
document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();

    let productos = gestorProductos.obtenerTodos();
    let filtroCategoria = document.getElementById("filtro-categoria");
    let filtroInput = document.getElementById("filtro-input");
    
    mostrarProductos(productos);
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", function() {
            let productosFiltro = gestorProductos.obtenerPorCategoria(this.value).datos;
            
            if (this.value === "todos") {
                productosFiltro = productos;
            }
            
            mostrarProductos(productosFiltro);
        });
    }
    
    if (filtroInput) {
        filtroInput.addEventListener("input", function() {
            let productos = gestorProductos.obtenerTodos();
            let productosFiltrados = filtrarPorcaracteres(productos, this.value);
            
            mostrarProductos(productosFiltrados);
        });
    }

    let botonSalir = document.getElementById("btn-salir");
    if (botonSalir) {
        botonSalir.addEventListener("click", function() {
            cerrarSesionDesdePagina();
        });
    }
});

function filtrarPorcaracteres(productos, caracteres){
    let productosFiltrados = [];
    for(let i=0; i < productos.length; i++){
        if(productos[i].nombre.toLowerCase().includes(caracteres.toLowerCase())){
            productosFiltrados.push(productos[i]);
        }
    }
    return productosFiltrados;
}

function mostrarProductos(productos){
    let lista = document.getElementById("seccionProductos");
    let i;
    let producto;
    let div;

    lista.innerHTML = "";
    
    if (productos === null || productos.length === 0) {
        lista.innerHTML = "<p>Todavía no hay productos</p>";
        return;
    } 

    for (i = 0; i < productos.length; i++) {
        producto = productos[i];
        let visible = productos[i].visible ? "Visible" : "Eliminado"
        div = document.createElement("div");
        div.className = "dashboard-card";
        
        div.innerHTML =`
                        <h3>${producto.nombre} (${visible})</h3>
                        <p>$${producto.precio}</p>
						<p>Actualmente hay ${producto.stock} en stock</p>
						<input 
                            type="number" 
                            data-id="${producto.id}" 
                            name="input${producto.id}"
                            placeholder="1"
                            required>
						<button class="btn btn-primary" 
                                data-id="${producto.id}"
                                data-accion="actualizarStock">
                                    Modificar
                        </button>
						<button class="btn btn-secondary" 
                                type="button"
                                data-id="${producto.id}"
                                data-accion="eliminar">
                                    Eliminar Producto
                        </button>
            
					    <div id="resultado${producto.id}"></div>
                    `;

        lista.appendChild(div);
    }
}

function manejarClick(evento) {
    let boton = evento.target.closest("button[data-accion][data-id]");

    if (boton === null) {
        return;
    }

    let idProducto = Number(boton.dataset.id);
    let accion = boton.dataset.accion;

    if (accion === "actualizarStock") {
        let input = document.querySelector(`input[data-id="${idProducto}"]`);
        let nuevaCantidad = Number(input.value);

        let respuesta = gestorProductos.actualizarStock(idProducto, nuevaCantidad);

        if(!respuesta.exito){
            mostrarModal(false, respuesta.msj);
        }
    }

    if (accion === "eliminar") {
        gestorProductos.eliminar(idProducto);
    }

    let productos = gestorProductos.obtenerTodos();
    mostrarProductos(productos);
}

function verificarAdmin(){
    if(esAdmin()){
        let botonesAdmin = document.querySelectorAll(".admin");

        for(let i = 0; i < botonesAdmin.length; i++){
            botonesAdmin[i].style.display = "inline";
        }
    }
}