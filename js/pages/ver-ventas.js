	document.addEventListener("DOMContentLoaded", function(){
    verificarAdmin();

    let ventas = GestorVentas.obtenerTodos();
    mostrarVentas(ventas);
 });


function mostrarVentas(ventas){
    let lista = document.getElementById("seccionVentas");
    let i;
    let venta;
    let div;

    lista.innerHTML = "";
    console.log(ventas === null);
    if (ventas === null || ventas.length === 0) {
        lista.innerHTML = "<p>Todavía no hay ventas</p>";
        return;
    } 

    for (i = 0; i < ventas.length; i++) {
        venta = ventas[i];
        div = document.createElement("div");
        div.className = "dashboard-card";
        
        div.innerHTML =`
                        <h3>${venta.fecha}</h3>
                        <p><b>Subtotal: </b>$${venta.subtotal}</p>
						<p><b>IVA: </b>$${venta.iva}</p>
						<p><b>Total: </b>$${venta.total}</p>
						<p><b>Usuario: </b>${venta.usuario}</p>
                        <button class="btn btn-secodary" type="button" onClick="detalleVenta(${venta.id})">Ver más</button>
					    <div id="resultado${venta.id}"></div>
        `;

        lista.appendChild(div);
    }
}

function mostrarCategorias(){
    let select = document.getElementById("filtro-categoria");
    let categorias;
    let i;
    let option;

    categorias = GestorCategorias.obtenerTodos();
    select.innerHTML = "";

    option = document.createElement("option");
    option.value = "todos";
    option.textContent = "Todos";
    select.appendChild(option);

    for (i = 0; i < categorias.length; i++) {
        option = document.createElement("option");
        option.value = categorias[i].id;
        option.className = "filter-tabs"
        option.textContent = categorias[i].nombre;
        select.appendChild(option);
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


