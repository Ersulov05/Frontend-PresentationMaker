function setDiameter(e, diameter)
{
    element = e.target
    while (!element.classList.contains('pizza-info__diameter-item'))
    {
        element = element.parentNode
    }
    pizza_diameters = element.parentNode.querySelectorAll('.pizza-info__diameter-item')
    pizza_diameters.forEach(pizza_diameter => {
        if (pizza_diameter !== element)
        {
            pizza_diameter.classList.remove('pizza-info__diameter-item_selected')
        }
    })
    element.classList.add('pizza-info__diameter-item_selected')
    pizza_price = document.querySelector('.pizza-info__itog-price')
    pizza_data['pizza_diameter'] = diameter
    pizza_data['pizza_price'] = pizza_data['pizza_diameters'][diameter]
    pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
}

function setDough(e, dough)
{
    pizza_dough_list = e.target.parentNode.querySelectorAll('.pizza-info__dough')
    pizza_dough_list.forEach(pizza_dough => {
        if (pizza_dough !== e.target)
        {
            pizza_dough.classList.remove('pizza-info__dough_selected')
        }
    })
    e.target.classList.add('pizza-info__dough_selected')
    pizza_data['pizza_dough'] = dough 
}

function addCount(e)
{
    pizza_count = document.querySelector('.pizza-info__count')
    pizza_price = document.querySelector('.pizza-info__itog-price')
    pizza_data['pizza_count'] += 1
    pizza_count.textContent = pizza_data['pizza_count']
    pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
}

function subCount(e)
{
    pizza_count = document.querySelector('.pizza-info__count')
    pizza_price = document.querySelector('.pizza-info__itog-price')
    if (pizza_data['pizza_count'] > 1)
    {
        pizza_data['pizza_count'] -= 1
        pizza_count.textContent = pizza_data['pizza_count']
        pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
    }
}

function addPizzaToBasket(e) {
    json_arr = {
        'pizza_id': +pizza_data['pizza_id'],
        'pizza_diameter': +pizza_data['pizza_diameter'],
        'pizza_dough': pizza_data['pizza_dough'],
        'pizza_count': +pizza_data['pizza_count']
    }
    fetch('/api/add_pizza_to_basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json_arr) // Ваши данные для отправки
    })
    .then(res => {
        if (res.ok) { 
            console.log('good')
            //window.location.href = '/catalog';
        } else {
            console.log('error')
        }
        if (res.status === 400) {
            // Если сервер вернул ошибку 401, получаем тело ответа в формате JSON
            return res.json().then(errorData => {                         
                //console.log(errorData.email)
                throw new Error(errorData.message || 'Неизвестная ошибка');
            });
        }  
    })
    .catch(error => console.log('Ошибка:', error))     
}

function deletePizza(e)
{
    json_arr = {
        'pizza_id': +pizza_data['pizza_id'],
    }
    fetch('/api/pizza/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json_arr) // Ваши данные для отправки
    })
    .then(res => {
        if (res.ok) { 
            console.log('good')
            window.location.href = '/catalog';
        } else {
            console.log('error')
        }
        if (res.status === 400) {
            return res.json().then(errorData => {                         
                throw new Error(errorData.message || 'Неизвестная ошибка');
            });
        }  
    })
    .catch(error => console.log('Ошибка:', error))   
    e.target
}
pizza_data = {}
document.addEventListener('DOMContentLoaded', (event) => {
    pizza_diameter_list = document.querySelectorAll('.pizza-info__diameter-item')
    pizza_dough_list = document.querySelectorAll(".pizza-info__dough")
    document.querySelector(".pizza-info__count-sub").addEventListener('click', (e) => { subCount(e) })
    document.querySelector(".pizza-info__count-add").addEventListener('click', (e) => { addCount(e) })
    pizza_diameter_list.forEach(pizza_diameter => {
        if (pizza_diameter.getAttribute('data-diameter') == '20') {
            pizza_diameter.addEventListener('click', (e) => { setDiameter(e, 20) })
        }
        if (pizza_diameter.getAttribute('data-diameter') == '30') {
            pizza_diameter.addEventListener('click', (e) => { setDiameter(e, 30) })
        }
        if (pizza_diameter.getAttribute('data-diameter') == '45') {
            pizza_diameter.addEventListener('click', (e) => { setDiameter(e, 45) })
        }   
    })
    pizza_dough_list.forEach(pizza_dough => {
        if (pizza_dough.getAttribute('data-dough') == 'standard')
        {
            pizza_dough.addEventListener('click', (e) => { setDough(e, 'standard') })
        } else
        { 
            pizza_dough.addEventListener('click', (e) => { setDough(e, 'thin') })
        }
    })
    document.querySelector('.pizza-info__button-in-basket').addEventListener('click', (e) => { addPizzaToBasket(e) })    
    document.querySelector('.pizza-info__button-delete').addEventListener('click', (e) => { deletePizza(e) })    
    pizza = document.querySelector('.pizza-info')
    pizza_price = pizza.getAttribute('data-pizza-price')
    pizza_daiameters = {
        '20': Math.floor(pizza_price / 2.1),
        '30': +pizza_price,
        '45': Math.floor(pizza_price * 2.1)
    } 
    pizza_data = {
        'pizza_id': +pizza.getAttribute('data-pizza-id'),
        'pizza_count': 1,
        'pizza_dough': 'standard',
        'pizza_diameter': 20,
        'pizza_price': +pizza_daiameters[20],
        'pizza_diameters': pizza_daiameters,
    }
})