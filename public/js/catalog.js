function setDiameter(e, diameter)
{
    pizza_diameters = e.target.parentNode.querySelectorAll('.pizza__diameter')
    pizza_diameters.forEach(pizza_diameter => {
        if (pizza_diameter !== e.target)
        {
            pizza_diameter.classList.remove('pizza__diameter_selected')
        }
    })
    e.target.classList.add('pizza__diameter_selected')
    pizza = e.target.parentNode.parentNode.parentNode
    pizza_price = pizza.querySelector('.pizza__price')
    pizza_list.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            pizza_data['pizza_diameter'] = diameter
            pizza_data['pizza_price'] = pizza_data['pizza_diameters'][diameter]
            pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
            return
        }
    })  
}

function setDough(e, dough)
{
    pizza_dough_list = e.target.parentNode.querySelectorAll('.pizza__dough')
    pizza_dough_list.forEach(pizza_dough => {
        if (pizza_dough !== e.target)
        {
            pizza_dough.classList.remove('pizza__dough_selected')
        }
    })
    e.target.classList.add('pizza__dough_selected')
    pizza = e.target.parentNode.parentNode.parentNode

    pizza_list.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            pizza_data['pizza_dough'] = dough
            return
        }
    })  
}

function addCount(e)
{
    pizza = e.target.parentNode.parentNode.parentNode
    pizza_count = pizza.querySelector('.pizza__count')
    pizza_price = pizza.querySelector('.pizza__price')

    pizza_list.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            pizza_data['pizza_count'] += 1
            pizza_count.textContent = pizza_data['pizza_count']
            pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
            return
        }
    })  
}

function subCount(e)
{
    pizza = e.target.parentNode.parentNode.parentNode
    pizza_count = pizza.querySelector('.pizza__count')
    pizza_price = pizza.querySelector('.pizza__price')

    pizza_list.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
            if (pizza_data['pizza_count'] > 1)
            {
                pizza_data['pizza_count'] -= 1
                pizza_count.textContent = pizza_data['pizza_count']
                pizza_price.textContent = pizza_data['pizza_count'] * pizza_data['pizza_price'] + '₽'
            }
            return
        }
    })      
}

function addPizzaToBasket(e) {
    pizza = e.target.parentNode
    pizza_list.forEach(pizza_data => {
        if (pizza_data['pizza'] === pizza)
        {
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
            .catch(error => console.log('Ошибка:', error));
            return
        }
    })     
}
pizza_list = []
document.addEventListener('DOMContentLoaded', (event) => {
    pizza_diameter_list = document.querySelectorAll('.pizza__diameter')
    pizza_dough_list = document.querySelectorAll(".pizza__dough")
    pizza_count_sub_list = document.querySelectorAll(".pizza__count-sub")
    pizza_count_add_list = document.querySelectorAll(".pizza__count-add")
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
        if (pizza_dough.getAttribute('data-name') == 'standard')
        {
            pizza_dough.addEventListener('click', (e) => { setDough(e, 'standard') })
        } else
        { 
            pizza_dough.addEventListener('click', (e) => { setDough(e, 'thin') })
        }
    })
    pizza_count_sub_list.forEach(pizza_count_sub => {
        pizza_count_sub.addEventListener('click', (e) => { subCount(e) })
    })
    pizza_count_add_list.forEach(pizza_count_add => {
        pizza_count_add.addEventListener('click', (e) => { addCount(e) })
    })
    buttons = document.querySelectorAll('.pizza__button-in-basket')
    buttons.forEach(button => {
        button.addEventListener('click', (e) => { addPizzaToBasket(e) })
    })     

    pizzas = document.querySelectorAll('.pizza')
    pizzas.forEach(pizza => {
        pizza_price = pizza.getAttribute('data-pizza-price')
        pizza_daiameters = {
            '20': Math.floor(pizza_price / 2.1),
            '30': +pizza_price,
            '45': Math.floor(pizza_price * 2.1)
        } 
        pizza_data = {
            'pizza': pizza,
            'pizza_id': +pizza.getAttribute('data-pizza-id'),
            'pizza_count': 1,
            'pizza_dough': 'standard',
            'pizza_diameter': 20,
            'pizza_price': +pizza_daiameters[20],
            'pizza_diameters': pizza_daiameters,
        }
        pizza_list.push(pizza_data)
    })
})