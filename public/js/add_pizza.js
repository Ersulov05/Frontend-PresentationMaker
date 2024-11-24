let pizza_image = ""

function previewPizzaImage() {
    const pizza_preview = document.getElementById('preview-pizza-image')
    const pizza = document.querySelector('.pizza')
    const upload_text = document.querySelector('.pizza__image-text')
    const file = document.getElementById("load-pizza-image").files[0]
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            pizza_image = reader.result
            pizza_preview.src = reader.result
            upload_text.style.display = 'none'
            pizza_preview.style.width = '100%'
            pizza_preview.style.padding = '0'
        },
        false,
    );

    if (file) {
        reader.readAsDataURL(file)
    }
}

function selectIngredient(element)
{
    if (element.className !== 'ingredient__input-gramm')
    {
        while (!element.classList.contains('ingredient'))
        {
            element = element.parentNode
        }
        if (element.classList.contains('ingredient_selected'))
        {
            element.classList.remove('ingredient_selected')
            element.querySelector('.ingredient__input-gramm').disabled = true
        } else {
            element.classList.add('ingredient_selected')
            element.querySelector('.ingredient__input-gramm').disabled = false
        }
    }  
}

function addIngredientToPizza(ingredient_id, ingredient_gramm, pizza_id) {
    console.log('+')
    json_arr = {
        "pizza_id": +pizza_id,
        "ingredient_id": +ingredient_id,
        "ingredient_gramm": +ingredient_gramm,
    }
    console.log('yes', json_arr)
    fetch('/api/add_ingredient_to_pizza', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json_arr) // Ваши данные для отправки
    })
    .then(res => {
        if (res.ok) { 
            console.log('good')
        } else {
            console.log('error')
        }
        if (res.status === 400) {
            // Если сервер вернул ошибку 400, получаем тело ответа в формате JSON
            return res.json().then(errorData => {                         
                throw new Error(errorData.message || 'Неизвестная ошибка');
            });
        }  
    })
    .catch(error => console.log('Ошибка:', error));
}

function addPizza(element)
{
    console.log('add')
    const pizza_input_name = document.getElementById('form-pizza-name')
    const pizza_textarea_description = document.getElementById('form-pizza-description')
    const pizza_input_price = document.getElementById('form-pizza-price')
    let pizza_name = pizza_input_name.value.trim()
    let pizza_description = pizza_textarea_description.value.trim()
    let pizza_price = pizza_input_price.value.trim()
    let isValid = true

    ingredients_selected =[]
    ingredients_list.forEach(ingredient_data => {
        if (ingredient_data['ingredient'].classList.contains('ingredient_selected')) {
            ingredient_gramm = ingredient_data['ingredient'].querySelector('.ingredient__input-gramm')
            ingredient_gramm_value = ingredient_gramm.value.trim()
            if (ingredient_gramm_value > 0) {
                ingredient_data['ingredient_gramm'] = ingredient_gramm_value
                ingredients_selected.push(ingredient_data)
            } else {
                isValid = false
            }
        }
    })
    console.log(ingredients_selected)
    if (pizza_name === '') {
        console.log('no pizza name')
        isValid = false
    }
    if (pizza_description === '') {
        console.log('no pizza description')
        isValid = false
    }
    if (pizza_price === '') {
        console.log('no pizza price')
        isValid = false
    }
    if (pizza_image === "") {
        console.log('no pizza image')
        isValid = false
    }
    if (isValid) {
        json_arr = {
            "pizza_name": pizza_name,
            "pizza_description": pizza_description,
            "pizza_image": pizza_image,
            "pizza_price": pizza_price,
        }
        console.log('yes', json_arr)
        fetch('/api/pizza/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json_arr) // Ваши данные для отправки
        })
        .then(res => {
            if (res.ok) { 
                console.log('good')
                res.json().then(data => {
                    pizza_id = data.pizza_id
                    console.log(pizza_id)
                    ingredients_selected.forEach(ingredient_data => {
                        addIngredientToPizza(ingredient_data['ingredient_id'], ingredient_data['ingredient_gramm'], pizza_id)
                    })
                }) 
                window.location.href = '/catalog';
            } else {
                console.log('error')
                //criticalData()
                //login_button.disabled = false
            }
            if (res.status === 400) {
                // Если сервер вернул ошибку 400, получаем тело ответа в формате JSON
                return res.json().then(errorData => {                         
                    //console.log(errorData.email)
                    throw new Error(errorData.message || 'Неизвестная ошибка');
                });
            }  
        })
        .catch(error => console.log('Ошибка:', error));
    }
}
ingredients_list = []
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("load-pizza-image").addEventListener("change", () => previewPizzaImage())
    ingredients = document.querySelectorAll('.ingredient')
    ingredients.forEach(ingredient => {
        ingredient_data = {
            'ingredient': ingredient,
            'ingredient_id': +ingredient.getAttribute('data-ingredient-id'),
            'ingredient_gramm': 0,
        }
        ingredient.addEventListener('click', (e) => {
            selectIngredient(e.target)
            console.log(ingredients_list)
        }) 
        ingredients_list.push(ingredient_data)
    });
    document.querySelector('.pizza-info__button-add-to-catalog').addEventListener('click', (e) => {
        addPizza(e.target)
    })
})