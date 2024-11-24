<?php
declare(strict_types=1);
namespace App\Entity;

use App\Entity\User;
use App\Entity\Pizza;
class Basket
{
    public function __construct(
        private int $userId,
        private int $pizzaId, 
        private int $pizzaDiameter, 
        private int $pizzaCount,
        private string $pizzaDough,
        private ?User $user,
        private ?Pizza $pizza,
        )
    {
    }
    public function getUserId(): int
    {
        return $this->userId;
    }
    public function getPizzaId(): int
    {
        return $this->pizzaId;
    }
    public function getUser(): User
    {
        return $this->user;
    }
    public function getPizza(): Pizza
    {
        return $this->pizza;
    }
    public function getPizzaDiameter(): int
    {
        return $this->pizzaDiameter;
    }
    public function getPizzaDough(): string
    {
        return $this->pizzaDough;
    }
    public function getPizzaCount(): int
    {
        return $this->pizzaCount;
    }
    public function setPizzaDiametr(int $pizzaDiametr): void
    {
        if (!empty($pizzaDiametr)){
            $this->pizzaDiametr = $pizzaDiametr;
        }    
    }  
    public function setPizzaCount(int $pizzaCount): void
    {
        if (!empty($pizzaCount)) {
            $this->pizzaCount = $pizzaCount;
        }
    }
}