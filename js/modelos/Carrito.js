import { ItemCarrito } from "./ItemCarrito";

export class Carrito {
    #items

    constructor() {
        this.#items = [];
    }

    agregarItem(producto, cantidad){
        let existe = this.#items.find(i => i.idProducto === producto.id);
        if(existe){
            existe.actualizarCantidad(existe.cantidad + cantidad);
        } else{
            this.#items.push(new ItemCarrito(producto, cantidad));
        }
    }

    eliminarItem(idProducto){
        this.#items = this.#items.filter(i => i.idProducto !== idProducto);
    }

    obtenerItems(){
        return [...this.#items];
    }

    calcularSubtotal(){
        let subtotal = 0;
        for(const item of this.#items){
            subtotal += item.subtotal;
        }
        return subtotal;
    }

    calcularTotal(){
        let total = 0;
        for(const item of this.#items){
            let iva = this.calcularIVA(item);
            total += item.subtotal + iva;
        }
        return total;
    }

    calcularIVA(item) {
        let porcentaje = 0;
        switch (item.tipoIVA) {
            case "minimo": 
                porcentaje = 0.22; 
                break;
            case "basico": 
                porcentaje = 0.10; 
                break;
            case "exento": 
                porcentaje = 0; 
                break;
        }
        return (item.subtotal * porcentaje).toFixed(2);
    }
}
