const userModal = document.getElementById("userModal");
const btnModal = document.getElementById("btnModal");
const closeModal = document.getElementById("modalCross");
const modalForm = document.querySelector('#registerForm');

let users = [];

let activeUser = JSON.parse (localStorage.getItem('users'));

const openModal = () => {
    btnModal.addEventListener('click', () => {
        userModal.style.display = "block";
    })
};

const closeWindow = () => {
    userModal.style.display = "none";
};

closeModal.addEventListener('click', closeWindow);




window.onclick = function(e) {
    if (e.target == userModal) {
        userModal.style.display = "none";
    }
};



const nameInput = document.querySelector('#userName');
const pswInput = document.querySelector('#userPsw');
const btnRegister = document.querySelector('#userRegister');

const registerUser = () => {
    const nameValue = nameInput.value;
    const pswValue = pswInput.value;

    users.push({
        name: nameValue,
        password: btoa(pswValue)
    });

    localStorage.setItem('users', JSON.stringify(users));

    nameInput.value = '';
    pswInput.value = '';
};

function welcomeUser(array) {

    array.forEach(user => {
        const div = document.createElement('div');
        
        div.innerHTML = `
        <h3>¡Bienvenid@ ${user.name}!</h3>
        <p>¡Muchas gracias por registrarte! Disfruta de nuestra página web donde podrás agregar los productos que quieras al carrito y comprarlos.</p><br>
        <button id="userLogout" class="login-button" type="submit" onclick="logout()">Cerrar sesión</button>
        `;

    modalForm.append(div);
    });
};


if (!activeUser) {
    openModal();
    
    btnRegister.addEventListener('click', () => {
        registerUser();

        modalForm.innerHTML = '';

        const newUser = JSON.parse( localStorage.getItem('users'));
        welcomeUser(newUser)
    });

} else {
    openModal();
    modalForm.innerHTML = '';
    welcomeUser(activeUser);
};


const logout = () => {
    users = [];
    localStorage.clear();

    userModal.style.display = "none";
    location.reload();
};