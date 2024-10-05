class Producto {
    constructor(id, nombre, precio, categoria, precioSpan, img, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.precioSpan = precioSpan;
        this.img = img;
        this.cantidad = cantidad || 1;
    }

    sumarCantidad(valor){
        this.cantidad += valor; 
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
}