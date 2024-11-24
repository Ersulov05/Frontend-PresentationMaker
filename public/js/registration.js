const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

function validateFields()
{
    const critical = document.querySelector(".critical")
    const critical_image = document.querySelector(".critical__image")
    const critical_description = document.querySelector(".critical__description")

    const email_critical = document.getElementById("input-email-critical")
    const password_critical = document.getElementById("input-password-critical")
    const phone_critical = document.getElementById("input-phone-critical")
    const first_name_critical = document.getElementById("input-first-name-critical")
    const last_name_critical = document.getElementById("input-last-name-critical")

    const email_block = document.getElementById("form-email")
    const password_block = document.getElementById("form-password")
    const phone_block = document.getElementById("form-phone")
    const first_name_block = document.getElementById("form-first-name")
    const last_name_block = document.getElementById("form-last-name")

    let email = email_block.value.trim()
    let password = password_block.value.trim()
    let phone = phone_block.value.trim()
    let first_name = first_name_block.value.trim()
    let last_name = last_name_block.value.trim()

    if (EMAIL_REGEXP.test(email) && (password.length >= 8) && (first_name.length > 0)
        && (last_name.length > 0) && (phone.length == 11 || ((phone.length == 12) && (phone[0] == '+'))))
    {
        critical.classList.add('hidden');
        critical_image.classList.add('hidden');
        critical_description.classList.add('hidden');

        email_block.classList.remove('login-block__input-text-invalid')
        password_block.classList.remove('login-block__input-text-invalid')
        phone_block.classList.remove('login-block__input-text-invalid')
        first_name_block.classList.remove('login-block__input-text-invalid')
        last_name_block.classList.remove('login-block__input-text-invalid')

        email_critical.classList.add('hidden');
        password_critical.classList.add('hidden');
        phone_critical.classList.add('hidden');
        first_name_critical.classList.add('hidden');
        last_name_critical.classList.add('hidden');
        json_arr = {
            "email": email,
            "password": password,
            "phone": phone,
            "first_name": first_name,
            "last_name": last_name,
        }
        return json_arr
    } else
    {
        critical.classList.remove('hidden');
        critical_image.classList.remove('hidden');
        critical_description.classList.remove('hidden');
        if (EMAIL_REGEXP.test(email))
        {
            email_critical.classList.add('hidden')
            email_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            email_critical.classList.remove('hidden')
            email_block.classList.add('login-block__input-text-invalid')
        }
        if (password.length >= 8)
        {
            password_critical.classList.add('hidden')
            password_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            password_critical.classList.remove('hidden')
            password_block.classList.add('login-block__input-text-invalid')
        }
        if (phone.length == 11 || ((phone.length == 12) && (phone[0] == '+')))
        {
            phone_critical.classList.add('hidden')
            phone_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            console.log('phone' + phone)
            phone_critical.classList.remove('hidden')
            phone_block.classList.add('login-block__input-text-invalid')
        }
        if (first_name.length > 0)
        {
            first_name_critical.classList.add('hidden')
            first_name_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            first_name_critical.classList.remove('hidden');
            first_name_block.classList.add('login-block__input-text-invalid')
        }
        if (last_name.length > 0)
        {
            last_name_critical.classList.add('hidden');
            last_name_block.classList.remove('login-block__input-text-invalid')
        }
        else {
            last_name_critical.classList.remove('hidden');
            last_name_block.classList.add('login-block__input-text-invalid')
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
            fetch('/api/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_arr) // Ваши данные для отправки
            })
                .then(res => {
                    if (res.ok) { 
                        console.log('good')
                        window.location.href = '/catalog';
                    } else {
                        //console.log(res.text())
                        criticalData()
                        login_button.disabled = false
                    }
                    if (res.status === 401) {
                        // Если сервер вернул ошибку 401, получаем тело ответа в формате JSON
                        return res.json().then(errorData => {                         
                            //console.log(errorData.email)
                            throw new Error(errorData.message || 'Неизвестная ошибка');
                        });
                    }  
                })
            .catch(error => console.log('Ошибка:', error));
        } else {
            login_button.disabled = false
        }
    })
    const eye = document.querySelector(".login-block__password-eye")
    eye.addEventListener('click', (event) => { 
        const password_block = document.getElementById("form-password")
        if (password_block.getAttribute('type') == 'password'){
            eye.setAttribute('src', '/images/eye-off.svg')
            password_block.setAttribute('type', 'text')
        } else {
            eye.setAttribute('src', './images/eye.svg')
            password_block.setAttribute('type', 'password')
        }   
    })
})