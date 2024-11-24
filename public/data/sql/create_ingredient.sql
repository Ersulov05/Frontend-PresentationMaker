CREATE TABLE ingredient (
`ingredient_id` INT   NOT NULL AUTO_INCREMENT,
`ingredient_name`  VARCHAR(255) NOT NULL, 
`ingredient_calorie` INT NOT NULL, 
`ingredient_image_path` VARCHAR(255) NOT NULL,  
PRIMARY KEY (`ingredient_id`)
);