CREATE TABLE composition_pizza (     
    pizza_id INT NOT NULL,     
    ingredient_id INT NOT NULL,
    ingredient_gramm INT NOT NULL,  
    PRIMARY KEY (pizza_id, ingredient_id),  
    FOREIGN KEY (pizza_id) REFERENCES pizza(pizza_id) ON DELETE CASCADE, 
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id) ON DELETE CASCADE
);