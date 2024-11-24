<?php
declare(strict_types=1);
namespace App\Entity;

use App\Entity\Order;
class OrderedPizza
{
    public function __construct(
        private ?int $orderedPizzaId,
        private int $orderId,
        private string $pizzaName, 
        private int $pizzaDiameter, 
        private int $pizzaCount,
        private int $pizzaPrice,
        private string $pizzaDough,
        private Order $order,
        )
    {
    }
    public function getOrderId(): int
    {
        return $this->orderId;
    }
    public function getPizzaName(): string
    {
        return $this->pizzaName;
    }
    public function getOrder(): Order
    {
        return $this->order;
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
    public function getPizzaPrice(): int
    {
        return $this->pizzaPrice;
    }
}