<?php
declare(strict_types=1);
namespace App\Entity;
use Doctrine\ORM\PersistentCollection;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
class Pizza
{
    // private $users;
    //private $users;
    public function __construct(
        private ?int $pizzaId, 
        private string $pizzaName, 
        private string $pizzaDescription,
        private int $pizzaPrice,  
        private ?string $pizzaImagePath,
        private Collection $basket,
        private Collection $composition,
        )
    { }

    public function getBaskets(): array {
        return $this->basket->toArray();
    }

    public function getComposition(): array {
        // Возвращаем пользователей в виде массива
        return $this->composition->toArray();
    }


    public function getId(): ?int
    {
        return $this->pizzaId;
    }
    public function getPizzaName(): string
    {
        return $this->pizzaName;
    }
    public function getPizzaDescription(): string
    {
        return $this->pizzaDescription;
    }
    public function getPizzaPrice(): int
    {
        return $this->pizzaPrice;
    }

    public function getPizzaImagePath(): ?string
    {
        return $this->pizzaImagePath;
    }
    public function setPizzaName(string $pizzaName): void
    {
        if (!empty($pizzaName)){
            $this->pizzaName = $pizzaName;
        }    
    }
    
    public function setPizzaDescription(string $pizzaDescription): void
    {
        if (!empty($pizzaDescription)) {
            $this->pizzaDescription = $pizzaDescription;
        }
    }
    public function setPizzaPrice(int $pizzaPrice): void
    {
        $this->pizzaPrice = $pizzaPrice;
    }
    public function setImagePath(string $pizzaImagePath): void
    {
        if (!empty($pizzaImagePath)) {
            $this->pizzaImagePath = $pizzaImagePath;
        }
    }

}