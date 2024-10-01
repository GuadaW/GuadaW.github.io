const cardSection = document.querySelector('#cardContainer');
const botonTodos = document.querySelector('#btnTodos');
const botonMesa = document.querySelector('#btnMesa');
const botonSillas = document.querySelector('#btnSillas');
const botonSofas = document.querySelector('#btnSofas');
const botonDeco = document.querySelector('#btnDeco');
const botonEscrit = document.querySelector('#btnEscrit');
const searchInput = document.querySelector('#searchBar');

let mueblesDisponibles = [];

const obtenerProductos = () => {
    
    fetch('../data.json')
        .then((res) => res.json())
        .then((data) => {
            mueblesDisponibles = data;

            mostrarProd(mueblesDisponibles);
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err
            })
        })
};

obtenerProductos();

function mostrarProd(array) {

    array.forEach((producto)=> {
        const divCard = document.createElement('div');
        divCard.className = "productCard";

        divCard.innerHTML = `
            <h4>${producto.tipo} ${producto.nombre}</h4>
            <img src=${producto.image} alt="Imagen del Producto ${producto.nombre} en venta">
            <div class="productBuy">
                <p>U$S ${producto.precio}</p>
                <button id="addToCart-btn" class="cart-btn" type="submit" onclick="addToCart(${producto.id})" title="Agregar al carrito">Comprar</button>
            <div>
        `;
        cardSection.appendChild(divCard);
    })
};


botonTodos.addEventListener('click', mostrarTodo);

function mostrarTodo() {
    cardSection.innerHTML = '';
    mostrarProd(mueblesDisponibles);
};

botonMesa.addEventListener('click', mostrarMesas);

function mostrarMesas() {
    const mesasDisponibles = mueblesDisponibles.filter(elemento => {
        return elemento.tipo.includes('Mesa')
    });
    cardSection.innerHTML = '';
    mostrarProd(mesasDisponibles);
};

botonSillas.addEventListener('click', mostrarSillas);

function mostrarSillas() {
    const sillasDisponibles = mueblesDisponibles.filter(elemento => {
        return elemento.tipo.includes('Silla')
    });
    cardSection.innerHTML = '';
    mostrarProd(sillasDisponibles);
};


botonSofas.addEventListener('click', mostrarSofas);

function mostrarSofas() {
    const sofasDisponibles = mueblesDisponibles.filter(elemento => {
        return elemento.tipo.includes('Sofa')
    });
    cardSection.innerHTML = '';
    mostrarProd(sofasDisponibles);
};


botonDeco.addEventListener('click', mostrarDeco);

function mostrarDeco() {
    const decoDisponibles = mueblesDisponibles.filter(elemento => {
        return elemento.tipo.includes('Cuadro')
    });
    cardSection.innerHTML = '';
    mostrarProd(decoDisponibles);
};


botonEscrit.addEventListener('click', mostrarEscrit)

function mostrarEscrit() {
    const escritDisponibles = mueblesDisponibles.filter(elemento => {
        return elemento.tipo.includes('Escritorio')
    });
    cardSection.innerHTML = '';
    mostrarProd(escritDisponibles);
};


searchInput.addEventListener('keyup', (e) => {
    cardSection.innerHTML = '';

    const searchValue = e.target.value.toLowerCase();

    const filteredProducts = mueblesDisponibles.filter((product) => {
        return (
            product.nombre.toLowerCase().includes(searchValue) ||
            product.tipo.toLowerCase().includes(searchValue)
        );
    })

    mostrarProd(filteredProducts);
});