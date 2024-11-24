CREATE TABLE pizza (
`pizza_id` INT   NOT NULL AUTO_INCREMENT,
`pizza_name`  VARCHAR(255) NOT NULL, 
`pizza_description` TEXT NOT NULL, 
`pizza_price` INT NOT NULL, 
`pizza_image_path` VARCHAR(255) NOT NULL,  
PRIMARY KEY (`pizza_id`)
);