<?php
declare(strict_types=1);
namespace App\Service;

// use App\Service\Data\UserData;


interface CompositionPizzaServiceInterface
{
    public function addIngredientToPizza(int $pizzaId, int $ingredientId, int $ingredientGramm);
}
