CREATE TABLE user     (         
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_first_name`  VARCHAR(255) NOT NULL,
    `user_last_name`   VARCHAR(255) NOT NULL,
    `user_points`   INT  DEFAULT 0,
    `user_is_admin`       BOOL DEFAULT FALSE, 
    `user_email` VARCHAR(255) NOT NULL,
    `user_phone`  VARCHAR(255) DEFAULT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_image_path`  VARCHAR(255) DEFAULT NULL, 
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `user_email_idx` (`user_email`),
    UNIQUE INDEX `user_phone_idx` (`user_phone`)
);