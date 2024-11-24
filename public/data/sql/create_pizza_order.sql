CREATE TABLE ordered_pizzas (   
    ordered_pizza_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,  
    pizza_name VARCHAR(255) NOT NULL,
    pizza_diameter INT NOT NULL,
    pizza_dough VARCHAR(255) NOT NULL,
    pizza_count INT NOT NULL,
    pizza_price INT NOT NULL, 
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE 
);