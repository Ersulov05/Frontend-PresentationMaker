<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\Pizza;

interface PizzaServiceInterface
{
    public function listPizzas(): array;
    public function getPizza(int $pizzaId): Pizza;
    public function validatePizzaData(array $pizzaData): bool;
    public function validateIngredientData(array $ingredientData): bool;
    public function savePizza(
        string $pizzaName,
        string $pizzaDescription,
        int $pizzaPrice,
        ?string $pizzaImagePath
    ): int;
    public function deletePizza(int $pizzaId): void;
}
