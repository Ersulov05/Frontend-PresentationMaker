<?php
declare(strict_types=1);
namespace App\Entity;
//use Doctrine\ORM\PersistentCollection;
use Doctrine\Common\Collections\Collection;
class User
{
    public function __construct(
        private ?int $userId, 
        private string $userFirstName, 
        private string $userLastName,
        private bool $userIsAdmin,  
        private int $userPoints,
        private string $userEmail, 
        private string $userPhone, 
        private string $userPassword,
        private ?string $userImagePath,
        private Collection $basket,
        private Collection $orders,
        )
    {
    }
    public function getId(): ?int
    {
        return $this->userId;
    }
    public function getBasket(): array {
        return $this->basket->toArray();
    }
    public function getOrders(): array {
        return $this->orders->toArray();
    }

    public function getPoints(): int
    {
        return $this->userPoints;
    }
    public function getFirstName(): string
    {
        return $this->userFirstName;
    }
    public function getLastName(): string
    {
        return $this->userLastName;
    }
    public function getIsAdmin(): bool
    {
        return $this->userIsAdmin;
    }
    public function getPassword(): string
    {
        return $this->userPassword;
    }
    public function getEmail(): string
    {
        return $this->userEmail;
    }
    public function getPhone(): string
    {
        return $this->userPhone;
    }
    public function getImagePath(): ?string
    {
        return $this->userImagePath;
    }
    public function setFirstName(?string $firstName): void
    {
        if (!empty($firstName)){
            $this->userFirstName = $firstName;
        }    
    }
    
    public function setLastName(?string $lastName): void
    {
        if (!empty($lastName)) {
            $this->userLastName = $lastName;
        }
    }
    public function setAdmin(bool $admin): void
    {
        $this->userIsAdmin = $admin;
    }
    public function setEmail(string $email): void
    {
        if (!empty($email)) {
            $this->userEmail = $email;
        }
    }
    public function setPhone(string $phone): void
    {
        if (!empty($phone)) {
            $this->userPhone = $phone;
        }
    }
    public function setImagePath(?string $imagePath): void
    {
        if (!empty($imagePath)) {
            if ($imagePath === 'empty'){
                $this->userImagePath = null;
            }
            else {
                $this->userImagePath = $imagePath;
            }
        }
    }
}