import {mostrarModal} from "../comun.js"
import {Storage} from "../gestores/gestorStorage.js";

let storage= new Storage();

document.addEventListener("DOMContentLoaded", function() {
	let formLogin = document.getElementById("form-login");

    if (!formLogin) {
        return;
    }

    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();

        let correoForm = document.getElementById("login-correo").value;
        let contrasena = document.getElementById("login-contrasena").value;
        let r = iniciarSesion(correoForm, contrasena);
        console.log(r);
        if (r.exito) {
            window.location.href = "index.html";
        }
        
        mostrarModal(r.exito, r.mensaje);
    });
});

function iniciarSesion(correo, contrasena) {
    let correoAdmin = "admin@admin"
    let pass = "admin"

    if (correo === correoAdmin && contrasena === pass) {
        storage.guardar("sesion", 1);
        return { exito: true, mensaje: "Inicio de sesión exitoso", datos: null };
    } else {
        return { exito: false, mensaje: "Correo o contraseña incorrectos", datos: null };
    }
}