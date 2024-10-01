const checkboxYes = document.querySelector('#optionYes');
const checkboxNo = document.querySelector('#optionNo');
const newAddress = document.querySelector('#deliveryAddress');
const goToIndex = document.querySelector('#goBackBtn');

const emailInput = document.querySelector('#uMail');
const phoneInput = document.querySelector('#uPhone');
const formCheck = document.querySelector('#userDataForm');



checkboxNo.onclick = function() {
    if(this.checked != null) {
        if(newAddress.classList.contains("hidden")){
            newAddress.classList.remove("hidden");
        }
    }
};

checkboxYes.onclick = function() {
    if(this.checked != null) {
        if(!newAddress.classList.contains('hidden')){
            newAddress.classList.add("hidden");
        }
    }
};



const goBack = () => {
    location.href = '../index.html';
};



const goBackCancel = () => {
    Swal.fire({
        title: '¿Quiere volver y cancelar la compra?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire('La compra se canceló', '', 'info');
            setTimeout(goBack, 3500);
        } else if (result.isDenied) {
            Swal.fire('Continúa con la compra', '', 'info')
        }
    })
};

goToIndex.addEventListener('click', goBackCancel);



const validatePhone = (input) => {
    let regPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return regPhone.test(input);
};

const validateEmail = (input) => {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return regEmail.test(input);
};


const verifyEmailVal = () => {
    let valid = false;
    let emailValue = emailInput.value.trim();
    let emailErrMessage = document.getElementById('emailErr');

    if(!validateEmail(emailValue)) {
        emailErrMessage.classList.remove('hidden');
        emailInput.classList.add('input-error');
    } else {
        emailErrMessage.classList.add('hidden');
        emailInput.classList.remove('input-error');
        valid = true;
    }
    return valid;
};

const verifyPhoneVal = () => {
    let valid = false;
    let phoneNum = phoneInput.value.trim();
    let phoneErrMessage = document.getElementById('phoneErr');

    if (!validatePhone(phoneNum)) {
    phoneErrMessage.classList.remove('hidden');
    phoneInput.classList.add('input-error');
    } else {
        phoneErrMessage.classList.add('hidden');
        phoneInput.classList.remove('input-error');
        valid = true;
    }
    return valid;
};


function verifyPurchase (e) {
    e.preventDefault();

    let isEmailValid = verifyEmailVal();
    let isPhoneValid = verifyPhoneVal();

    let isFormValid = isEmailValid && isPhoneValid;

    if(isFormValid){
        Swal.fire({
            title: '¡La compra se realizó con éxito!',
            text: 'Muchas gracias',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

        setTimeout(goBack, 3500);

    } else {
        Swal.fire({
            title: '¡Faltan datos!',
            text: 'Debe completar los datos para finalizar la compra',
            icon: 'info',
            confirmButtonText: 'Ok'
        })
    }
};

formCheck.addEventListener('submit', verifyPurchase);