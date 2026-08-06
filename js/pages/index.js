document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();

    if(!leerDeStorage("productos", false)){
        cargarContenido();
    }

    let productos = GestorProductos.obtenerVisibles();
    mostrarProductos(productos);
    mostrarCategorias();

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
        div = document.createElement("div");
        div.className = "dashboard-card";
        
        div.innerHTML =`
                    <div class="">
                        <h3>${producto.nombre}</h3>
                        <img src="${producto.imagen}" height="200px">
                        <p>$${producto.precio}</p>
                        <button class="btn btn-primary" type="button" onClick="detalleProducto(${producto.id})">Ver más</button>
					    <div id="resultado${producto.id}"></div>
                    </div>
        `;

        lista.appendChild(div);
    }
}

function mostrarCategorias(){
	let contenedorCategorias = document.getElementById("contenedorCategorias");
    let categorias;
    let i;
    let li;

    categorias = GestorCategorias.obtenerTodos();
    contenedorCategorias.innerHTML = "";

    liTodos = document.createElement("li");
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
    if(esAdmin()){
        let botonesAdmin = document.querySelectorAll(".admin");
        document.getElementById("login-btn").style.display = "none";
        for(let i = 0; i < botonesAdmin.length; i++){
            botonesAdmin[i].style.display = "inline";
        }
    }
}

function filtrarPorCategoria(idCategoria){
    let productosFiltro = GestorProductos.obtenerPorCategoria(idCategoria).datos;
    mostrarProductos(productosFiltro);
}