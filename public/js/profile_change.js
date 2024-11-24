const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu


let user_image = "no"

function previewUserImage() {
    const user_preview = document.getElementById('preview-user-image')
    const upload_text = document.querySelector('.profile-block__image-text')
    const file = document.getElementById("load-user-image").files[0]
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            user_image = reader.result
            user_preview.src = reader.result
            upload_text.style.display = 'none'
            user_preview.style.width = '100%'
            user_preview.style.padding = '0'
            user_preview.style.borderRadius = '30px'
        },
        false,
    );

    if (file) {
        reader.readAsDataURL(file)
    }
}

function deleteImage() {
    user_image = 'empty'
    const user_preview = document.getElementById('preview-user-image')
    const upload_text = document.querySelector('.profile-block__image-text')
    user_preview.style = 'border-radius: 0;'
    upload_text.style = ''
    user_preview.src = '/images/user/user.svg'
}

function validateFields()
{
    const email_critical = document.getElementById("input-email-critical")
    const phone_critical = document.getElementById("input-phone-critical")
    const first_name_critical = document.getElementById("input-first-name-critical")
    const last_name_critical = document.getElementById("input-last-name-critical")

    const email_block = document.getElementById("form-email")
    const phone_block = document.getElementById("form-phone")
    const first_name_block = document.getElementById("form-first-name")
    const last_name_block = document.getElementById("form-last-name")

    let email = email_block.value.trim()
    let phone = phone_block.value.trim()
    let first_name = first_name_block.value.trim()
    let last_name = last_name_block.value.trim()

    if (EMAIL_REGEXP.test(email) && (first_name.length > 0)
        && (last_name.length > 0) && (phone.length == 11 || ((phone.length == 12) && (phone[0] == '+'))))
    {
        email_block.classList.remove('profile-block__input-text-invalid')
        phone_block.classList.remove('profile-block__input-text-invalid')
        first_name_block.classList.remove('profile-block__input-text-invalid')
        last_name_block.classList.remove('profile-block__input-text-invalid')

        email_critical.classList.add('hidden');
        phone_critical.classList.add('hidden');
        first_name_critical.classList.add('hidden');
        last_name_critical.classList.add('hidden');
        json_arr = {
            "email": email,
            "phone": phone,
            "first_name": first_name,
            "last_name": last_name,
            "image": user_image,
        }
        return json_arr
    } else
    {
        if (EMAIL_REGEXP.test(email))
        {
            email_critical.classList.add('hidden')
            email_block.classList.remove('profile-block__input-text-invalid')
        }
        else {
            email_critical.classList.remove('hidden')
            email_block.classList.add('profile-block__input-text-invalid')
        }
        if (phone.length == 11)
        {
            phone_critical.classList.add('hidden')
            phone_block.classList.remove('profile-block__input-text-invalid')
        }
        else {
            console.log('phone' + phone)
            phone_critical.classList.remove('hidden')
            phone_block.classList.add('profile-block__input-text-invalid')
        }
        if (first_name.length > 0)
        {
            first_name_critical.classList.add('hidden')
            first_name_block.classList.remove('profile-block__input-text-invalid')
        }
        else {
            first_name_critical.classList.remove('hidden');
            first_name_block.classList.add('profile-block__input-text-invalid')
        }
        if (last_name.length > 0)
        {
            last_name_critical.classList.add('hidden');
            last_name_block.classList.remove('profile-block__input-text-invalid')
        }
        else {
            last_name_critical.classList.remove('hidden');
            last_name_block.classList.add('profile-block__input-text-invalid')
        }
        return false   
    }
}

function criticalData() {
    const email_critical = document.getElementById("input-email-critical")
    const email_block = document.getElementById("form-email")
    email_critical.classList.remove('hidden');
    email_block.classList.add('profile-block__input-text-invalid')
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("load-user-image").addEventListener("change", () => previewUserImage())
    let save_button = document.querySelector(".profile-block__button-save")
    document.querySelector(".profile-block__button-delete-image").addEventListener('click',() => deleteImage())
    save_button.addEventListener('click', (e) => {
        save_button.disabled = true
        console.log('validate: ')
        console.log(validateFields())
        json_arr = validateFields()
        if (json_arr)
        {
            console.log('yes', json_arr)
            fetch('/api/user_update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_arr) // Ваши данные для отправки
            })
                .then(res => {
                    if (res.ok) { 
                        console.log('good')
                        window.location.href = '/profile';
                    } else {
                        criticalData()
                        save_button.disabled = false
                    }
                    if (res.status === 400) {
                        return res.json().then(errorData => {                         
                            //console.log(errorData.email)
                            throw new Error(errorData.message || 'Неизвестная ошибка');
                        });
                    }  
                })
            .catch(error => console.log('Ошибка:', error));
        } else {
            save_button.disabled = false
        }
    })
    const eye = document.querySelector(".profile-block__password-eye")
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