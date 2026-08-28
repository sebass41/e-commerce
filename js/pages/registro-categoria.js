import { Storage } from "../gestores/gestorStorage.js";
import { GestorCategorias } from "../gestores/gestorCategorias.js";
import { mostrarModal, protegerPagina } from "../comun.js";

let storage = new Storage();
let gestorCategorias = new GestorCategorias(storage);

document.addEventListener("DOMContentLoaded", function() {
   protegerPagina();

    let form = document.getElementById("form-categoria");
    if (!form) {
        return;
    }
  
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        
        console.log(nombre);
        let r = gestorCategorias.registrar(nombre);
        mostrarModal(r.exito, r.msj);
        
        limpiarControles();
    });
});


function limpiarControles(){
    document.getElementById("nombre").value = "";
}