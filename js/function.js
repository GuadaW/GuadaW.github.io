function productosUI(productos, id) { //ESTO FUNCIONA NO TOCAR!!
    $(id).empty();
    for (const producto of productos) {
        $(id).append(`<div class="productos-box">
                        <img src="imagenes/productos/${producto.img}.png"></img> 
                        <h3>${producto.nombre}</h3> 
                        <h4>$${producto.precio}<span>$${producto.precioSpan}</span></h4> 
                        <button class="btnCompra" id="${producto.id}"><i class="bi bi-cart"></i>Agregar al carrito</button>
                    </div>`)
    }

    $('.btnCompra').on("click", agregarCarrito);
}

/* ---------------------------- FUNCIONALIDAD DEL CARRITO ---------------------------------- */

//AGREGAR UN PRODUCTO AL CARRITO
function agregarCarrito(e) {
    e.preventDefault();
    e.stopPropagation();
    const idProducto = e.target.id;
    const select = carrito.find(productos => productos.id == idProducto);
    if (select == undefined) {
        carrito.push(productos.find(p => p.id == idProducto))
        Swal.fire({
            position: 'bottom-start',
            toast: true,
            width: 300,
            icon: 'success',
            title: 'Producto agregado',
            showConfirmButton: false,
            timer: 1300
        })
    } else {
        Swal.fire({
            position: 'bottom-start',
            toast: true,
            width: 300,
            icon: 'warning',
            title: 'Producto en el carrito',
            showConfirmButton: false,
            timer: 1300
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoUI(carrito);
}

//DARLE FORMA
function carritoUI(productos) {
    $(".rounded-pill").html(productos.length);
    $('#carritoFinal').empty();
    for (const producto of productos) {
        $('#carritoFinal').append(registroCarrito(producto))
    }
    $('#carritoFinal').append(`<p id="total-carrito">TOTAL: $${totalCarrito(productos)}</p>`);
    $('#carritoFinal').append(`<div id="confirmar-compra" class="d-grid col-11 mx-auto"><button id="boton-confirmar-compra" class="btn btn-outline-dark">CONFIRMAR COMPRA</button></div>`);


    $('.btn-danger').on('click', eliminarCarrito);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
    $('#boton-confirmar-compra').click(confirmarCompra)
}

function eliminarCarrito(e) {
    carrito = carrito.filter(p => p.id != e.target.id)
    carritoUI(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function registroCarrito(productos) {
    return `<div class="carrito-fila">
                <div class="carrito-producto carrito-columna">
                    <img class="carrito-producto-img" src="imagenes/productos/${productos.img}.png" width="50" height="50">
                    <span class="carrito-producto-titulo">${productos.nombre}</span>
                </div>
                    <span id="idPrecio" class="carrito-precio carrito-columna">$${productos.precio}</span>
                <div class="carrito-cantidad carrito-columna">
                    <a id="${productos.id}" class="btn btn-outline-dark btn-sub">-</a>
                    <span class="badge bg-dark">${productos.cantidad}</span>
                    <a id="${productos.id}" class="btn btn-outline-dark btn-add">+</a>
                    <button id="${productos.id}" class="btn btn-danger" type="button">REMOVER</button>
                </div>
            </div>`
}

function addCantidad() {
    let producto = carrito.find(p => p.id == this.id);
    producto.sumarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().parent().children()[1].innerHTML = "$" + producto.subtotal();
    $("#total-carrito").html(`TOTAL: $${totalCarrito(carrito)}`);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function subCantidad() {
    let producto = carrito.find(p => p.id == this.id);
    if (producto.cantidad > 1) {
        producto.sumarCantidad(-1);
        let registroUI = $(this).parent().children();
        registroUI[1].innerHTML = producto.cantidad;
        $(this).parent().parent().children()[1].innerHTML = "$" + producto.subtotal()
        $("#total-carrito").html(`TOTAL: $${totalCarrito(carrito)}`);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

function totalCarrito(carrito) {
    let total = 0
    carrito.forEach(p => total += p.subtotal())
    return total;
}


function selectionUI(list, selector) {
    $(selector).empty();
    list.forEach(e => {
        $(selector).append(`<option value='${e}'>${e}</option>`);
    });
    $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`);
}



(function () {
    let parent = document.querySelector(".price-slider");
    if (!parent) return;
    let rangeS = parent.querySelectorAll("input[type=range]");
    let numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function (e) {
        e.oninput = function () {
            let slide1 = parseFloat(rangeS[0].value)
            let slide2 = parseFloat(rangeS[1].value);
            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
            }
            numberS[0].value = slide1;
            numberS[1].value = slide2;
        }
    });

    numberS.forEach(function (e) {
        e.oninput = function () {
            let number1 = parseFloat(numberS[0].value);
            let number2 = parseFloat(numberS[1].value);
            if (number1 > number2) {
                let tmp = number1;
                numberS[0].value = number2;
                numberS[1].value = tmp;
            }
            rangeS[0].value = number1;
            rangeS[1].value = number2;
        }
    });
})();

function confirmarCompra() {
    carrito.splice(0, carrito.length);
    localStorage.setItem("carrito",'[]');
    $('.carrito-fila').empty();
    $('#total-carrito').empty();
    $('.rounded-pill').html(0);
    Swal.fire({
        icon: 'success',
        title: 'COMPRA CONFIRMADA',
        text: '¡Gracias por elegirnos!',
        timer: 1800,
        showConfirmButton: false
    })
}