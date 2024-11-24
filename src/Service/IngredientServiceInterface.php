<?php
declare(strict_types=1);
namespace App\Service;

// use App\Service\Data\UserData;
use App\Entity\Ingredient;

interface IngredientServiceInterface
{
    public function listIngredients(): array;
    public function getIngredient(int $ingredientId): Ingredient;
}
