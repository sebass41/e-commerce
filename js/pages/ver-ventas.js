import { Storage } from "../gestores/gestorStorage.js";
import { GestorVentas } from "../gestores/gestorVentas.js";
import { detalleVenta } from "./detalle-ventas.js";
import { esAdmin } from "../comun.js";

let storage = new Storage();
let gestorVentas = new GestorVentas(storage);

document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();

    let ventas = gestorVentas.obtenerTodos();
    mostrarVentas(ventas);
 });


function mostrarVentas(ventas){
    let lista = document.getElementById("seccionVentas");
    lista.innerHTML = "";
    
    if (!ventas || ventas.length === 0) {
        lista.innerHTML = "<p>Todavía no hay ventas</p>";
        return;
    } 

    for (let i=0; i<ventas.length; i++) {
        let venta = ventas[i];
        let div = document.createElement("div");
        let detalleDiv = document.createElement("div");
        let boton = document.createElement("button");

        div.className = "dashboard-card";
        detalleDiv.id = venta.id;

        boton.className = "btn btn-primary";
        boton.type = "button";
        boton.textContent = "Ver detalle";
        boton.addEventListener("click", () => {
            detalleVenta(venta.id);
        });

        div.innerHTML = `
            <h3>${venta.fecha}</h3>
            <p><b>Subtotal: </b>$${venta.subtotal}</p>
            <p><b>IVA: </b>$${venta.iva}</p>
            <p><b>Total: </b>$${venta.total}</p>
            <p><b>Usuario: </b>${venta.usuario}</p>
            <p><b>Dirección: </b>${venta.direccion}</p>
        `;

        div.appendChild(boton);
        div.appendChild(detalleDiv);
        lista.appendChild(div);
    }
}


function verificarAdmin(){
    if(esAdmin()){
        let botonesAdmin = document.querySelectorAll(".admin");

        for(let i = 0; i < botonesAdmin.length; i++){
            botonesAdmin[i].style.display = "inline";
        }
    }
}


