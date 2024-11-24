CREATE TABLE baskets (     
    user_id INT NOT NULL,     
    pizza_id INT NOT NULL,
    pizza_diameter INT NOT NULL,  
    pizza_dough VARCHAR(255) NOT NULL,  
    pizza_count INT NOT NULL, 
    PRIMARY KEY (user_id, pizza_id, pizza_diameter, pizza_dough),  
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE, 
    FOREIGN KEY (pizza_id) REFERENCES pizza(pizza_id) ON DELETE CASCADE
);