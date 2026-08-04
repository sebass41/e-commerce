document.addEventListener("DOMContentLoaded", function() {
   protegerPagina();

    let form = document.getElementById("form-categoria");
    if (!form) {
        return;
    }
  
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        if(!verificarCategoria(nombre)){
            alert("Esta categoría ya está agregada");
            return;
        }
        let r = GestorCategorias.registrar(nombre);
        
        alert(r.mensaje);
        limpiarControles();
    });
});

function verificarCategoria(categoria){
    let categorias = GestorCategorias.obtenerTodos();

    for(let i = 0; i < categorias.length; i++){
        if(categoria.toLowerCase() === categorias[i].nombre.toLowerCase()){
            return false;
        }
    }
    return true;
}

function limpiarControles(){
    document.getElementById("nombre").value = "";
}