export class Producto {
    #id;
    #nombre;
    #descripcion;
    #precio;
    #stock;
    #tipoIVA;
    #categoria;
    #imagen;
    #visible;



    constructor(id, 
            nombre, 
            descripcion, 
            precio, 
            stock, 
            tipoIVA = "minimo", 
            categoria, 
            imagen = "https://cdn-icons-png.flaticon.com/512/17003/17003579.png", 
            visible
        ) {
        this.#id = id;
        this.#nombre = nombre; 
        this.#descripcion = descripcion;
        this.#precio = precio;
        this.#stock = stock;
        this.#tipoIVA = tipoIVA;
        this.#categoria = categoria;
        this.#imagen = imagen;
        this.#visible = visible;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        let id = Number(valor);

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("El id debe ser un entero mayor que cero.");
        }

        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        let nombre = String(valor).trim();

        if (nombre.length === 0) {
            throw new Error("El nombre del producto es obligatorio.");
        }

        this.#nombre = nombre;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(valor) {
        this.#descripcion = String(valor).trim();
    }

    get precio() {
        return this.#precio;
    }

    set precio(valor) {
        let precio = Number(valor);

        if (!Number.isFinite(precio) || precio < 0) {
            throw new Error("El precio debe ser un número mayor o igual a cero.");
        }

        this.#precio = precio;
    }

    get stock() {
        return this.#stock;
    }

    set stock(valor) {
        let stock = Number(valor);

        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error("El stock debe ser un entero mayor o igual a cero.");
        }

        this.#stock = stock;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(valor) {
        let categoria = Number(valor);

        if (!Number.isInteger(categoria) || categoria < 0) {
            throw new Error("La categoría debe ser un entero mayor o igual a cero.");
        }

        this.#categoria = categoria;
    }

    get tipoIVA(){
        return this.#tipoIVA;
    }

    set tipoIVA(valor){
        let tipoIVA = String(valor).trim();

        if (tipoIVA.length === 0) {
            throw new Error("El tipo de IVA es obligatorio.");
        }

        this.#tipoIVA = tipoIVA;
    }

    get visible() {
        return this.#visible;
    }

    set visible(valor) {
        this.#visible = Boolean(valor);
    }

    get imagen() {
        return this.#imagen;
    }

    set imagen(valor) {
        this.#imagen = String(valor).trim();
    }

    tieneStock(cantidad = 1) {
        return Number.isInteger(cantidad)
            && cantidad > 0
            && cantidad <= this.stock;
    }

    descontarStock(cantidad) {
        if (!this.tieneStock(cantidad)) {
            return false;
        }

        this.stock -= cantidad;
        return true;
    }
    
     toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            tipoIVA: this.tipoIVA,
            categoria: this.categoria,
            imagen: this.imagen,
            visible: this.visible
        };
    }

    static fromJSON(datos) {
        return new Producto(
            datos.id,
            datos.nombre,
            datos.descripcion,
            datos.precio,
            datos.stock,
            datos.tipoIVA,
            datos.categoria,
            datos.imagen,
            datos.visible
        );
    }
}
