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
    const fields = [
        {
            id: 'nome',
            label: 'Nome',
            validador: nameIsValid
        },
        {
            id: 'sobrenome',
            label: 'Sobrenome',
            validador: nameIsValid
        },
        {
            id: 'nascimento',
            label: 'Nascimento',
            validador: dateIsValid
        },
        {
            id: 'email',
            label: 'E-mail',
            validador: emailIsValid
        },
        {
            id: 'senha',
            label: 'Senha',
            validador: passwordIsSecure
        },
        {
            id: 'confirmarsenha',
            label: 'Confirmar Senha',
            validador: passwordMatch
        }
    ]
    const iconErro = '<i class="fa-solid fa-circle-exclamation"></i>';
    fields.forEach(function(field){
        const input = document.getElementById(field.id);
        const inputValue = input.value;
        const inputBox = input.closest(".input_box");

        const errorSpan = inputBox.querySelector(".erro");
        errorSpan.innerHTML = '';
        
        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidador = field.validador(inputValue);
        if(!fieldValidador.isValid){
            errorSpan.innerHTML = `${iconErro} ${fieldValidador.errorMensagem}`;
            inputBox.classList.remove('valid');
            inputBox.classList.add('invalid');
            return;
        }
    })

    const genero = document.getElementsByName('genero');
    const radioContainer = document.querySelector('.radio_container');
    const generoErroSpan = radioContainer.querySelector('.erro');

    const selectGenero = [...genero].find(input => input.checked);
    radioContainer.classList.add('invalid');
    radioContainer.classList.remove('valid');
    generoErroSpan.innerHTML = `${iconErro} Selecione um gênero!`;

    if(selectGenero){
        radioContainer.classList.add('valid');
        radioContainer.classList.remove('invalid');
        generoErroSpan.innerHTML = '';
        return;
    }
});

function isEmpty(value) {
    return value === '';
}

function nameIsValid(value) {
    const validador = {
        isValid: true,
        errorMensagem: null
    };
    const min = 3;

    if (isEmpty(value)) {
        validador.errorMensagem = `O campo é obrigatório!`;
        validador.isValid = false;
        return validador;
    }

    if (value.length < min) {
        validador.errorMensagem = `O campo deve ter no mínimo ${min} caracteres!`;
        validador.isValid = false;
        return validador;
    }

    const regex = /^[a-zA-Z\u00C0-\u00FF\s]+$/
    if (!regex.test(value)){
        validador.isValid = false;
        validador.errorMensagem = `O campo deve conter apenas letras!`;
        return validador;
    }
    
    return validador;
}

function dateIsValid(value) {
    const validador = {
        isValid: true,
        errorMensagem: null
    }

    if(isEmpty(value)){
        validador.isValid = false;
        validador.errorMensagem = 'O nascimento é obrigatório!';
        return validador;
    }
    
    const year = new Date(value).getFullYear();
    if (year < 1920 || year > new Date().getFullYear){
        validador.isValid = false;
        validador.errorMensagem = 'Data invalida!';
        return validador;
    }
}

function emailIsValid(value){
    const validador = {
        isValid: true,
        errorMensagem: null
    }

    if(isEmpty(value)){
        validador.isValid = false;
        validador.errorMensagem = 'O e-mail é obrigatório!';
        return validador;
    }

    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if (!regex.test(value)){
        validador.isValid = false;
        validador.errorMensagem = `O e-mail precisa ser válido!`;
        return validador;
    }
    
    return validador;
}

function passwordIsSecure(value){
    const validador = {
        isValid: true,
        errorMensagem: null
    }

    if(isEmpty(value)){
        validador.isValid = false;
        validador.errorMensagem = 'A senha é obrigatória!';
        return validador;
    }
    
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!regex.test(value)){
        validador.isValid = false;
        validador.errorMensagem = `Sua senha deve conter ao menos: <br/>
        8 dígitos <br/>
        1 letra minúscula <br/>
        1 letra maiúscula <br/>
        1 número <br/>
        1 caractere especial`;
        return validador;
    }
    
    return validador;
}

function passwordMatch(value){
    const validador = {
        isValid: true,
        errorMensagem: null
    }

    const passwordValue = document.getElementById('senha').value;
    if (value === '' || passwordValue !== value) {
        validador.isValid = false;
        validador.errorMensagem = 'As senhas não conferem!';
        return validador;
    }
    
    return validador;
}