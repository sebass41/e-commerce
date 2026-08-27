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

let form = document.getElementById("form-venta");

document.addEventListener("DOMContentLoaded", function(){
	let items = gestorCarrito.obtenerTodos();

	if(items.length === 0){
        window.location.href = "../../";
    }

    mostrarDetalle(items);
	mostrarMontos();
	mostrarMapa();
	let productos = gestorCarrito.obtenerTodos();
	console.log(productos)

	form.addEventListener("submit", async function(e) {
		e.preventDefault();

		let usuario = document.getElementById("usuario").value;
		let direccion = document.getElementById("direccion").value;
		let subtotal = gestorCarrito.calcularSubtotal();
		let iva = gestorCarrito.calcularIVA();
		let total = gestorCarrito.calcularTotal();
		let productos = obtenerProductos();

		if (!direccion) {
			alert("Por favor seleccioná una ubicación en el mapa o escribí una dirección.");
			return;
		}

		gestorVentas.registrar(subtotal, iva, total, productos, usuario, direccion);

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
    let lat = parseFloat(data[0].lat);
    let lon = parseFloat(data[0].lon);

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
  } else {
    mostrarModal(false, "No se encontró la dirección.");
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
	
    contenedorDetalle.innerHTML = "<h2>Detalle de Compra</h2>";

	for(let i = 0; i < items.length; i++){
		let item = items[i];
		let producto = gestorProducto.obtenerPorId(item.idProducto);

		contenedorDetalle.innerHTML +=`
			<div class="producto-detalle equipo-card">
				<h3>${producto.nombre}</h3>
				<p class="equipo-info">Subtotal: $${item.subtotal}</p>
				<p class="equipo-info">IVA: $${item.calcularIVA()}</p>
			</div>
		`;
	}
}


function mostrarMontos() {

   document.getElementById("subtotal").innerText = "$" + gestorCarrito.calcularSubtotal();
   document.getElementById("iva").innerText = "$" + gestorCarrito.calcularIVA();
   document.getElementById("total").innerText = "$" + gestorCarrito.calcularTotal();
}


function obtenerProductos(){
	let items = gestorCarrito.obtenerTodos();
	let productos = [];
	for(let i = 0; i < items.length; i++){
		productos.push(items[i].idProducto);
	}

	return productos;
}
