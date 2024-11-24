<?php
declare(strict_types=1);
namespace App\Service;
use App\Entity\Order;
interface OrderedPizzaServiceInterface
{
    public function addPizzaToOrder(
        Order $order,
        string $pizzaName,
        int $pizzaDiameter,
        string $pizzaDough,
        int $pizzaCount,
        int $pizzaPrice
    );
}