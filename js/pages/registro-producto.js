import { Storage } from "../gestores/gestorStorage.js";
import { GestorProductos } from "../gestores/GestorProductos.js";
import {GestorCategorias} from "../gestores/gestorCategorias.js"
import { protegerPagina } from "../comun.js";

let storage = new Storage();
let gestorProductos = new GestorProductos(storage);
let gestorCategorias = new GestorCategorias(storage);

document.addEventListener("DOMContentLoaded", function() {
    protegerPagina();
    mostrarCategorias();

    let form = document.getElementById("form-producto");
    if (!form) {
        return;
    }
  
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let descripcion = document.getElementById("descripcion").value;
        let stock = parseInt(document.getElementById("stock").value);
        let tipoIVA = document.getElementById("tipoIVA").value;
        let precio = parseFloat(document.getElementById("precio").value);
        let categoria = document.getElementById("categoria").value;
        let imagen = document.getElementById("imagen").value;
        
        if(categoria == ""){
            alert("Agregale una categoría");
            console.log(imagen === "");
            return
        }

        let r = gestorProductos.registrar(nombre, descripcion, precio, stock, tipoIVA, categoria, imagen);
            
        alert(r.mensaje);
        limpiarControles();
        
    });
});

function limpiarControles()
{
	document.getElementById("nombre").value = " ";
	document.getElementById("descripcion").value = " ";
	document.getElementById("stock").value = 0;
	document.getElementById("tipoIVA").value = 0;
	document.getElementById("precio").value = 0;
	document.getElementById("categoria").value = " ";
	document.getElementById("imagen").value = " ";
}


function mostrarCategorias(){
    let select = document.getElementById("categoria");
    let categorias;
    let i;
    let option;

    categorias = gestorCategorias.obtenerTodos();
    select.innerHTML = "";

    option = document.createElement("option");
    option.value = "";
    option.innerText = "Agrega una categoría";
    select.appendChild(option);

    for (i = 0; i < categorias.length; i++) {
        option = document.createElement("option");
        option.value = categorias[i].id;
        option.innerText = categorias[i].nombre;
        select.appendChild(option);
    }
}
