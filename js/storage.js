function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function leerDeStorage(clave, valorPorDefecto) {
    let texto = localStorage.getItem(clave);
    if (!texto) {
        return valorPorDefecto;
    }

    try {
        return JSON.parse(texto);
    } catch (e) {
        return valorPorDefecto;
    }
}

function eliminarDeStorage(clave){
    localStorage.removeItem(clave);
}

function generarNuevoId(lista) {
    if (!lista || lista.length === 0) {
        return 1;
    }

    let ultimo = lista[lista.length - 1];
    return (ultimo.id || 0) + 1;
}
