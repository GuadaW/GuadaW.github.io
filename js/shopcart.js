const cartListSection = document.querySelector('#cartSection');
const cartListEmpty = document.querySelector('#cartEmpty');
const cartListFull = document.querySelector('#cart-footer');
const botonCompra = document.querySelector('#cart-buy');
const listProducts = document.querySelector('#list-allProducts');
const totalProducts = document.querySelector('#totalProducts');
const totalProdPrice = document.querySelector('#totalPrice');
const sectionSideCart = document.getElementById("sidenavCart");
const totalItemsBuy = document.querySelector('#totalItemsInCart');
const botonVaciar = document.querySelector('#emptyCart');

let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();



function addToCart(id) {
    
    if(cart.some((item) => item.id === id)){
        Swal.fire({
            title: 'El producto ya está en el carrito!',
            text: 'Haga click en el carrito para ajustar la cantidad',
            icon: 'info',
            confirmButtonText: 'Ok'
        })
    } else {
        const item = mueblesDisponibles.find((mueble) => mueble.id === id);
        cart.push({
            ...item,
            cantidadUnidades: 1,
        });
        Swal.fire({
            title: '¡Se agregó el producto al carrito!',
            icon: 'success',
            position: 'bottom-right',
            timer: 2000,
            showConfirmButton: false,
            toast: true
        });
    };

    updateCart();
};



function updateCart() {
    renderCartItems();
    cartText();
    renderTotal();

    localStorage.setItem('CART', JSON.stringify(cart));
};

function renderCartItems() {
    listProducts.innerHTML = "";

    cart.forEach((item) => {
        listProducts.innerHTML += `
            <div class="list-product">
                <div>
                    <p>${item.tipo} ${item.nombre}</p>
                </div>
                <div>
                    <div class="counter">
                        <div class="counter-btn" onclick="changeNumUnits('plus', ${item.id})">+</div>
                        <div class="count">${item.cantidadUnidades}</div>
                        <div class="counter-btn" onclick="changeNumUnits('minus', ${item.id})">-</div>
                    </div>
                </div>
                <div class="list-price">
                    <div>
                        <p>U$S ${item.precio}</p>
                    </div>
                    <img id="btnDelete" class="deleteIcon" src="./assets/icons/x-mark.png" onclick="removeCartItems(${item.id})" 
                    alt="Quitar articulo de la compra" title="Quitar del carrito">
                </div>
            </div>
        `
    });
};



function cartText() {
    if(cart.length >= 1) {
        cartListEmpty.classList.add("hidden");
        cartListFull.classList.remove("hidden");
        botonVaciar.classList.remove("hidden");
    }else{
        cartListEmpty.classList.remove("hidden");
        cartListFull.classList.add("hidden");
        botonVaciar.classList.add("hidden");
    };
};

o

function removeCartItems(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
};



function changeNumUnits(action, id) {
    cart = cart.map((item) => {
        let cantidadUnidades = item.cantidadUnidades;

        if(item.id === id) {
            if(action === "plus" && cantidadUnidades < item.cantidad){
                cantidadUnidades++;
            }else if(action === "minus" && cantidadUnidades > 1){
                cantidadUnidades--;
            }
        }
        return {
            ...item,
            cantidadUnidades,
        };
    });

    updateCart();
};

function renderTotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.precio * item.cantidadUnidades;
        totalItems += item.cantidadUnidades;
    });
    totalProducts.innerHTML = `${totalItems}`;
    totalItemsBuy.innerHTML = `(${totalItems})`;

    totalProdPrice.innerHTML = `U$S ${totalPrice}`;
};


botonCompra.addEventListener('click', buyShoppingList);

function buyShoppingList(){
    if(cart.length >= 1){
        emptyCart();
        setTimeout(goToForm, 1000);
    };
};

function goToForm() {
    location.href = './pages/form.html';
};

function emptyCart(){
    cart = [];
    localStorage.clear();
};

function reloadPage(){
    location.reload();
};



botonVaciar.addEventListener('click', askEmptyCart);

function askEmptyCart() {
    Swal.fire({
        title: 'Quiere vaciar el carrito?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    })
    .then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Se quitaron los artículos del carrito', '', 'error');
                emptyCart();
                setTimeout(reloadPage, 3500);
            } else if (result.isDenied) {
                Swal.fire('Se mantuvieron los artículos de la lista', '', 'info')
            }
        })
};

function openNav() {
    sectionSideCart.style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
};

function closeNav() {
    sectionSideCart.style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
};