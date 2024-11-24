<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241123162648 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE baskets (pizza_count INT NOT NULL, user_id INT NOT NULL, pizza_id INT NOT NULL, pizza_diameter INT NOT NULL, pizza_dough VARCHAR(255) NOT NULL, INDEX IDX_DCFB21EFA76ED395 (user_id), INDEX IDX_DCFB21EFD41D1D42 (pizza_id), PRIMARY KEY(user_id, pizza_id, pizza_diameter, pizza_dough)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE composition_pizza (ingredient_gramm INT NOT NULL, pizza_id INT NOT NULL, ingredient_id INT NOT NULL, INDEX IDX_72AD3F10D41D1D42 (pizza_id), INDEX IDX_72AD3F10933FE08C (ingredient_id), PRIMARY KEY(pizza_id, ingredient_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE ingredient (ingredient_name VARCHAR(255) NOT NULL, ingredient_calorie INT NOT NULL, ingredient_image_path VARCHAR(255) DEFAULT NULL, ingredient_id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(ingredient_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE ordered_pizzas (order_id INT NOT NULL, pizza_name VARCHAR(255) NOT NULL, pizza_diameter INT NOT NULL, pizza_dough VARCHAR(255) NOT NULL, pizza_count INT NOT NULL, pizza_price INT NOT NULL, ordered_pizza_id INT AUTO_INCREMENT NOT NULL, INDEX IDX_C9F78F688D9F6D38 (order_id), PRIMARY KEY(ordered_pizza_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE orders (user_id INT NOT NULL, order_delivery_address VARCHAR(255) NOT NULL, order_date DATETIME NOT NULL, order_is_complete TINYINT(1) NOT NULL, order_id INT AUTO_INCREMENT NOT NULL, INDEX IDX_E52FFDEEA76ED395 (user_id), PRIMARY KEY(order_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE pizza (pizza_name VARCHAR(255) NOT NULL, pizza_description LONGTEXT NOT NULL, pizza_price INT NOT NULL, pizza_image_path VARCHAR(255) DEFAULT NULL, pizza_id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(pizza_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE user (user_first_name VARCHAR(255) NOT NULL, user_last_name VARCHAR(255) NOT NULL, user_points INT NOT NULL, user_is_admin TINYINT(1) NOT NULL, user_email VARCHAR(255) NOT NULL, user_phone VARCHAR(255) DEFAULT NULL, user_password VARCHAR(255) NOT NULL, user_image_path VARCHAR(255) DEFAULT NULL, user_id INT AUTO_INCREMENT NOT NULL, UNIQUE INDEX UNIQ_8D93D649550872C (user_email), UNIQUE INDEX UNIQ_8D93D649A68D6C85 (user_phone), PRIMARY KEY(user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE baskets ADD CONSTRAINT FK_DCFB21EFA76ED395 FOREIGN KEY (user_id) REFERENCES user (user_id)');
        $this->addSql('ALTER TABLE baskets ADD CONSTRAINT FK_DCFB21EFD41D1D42 FOREIGN KEY (pizza_id) REFERENCES pizza (pizza_id)');
        $this->addSql('ALTER TABLE composition_pizza ADD CONSTRAINT FK_72AD3F10D41D1D42 FOREIGN KEY (pizza_id) REFERENCES pizza (pizza_id)');
        $this->addSql('ALTER TABLE composition_pizza ADD CONSTRAINT FK_72AD3F10933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id)');
        $this->addSql('ALTER TABLE ordered_pizzas ADD CONSTRAINT FK_C9F78F688D9F6D38 FOREIGN KEY (order_id) REFERENCES orders (order_id)');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEEA76ED395 FOREIGN KEY (user_id) REFERENCES user (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE baskets DROP FOREIGN KEY FK_DCFB21EFA76ED395');
        $this->addSql('ALTER TABLE baskets DROP FOREIGN KEY FK_DCFB21EFD41D1D42');
        $this->addSql('ALTER TABLE composition_pizza DROP FOREIGN KEY FK_72AD3F10D41D1D42');
        $this->addSql('ALTER TABLE composition_pizza DROP FOREIGN KEY FK_72AD3F10933FE08C');
        $this->addSql('ALTER TABLE ordered_pizzas DROP FOREIGN KEY FK_C9F78F688D9F6D38');
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEEA76ED395');
        $this->addSql('DROP TABLE baskets');
        $this->addSql('DROP TABLE composition_pizza');
        $this->addSql('DROP TABLE ingredient');
        $this->addSql('DROP TABLE ordered_pizzas');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE pizza');
        $this->addSql('DROP TABLE user');
    }
}
