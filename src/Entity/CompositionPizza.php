<?php
declare(strict_types=1);
namespace App\Entity;
use App\Entity\Pizza;
use App\Entity\Ingredient;
class CompositionPizza
{
    public function __construct(
        private int $pizzaId, 
        private int $ingredientId, 
        private int $ingredientGramm,
        private Ingredient $ingredient,
        private Pizza $pizza,
    )
    {
    }
    public function getIngredientId(): int
    {
        return $this->ingredientId;
    }
    public function getPizzaId(): int
    {
        return $this->pizzaId;
    }

    public function getIngredient(): Ingredient
    {
        return $this->ingredient;
    }
    public function getPizza(): Pizza
    {
        return $this->pizza;
    }

    public function getIngredientGramm(): int
    {
        return $this->ingredientGramm;
    }
    public function setIngredientGramm(int $ingredientGramm): void
    {
        if (!empty($ingredientGramm)){
            $this->ingredientGramm = $ingredientGramm;
        }    
    }  
}