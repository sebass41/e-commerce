import { Storage } from "../gestores/gestorStorage.js";
import { GestorVentas } from "../gestores/gestorVentas.js";

let storage = new Storage();
let gestorVentas = new GestorVentas(storage);

export function detalleVenta(id){
    let venta = gestorVentas.obtenerPorId(id);
    let contenedorDetalle = document.getElementById(id);
    contenedorDetalle.innerHTML = "";

    for (let i=0; i < venta.productos.length; i++) {
        let producto = venta.productos[i];
        let p = document.createElement("p");
        p.innerText = `${producto.nombre} - ${producto.cantidad}u`;
        contenedorDetalle.appendChild(p);
    }

    let botonOcultar = document.createElement("button");
    botonOcultar.type = "button";
    botonOcultar.className = "btn btn-small";
    botonOcultar.textContent = "Ocultar";
    botonOcultar.addEventListener("click", () => {
        contenedorDetalle.innerHTML = "";
    });

    contenedorDetalle.appendChild(botonOcultar);
}


function ocultar(contenedorResultado){
	contenedorResultado.innerHTML = " ";
}
