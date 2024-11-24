<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\Order;
use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\UserRepository;
use App\Service\OrderServiceInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
class OrderService implements OrderServiceInterface
{
    private OrderRepository $orderRepository;
    private UserRepository $userRepository;

    public function __construct(OrderRepository $orderRepository, UserRepository $userRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->userRepository = $userRepository;
    }

    public function saveOrder(User $user, string $orderDeliveryAddress): int
    {
        $order = new Order(
            null,
            $user->getId(),
            $orderDeliveryAddress,
            new \DateTime(),
            false,
            $user,
            new ArrayCollection(),
        );
        return $this->orderRepository->store($order);
    }

    public function getOrder(int $orderId): Order
    {
        $order = $this->orderRepository->findById($orderId);
        if ($order === null)
        {
            throw new \RuntimeException('User not found');
        }

        return $order;
    }
    public function listOrders(): array
    {
        return $this->userRepository->listAll();
    }

    public function validateOrderData(array $orderData): bool
    {
        if (isset($orderData['order_delivery_address']))
        {
            if (strlen($orderData['order_delivery_address']) > 0)
            {
                return true;
            }
        }
        return false;
    }
}
