import { Storage } from "../gestores/gestorStorage.js";
import { GestorCarrito } from "../gestores/gestorCarrito.js";
import { GestorProductos } from "../gestores/gestorProductos.js";
import { GestorVentas } from "../gestores/gestorVentas.js"
import { mostrarModal } from "../comun.js";

let storage = new Storage();
let gestorCarrito = new GestorCarrito(storage);
let gestorProducto = new GestorProductos(storage);
let gestorVentas = new GestorVentas(storage);

let map;
let marker;
let direccion;

let form = document.getElementById("form-venta");

document.addEventListener("DOMContentLoaded", function(){
	let items = gestorCarrito.obtenerTodos();

	if(items.length === 0){
        window.location.href = "../../";
    }

    mostrarDetalle(items);
	mostrarMontos();
	mostrarMapa();

	form.addEventListener("submit", async function(e) {
		e.preventDefault();

		let usuario = document.getElementById("usuario").value;
		let subtotal = gestorCarrito.calcularSubtotal();
		let iva = gestorCarrito.calcularIVA();
		let total = gestorCarrito.calcularTotal();

		if (!direccion) {
			return;
		}
		console.log(items)
		gestorVentas.registrar(subtotal, iva, total, items, usuario, direccion);
		for(let i = 0; i < items.length; i++){
			gestorProducto.restarStock(items[i].idProducto, items[i].cantidad);
		}

		gestorCarrito.vaciar();
		
		window.location.href = "./index.html";
	});

});

function mostrarMapa(){
	map = L.map('map').setView([-34.462, -57.84], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	{
		attribution: '© OpenStreetMap contributors'
	}).addTo(map);

	// al hacer click en el mapa
	map.on('click', function(e) { 
		colocarMarcador(e.latlng.lat, e.latlng.lng);
		obtenerDireccion(e.latlng.lat, e.latlng.lng);
	});

	document.getElementById("direccion").addEventListener("change", function() {
		let direccion = this.value;
		if (direccion.trim() !== "") {
			buscarDireccion(direccion);
		}
	});
}

async function buscarDireccion(direccion) {
  let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
  let respuesta = await fetch(url);
  let datos = await respuesta.json();

  if (datos.length > 0) {
    let lat = parseFloat(datos[0].lat);
    let lon = parseFloat(datos[0].lon);

    map.setView([lat, lon], 15);

	colocarMarcador(lat, lon);
  } else {
    mostrarModal(false, "No se encontró la dirección.");
  }
}

async function obtenerDireccion(lat, lon) {
  let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  let respuesta = await fetch(url);
  let datos = await respuesta.json();

  if (datos && datos.display_name) {
    document.getElementById("direccion").value = datos.display_name;
	direccion = datos.display_name;
  } else {
    mostrarModal(false, "No se encontró la dirección.");
	direccion = null;
  }
}

function colocarMarcador(lat, long){
    if (marker) {
      marker.setLatLng([lat, long]);
    } else {
      marker = L.marker([lat, long]).addTo(map);
    }

    document.getElementById("ubicacion").value = lat + "," + long;
}

function mostrarDetalle(items){

    let contenedorDetalle = document.getElementById("seccionDetalle");

    contenedorDetalle.innerHTML = `
        <div class="card-body p-4">
            <h2 class="card-title mb-2">Detalle de compra</h2>
            <p class="text-secondary mb-2">Productos seleccionados</p>
            <div class="list-group list-group-flush">
    `;

    for(let i = 0; i < items.length; i++){

        let item = items[i];
        let producto = gestorProducto.obtenerPorId(item.idProducto);

        contenedorDetalle.innerHTML += `
            <div class="list-group-item px-0 py-3">

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <h5 class="mb-1">
                            ${producto.nombre} - $${producto.precio}
                            <span class="badge text-bg-primary">
                                x${item.cantidad}
                            </span>
                        </h5>

                        <small class="text-secondary">
                            IVA: $${item.calcularIVA()}
                        </small>

                    </div>

                    <strong class="fs-5">
                        $${item.subtotal}
                    </strong>

                </div>

            </div>

        `;
    }

    contenedorDetalle.innerHTML += `
            </div>
        </div>
    `;
}


function mostrarMontos() {

   document.getElementById("subtotal").innerText = "$" + gestorCarrito.calcularSubtotal();
   document.getElementById("iva").innerText = "$" + gestorCarrito.calcularIVA();
   document.getElementById("total").innerText = "$" + gestorCarrito.calcularTotal();
}