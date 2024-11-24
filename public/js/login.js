const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

function validateFields()
{
    const critical = document.querySelector(".critical")
    const critical_image = document.querySelector(".critical__image")
    const critical_description = document.querySelector(".critical__description")
    const email_critical = document.getElementById("input-email-critical")
    const password_critical = document.getElementById("input-password-critical")
    const email_block = document.getElementById("form-email")
    const password_block = document.getElementById("form-password")
    let email = email_block.value.trim()
    let password = password_block.value.trim()
    if (EMAIL_REGEXP.test(email) && (password.length >= 6))
    {
        critical.classList.add('hidden');
        critical_image.classList.add('hidden');
        critical_description.classList.add('hidden');
        email_block.classList.remove('login-block__input-text-invalid')
        password_block.classList.remove('login-block__input-text-invalid')
        email_critical.classList.add('hidden');
        password_critical.classList.add('hidden');
        json_arr = {
            "email": email,
            "password": password,
        }
        return json_arr
    } else
    {
        critical.classList.remove('hidden');
        critical_image.classList.remove('hidden');
        critical_description.classList.remove('hidden');
        if (EMAIL_REGEXP.test(email))
        {
            email_critical.classList.add('hidden');
            email_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            email_critical.classList.remove('hidden');
            email_block.classList.add('login-block__input-text-invalid')
        }
        if (password.length >= 6)
        {
            password_critical.classList.add('hidden');
            password_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            password_critical.classList.remove('hidden');
            password_block.classList.add('login-block__input-text-invalid')
        }
        critical_description.innerHTML = 'A-Ah! Check all fields.'
        return false   
    }
}

function criticalData() {
    const critical = document.querySelector(".critical")
    const critical_image = document.querySelector(".critical__image")
    const critical_description = document.querySelector(".critical__description")
    const email_critical = document.getElementById("input-email-critical")
    const password_critical = document.getElementById("input-password-critical")
    const email_block = document.getElementById("form-email")
    const password_block = document.getElementById("form-password")
    critical.classList.remove('hidden');
    critical_image.classList.remove('hidden');
    critical_description.classList.remove('hidden');
    critical_description.innerHTML = 'Email or password is incorrect.'
    password_critical.classList.remove('hidden');
    password_block.classList.add('login-block__input-text-invalid')
    email_critical.classList.remove('hidden');
    email_block.classList.add('login-block__input-text-invalid')
}

document.addEventListener('DOMContentLoaded', (event) => {
    let login_button = document.querySelector(".login-block__login-button")
    login_button.addEventListener('click', (e) => {
        login_button.disabled = true
        console.log('validate: ')
        console.log(validateFields())
        json_arr = validateFields()
        if (json_arr)
        {
            console.log('yes', json_arr)
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_arr) // Ваши данные для отправки
            })
            .then(res => {
                if (res.ok) { 
                    window.location.href = '/catalog';
                } else {
                    criticalData()
                    login_button.disabled = false
                }
            })
            .catch(error => console.log('Ошибка:', error));
        } else
        {
            login_button.disabled = false
        }
    })
    const eye = document.querySelector(".login-block__password-eye")
    eye.addEventListener('click', (event) => { 
        const password_block = document.getElementById("form-password")
        if (password_block.getAttribute('type') == 'password'){
            eye.setAttribute('src', './images/eye-off.svg')
            password_block.setAttribute('type', 'text')
        } else {
            eye.setAttribute('src', './images/eye.svg')
            password_block.setAttribute('type', 'password')
        }   
    })
})