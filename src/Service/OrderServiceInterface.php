<?php
declare(strict_types=1);
namespace App\Service;

use App\Service\Data\UserData;
use App\Entity\Order;
use App\Entity\User;

interface OrderServiceInterface
{
    public function saveOrder(User $user, string $orderDeliveryAddress): int;
    public function validateOrderData(array $orderData): bool;

    public function getOrder(int $orderId): Order;
    public function listOrders(): array;
}
