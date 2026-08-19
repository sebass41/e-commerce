export class Categoria {
    #id;
    #nombre;
    
    constructor(id, nombre) {
        this.#id = id;
        this.#nombre = nombre;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        let id = Number(valor);
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("El id de la categoría debe ser un entero mayor que cero.");
        }
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        let nombre = String(valor).trim();
        if (nombre.length === 0) {
            throw new Error("El nombre de la categoría es obligatorio.");
        }
        this.#nombre = nombre;
    }
}
