<?php
declare(strict_types=1);
namespace App\Service;

interface BasketServiceInterface
{
    public function addPizzaToBasket(
        int $pizzaId,
        int $userId,
        int $pizzaDiameter,
        string $pizzaDough,
        int $pizzaCount
    );
    public function updatePizzaToBasket(
        int $userId,
        int $pizzaId,
        int $pizzaDiameter,
        string $pizzaDough,
        int $pizzaCount
    );
    public function deletePizzaFromBasket(
        int $userId, 
        int $pizzaId, 
        int $pizzaDiameter, 
        string $pizzaDough
    );
    public function clearUserBasket(int $userId);
    public function validateBasketData(array $basketData): bool;
}