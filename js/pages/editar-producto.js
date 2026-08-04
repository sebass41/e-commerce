document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();

    let productos = GestorProductos.obtenerTodos();
    let filtroCategoria = document.getElementById("filtro-categoria");
    let filtroInput = document.getElementById("filtro-input");
    
    mostrarProductos(productos);
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", function() {
            let productosFiltro = GestorProductos.obtenerPorCategoria(this.value).datos;
            
            if (this.value === "todos") {
                productosFiltro = productos;
            }
            
            mostrarProductos(productosFiltro);
        });
    }
    
    if (filtroInput) {
        filtroInput.addEventListener("input", function() {
            let productos = GestorProductos.obtenerTodos();
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
                            id="input${producto.id}" 
                            name="input${producto.id}"
                            placeholder="1"
                            required>
						<button class="btn btn-primary" onClick= "actualizarStock(${producto.id})">Modificar</button>
						<button class="btn btn-secondary" type="button" onclick="eliminarProducto(${producto.id})">Eliminar Producto</button>
            </div>
					    <div id="resultado${producto.id}"></div>
                    `;

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

function actualizarStock(id){
	let productos = leerDeStorage("productos", []);
	let inputCant = document.getElementById("input"+id);
	console.log(inputCant)
    if(!inputCant){
		alert("Por favor ingrese un número válido para modificar el stock");
		return;
	}
	
	for(let i= 0; i < productos.length; i++){
		if(productos[i].id === id){
			let producto = GestorProductos.obtenerPorId(id).datos;
			let modificarStock = parseInt(inputCant.value);

			productos[i].stock += modificarStock;
				
			guardarEnStorage("productos", productos);
			mostrarProductos(productos);
			return;
		}
	}
	
}

function eliminarProducto(id){
	let r = GestorProductos.eliminar(id);

    if (r.exito){
        alert(r.mensaje);
    }
    console.log(r)
}

