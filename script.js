const iconSenha = document.querySelectorAll('.icon_senha');
console.log(iconSenha);

iconSenha.forEach(icon => {
    icon.addEventListener('click', function() {
        const input = icon.parentElement.querySelector('.form_control');
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle('fa-eye-slash');
        icon.classList.toggle('fa-eye');
    })
});

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const iconError = '<i class="fa-solid fa-circle-exclamation"></i>';
    const nome = document.querySelector('#nome');
    const nomeValue = nome.value;
    const inputBox = nome.closest(".input_box");
    const errorSpan = inputBox.querySelector(".erro");
    errorSpan.innerHTML = '';
    inputBox.classList.remove('invalid');
    inputBox.classList.add('valid');

    if(isEmpty(nomeValue)){
        errorSpan.innerHTML = `${iconError} O campo é obrigatório!`;
        inputBox.classList.remove('valid');
        inputBox.classList.add('invalid');
        return;
    }
});

function isEmpty(value) {
    return value === '';
}