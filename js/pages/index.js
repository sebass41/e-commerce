import { GestorProductos } from "../gestores/gestorProductos.js";
import { GestorCategorias } from "../gestores/gestorCategorias.js";
import { Storage } from "../gestores/gestorStorage.js";
import { mostrarDetalle } from "./detalle-producto.js";
import { esAdmin, mostrarModal} from "../comun.js";
import { cargarContenido } from "../init.js";

// Iniciar Página
let storage;
let gestorProductos
let gestorCategorias

document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();
    storage = new Storage();
    gestorProductos = new GestorProductos(storage);
    gestorCategorias = new GestorCategorias(storage);
    
    if(!storage.existe("productos")){
        cargarContenido();
    }
    
    let productos = gestorProductos.obtenerVisibles();
    let categorias = gestorCategorias.obtenerTodos();
    
    mostrarProductos(productos);
    mostrarCategorias(categorias);

    // Filtros

    let filtroInput = document.getElementById("filtro-input");
    
    if (filtroInput) {
        filtroInput.addEventListener("input", function() {
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
        let idProducto = producto.id;
        div = document.createElement("div");
        div.className = "dashboard-card";
        
        // Crear el botón
        let boton = document.createElement("button");
        boton.className = "btn btn-primary";
        boton.type = "button";
        boton.textContent = "Ver más";

        // Asignar evento con addEventListener
        boton.addEventListener("click", () => {
            mostrarDetalle(idProducto);
        });

        div.innerHTML =`
                    <div class="">
                        <h3>${producto.nombre}</h3>
                        <img src="${producto.imagen}" height="200px">
                        <p>$${producto.precio}</p>
					    <div id="resultado${idProducto}"></div>
                    </div>
        `;

        div.querySelector("div").appendChild(boton);
        lista.appendChild(div);
    }
}

function mostrarCategorias(categorias){
	let contenedorCategorias = document.getElementById("contenedorCategorias");
    let i;
    let li;
    
    contenedorCategorias.innerHTML = "";

    let liTodos = document.createElement("li");
    liTodos.innerHTML = '<a class=dropdown-item href="#">Ver Todos</a></li>';
    contenedorCategorias.appendChild(liTodos);
    liTodos.addEventListener("click", function(){
        filtrarPorCategoria(0);
    });

    for (i = 0; i < categorias.length; i++) {
        li = document.createElement("li");
		li.innerHTML= `<a class="dropdown-item" href="#">${categorias[i].nombre}</a></li>`;
        let idCategoria = categorias[i].id;

		contenedorCategorias.appendChild(li);
        li.addEventListener("click", function(){
            filtrarPorCategoria(idCategoria);
        });
    }
}

function verificarAdmin(){
    console.log(esAdmin());
    if(esAdmin()){
        let botonesAdmin = document.querySelectorAll(".admin");
        document.getElementById("login-btn").style.display = "none";
        for(let i = 0; i < botonesAdmin.length; i++){
            botonesAdmin[i].style.display = "inline";
        }
    }
}

function filtrarPorCategoria(idCategoria){
    let respuesta = gestorProductos.obtenerPorCategoria(idCategoria);
    let productos;
    
    if(respuesta.exito){
        productos = respuesta.datos;
        mostrarProductos(productos);
    }else{
        document.getElementById("seccionProductos").textContent = respuesta.msj;
    }
}
