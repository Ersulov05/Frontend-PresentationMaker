function addCount(e)
{
    pizza = e.target.parentNode.parentNode.parentNode
    pizza_count = pizza.querySelector('.pizza__count-value')
    pizza_price = pizza.querySelector('.pizza__price')
    basket.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            pizza_data['pizza_count_new'] += 1
            pizza_count.textContent = pizza_data['pizza_count_new']
            pizza_price.textContent = pizza_data['pizza_count_new'] * pizza_data['pizza_price'] + '₽'
            if (pizza_data['pizza_count_new'] !== pizza_data['pizza_count']) {
                pizza.querySelector('.pizza__button-save').classList.remove('hidden-button')
            } else {
                pizza.querySelector('.pizza__button-save').classList.add('hidden-button')
            }
            return
        }
    })  
}

function subCount(e)
{
    pizza = e.target.parentNode.parentNode.parentNode
    pizza_count = pizza.querySelector('.pizza__count-value')
    pizza_price = pizza.querySelector('.pizza__price')
    basket.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            if (pizza_data['pizza_count_new'] > 1)
            {
                pizza_data['pizza_count_new'] -= 1
                pizza_count.textContent = pizza_data['pizza_count_new']
                pizza_price.textContent = pizza_data['pizza_count_new'] * pizza_data['pizza_price'] + '₽'
                if (pizza_data['pizza_count_new'] !== pizza_data['pizza_count']) {
                    pizza.querySelector('.pizza__button-save').classList.remove('hidden-button')
                } else {
                    pizza.querySelector('.pizza__button-save').classList.add('hidden-button')
                }
            }           
            return
        }
    })      
}

function updatePizzaToBasket(e)
{
    button = e.target
    pizza = button.parentNode.parentNode
    basket.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            pizza_data['pizza_count'] = pizza_data['pizza_count_new']
            button.classList.add('hidden-button')   
            
            

            json_arr = {
                'pizza_id': pizza_data['pizza_id'],
                'pizza_diameter': pizza_data['pizza_diameter'],
                'pizza_dough': pizza_data['pizza_dough'],
                'pizza_count': pizza_data['pizza_count']
            }
            console.log(json_arr)
            fetch('/api/update_pizza_to_basket', {
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
            .catch(error => console.log('Ошибка:', error));
            return
        }
    }) 
}

function deletePizzaFromBasket(e)
{
    console.log('delete')
    button = e.target
    button.disabled = true
    pizza = button.parentNode.parentNode
    console.log(pizza)
    for (let i = 0; i < basket.length; i++)
    {
        pizza_data = basket[i]
        if (pizza_data['pizza'] === pizza)
        {
            json_arr = {
                'pizza_id': pizza_data['pizza_id'],
                'pizza_diameter': pizza_data['pizza_diameter'],
                'pizza_dough': pizza_data['pizza_dough'],
                'pizza_count': pizza_data['pizza_count']
            }
            console.log(json_arr)
            fetch('/api/delete_pizza_from_basket', {
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
            .catch(error => console.log('Ошибка:', error));
            pizza.remove()
            basket.splice(i, 1)
            return
        }
    }
}

function validateFields()
{
    const delivery_addres_critical = document.getElementById("input-delivery-address-critical")
    const delivery_addres_block = document.getElementById("form-delivery-addres")
    let delivery_address = delivery_addres_block.value.trim()
    if (delivery_address.length > 0)
    {
        delivery_addres_critical.classList.add('hidden')
        delivery_addres_block.classList.remove('profile-block__input-text-invalid')
        json_arr = {
            "order_delivery_address": delivery_address,
        }
        return json_arr
    } else
    {
        delivery_addres_critical.classList.remove('hidden');
        delivery_addres_block.classList.add('profile-block__input-text-invalid')
        return false   
    }
}

function makeOrder(e) {
    e.target.disabled = true
    $json_arr = validateFields()
    if ($json_arr) {
        console.log(json_arr)
        fetch('/api/order/add', {
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
            e.target.disabled = false
            if (res.status === 400) {
                // Если сервер вернул ошибку 401, получаем тело ответа в формате JSON
                return res.json().then(errorData => {                         
                    //console.log(errorData.email)
                    throw new Error(errorData.message || 'Неизвестная ошибка');
                });
            }  
        })
        .catch(error => console.log('Ошибка:', error));
    } else {
        e.target.disabled = false
    }
}
let basket = []

document.addEventListener('DOMContentLoaded', (event) => {
    pizza_count_sub_list = document.querySelectorAll(".pizza__count-sub")
    pizza_count_add_list = document.querySelectorAll(".pizza__count-add")
    pizza_count_sub_list.forEach(pizza_count_sub => {
        pizza_count_sub.addEventListener('click', (e) => { subCount(e) })
    })
    pizza_count_add_list.forEach(pizza_count_add => {
        pizza_count_add.addEventListener('click', (e) => { addCount(e) })
    })
    delete_buttons = document.querySelectorAll('.pizza__button-delete')
    delete_buttons.forEach(button => {
        button.addEventListener('click', (e) => { deletePizzaFromBasket(e) })
    })  
    save_buttons = document.querySelectorAll('.pizza__button-save')
    save_buttons.forEach(button => {
        button.addEventListener('click', (e) => { updatePizzaToBasket(e) })
    })  
    pizzas = document.querySelectorAll('.pizza')
    pizzas.forEach(pizza => {
        pizza_price = pizza.getAttribute('data-pizza-price')
        pizza_diameter = pizza.getAttribute('data-pizza-diameter')
        pizza_daiameters = {
            '20': Math.floor(pizza_price / 2.1),
            '30': pizza_price,
            '45': Math.floor(pizza_price * 2.1)
        } 
        pizza_data = {
            'pizza': pizza,
            'pizza_id': +pizza.getAttribute('data-pizza-id'),
            'pizza_count': +pizza.getAttribute('data-pizza-count'),
            'pizza_count_new': +pizza.getAttribute('data-pizza-count'),
            'pizza_dough': pizza.getAttribute('data-pizza-dough'),
            'pizza_diameter': +pizza_diameter,
            'pizza_price': +pizza_daiameters[pizza_diameter],
        }
        basket.push(pizza_data)
    })
    document.querySelector('.order__button-send').addEventListener('click', (e) => { makeOrder(e) })
    console.log(basket)
})