export function esAdmin() {
    if (localStorage.getItem("sesion") !== "admin") {
        return false;
    }
    return true
}

export function protegerPagina(){
    if(!esAdmin()){
        window.location.href = "index.html";
    }
}

export function cerrarSesionDesdePagina() {
    localStorage.removeItem("sesion");
    window.location.reload();
}

export function mostrarModal(exito, mensaje){
    let modal = document.getElementById("modal");
    let tituloModal = document.getElementById("modal-title");
    let msjModal = document.getElementById("modal-message");

    tituloModal.textContent = exito ? "Éxito" : "Error";
    msjModal.textContent = mensaje;
    msjModal.className = exito ? "success" : "error";

    modal.classList.remove("hidden");

    cerrarModal()
}

function cerrarModal(){
    let btnCerrar = document.getElementById("modal-close");
    if(btnCerrar){
        btnCerrar.addEventListener("click", function(){
            document.getElementById("modal").classList.add("hidden");
        });
    }
}