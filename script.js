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