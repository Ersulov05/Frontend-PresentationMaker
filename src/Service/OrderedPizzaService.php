<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\OrderedPizza;
use App\Entity\Order;
use App\Repository\OrderedPizzaRepository;
use App\Repository\OrderRepository;
use App\Service\OrderedPizzaServiceInterface;
// use App\Service\Data\UserData;
//use Doctrine\ORM\EntityManagerInterface;
//use Doctrine\ORM\EntityRepository;

class OrderedPizzaService implements OrderedPizzaServiceInterface
{
    private OrderedPizzaRepository $orderedPizzaRepository;
    private OrderRepository $orderRepository;

    public function __construct(OrderedPizzaRepository $orderedPizzaRepository, OrderRepository $orderRepository)
    {
        $this->orderedPizzaRepository = $orderedPizzaRepository;
        $this->orderRepository = $orderRepository;
    }

    public function addPizzaToOrder(Order $order, string $pizzaName, int $pizzaDiameter, 
        string $pizzaDough, int $pizzaCount, int $pizzaPrice)
    {
        $orderedPizza = new OrderedPizza(
            null,
            $order->getOrderId(),
            $pizzaName, 
            $pizzaDiameter, 
            $pizzaCount,
            $pizzaPrice,
            $pizzaDough,
            $order,
        );
        $this->orderedPizzaRepository->store($orderedPizza);
    }
}
