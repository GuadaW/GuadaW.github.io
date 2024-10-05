$(document).ready(function () {
    if ("carrito" in localStorage) {
        const datosGuardados = JSON.parse(localStorage.getItem("carrito"));
        if(datosGuardados.length > 0){
            for (const producto of datosGuardados) {
                carrito.push(new Producto(producto.id, producto.nombre, producto.precio, producto.categoria, producto.precioSpan, producto.img, producto.cantidad))
            }
            carritoUI(carrito)
        }
    }

    const URLJSON = "../data/producto.json"
    $.get(URLJSON, function (datos, estado) {
        if(estado == "success"){
            for (const producto of datos) {
                productos.push(new Producto(producto.id, producto.nombre, producto.precio, producto.categoria, producto.precioSpan, producto.img, producto.cantidad))
                productosFiltrados.push(new Producto(producto.id, producto.nombre, producto.precio, producto.categoria, producto.precioSpan, producto.img, producto.cantidad))
            }
        }
        console.log(productos);
        console.log(productosFiltrados);
        productosUI(productos, "#productos-grid");
    })


})


window.addEventListener('load', () => {
    $('#productos-grid').fadeIn('slow');
})

selectionUI(categorias, "#filtroCategorias");

$('#filtroCategorias').change(function (e) { 
    const valor = e.target.value;
    console.log(valor);
    $('#productos-grid').fadeOut(400, function () {
        if(valor == 'TODOS') {
            productosUI(productos, '#productos-grid');
        } else {
            const filtro = productos.filter(p => p.categoria == valor);
            productosUI(filtro, '#productos-grid')
        }

        $("#productos-grid").fadeIn()
    })
});

$("#buscarProducto").keyup(function (e) {
    const buscados = this.value.toUpperCase();
    console.log(buscados);
    if (buscados != "") {
        const encontrados = productos.filter(p => p.nombre.includes(buscados.toUpperCase()) ||
            p.categoria.includes(buscados.toUpperCase()));
        productosUI(encontrados, '#productos-grid');
    }
});

$(".precioInput").change(function (e) {
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min >= 0) && (max > 0)) {
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max)
        productosUI(encontrados, '#productos-grid')
    }
})


$("#filtroPrecio").change(function (e) {
    const valor = e.target.value
    console.log(valor);
    $("#productos-grid").fadeOut(400, function () {
        if (valor == "TODOS") {
            productosUI(productos, '#productos-grid');
        } 
        else if (valor == "MENOR"){
            const menores = productosFiltrados.sort(function (a, b) {return a.precio - b.precio});
            console.log(menores);
            productosUI(menores, '#productos-grid')
        }
        else if (valor == "MAYOR") {
            const mayores = productosFiltrados.sort(function (a, b) {return b.precio - a.precio});
            console.log(mayores);
            productosUI(mayores, '#productos-grid')
        }
        $("#productos-grid").fadeIn()
    })
})
