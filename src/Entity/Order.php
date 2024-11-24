<?php
declare(strict_types=1);
namespace App\Entity;
//use Doctrine\ORM\PersistentCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\User;
class Order
{
    public function __construct(
        private ?int $orderId, 
        private int $userId, 
        private string $orderDeliveryAddress,
        private \DateTime $orderDate,  
        private bool $orderIsComplete,
        private User $user,
        private Collection $orderedPizzas,
        )
    {
    }
    public function getOrderId(): ?int
    {
        return $this->orderId;
    }
    public function getUserId(): int
    {
        return $this->userId;
    }
    public function getOrderedPizzas(): array {
        return $this->orderedPizzas->toArray();
    }

    public function getUser(): User
    {
        return $this->user;
    }
    public function getDeliveryAddres(): string
    {
        return $this->orderDeliveryAddress;
    }
    public function getDate(): string
    {
        return $this->orderDate->format('Y-m-d H:i:s');
    }
    public function getIsComplete(): bool
    {
        return $this->orderIsComplete;
    }
}