<?php
declare(strict_types=1);
namespace App\Service;

use App\Service\Data\UserData;
use App\Entity\User;

interface UserServiceInterface
{
    public function saveUser(
        string $firstName, 
        string $lastName, 
        string $email, 
        ?string $phone, 
        string $password
    ): int;

    public function updateUser(
        int $userId,
        ?string $firstName,
        ?string $lastName,
        ?string $email,
        ?string $phone,
        ?string $imagePath
    ): void;
    public function getUser(int $userId): User;

    public function deleteUser(int $userId): void;

    public function listUsers(): array;

    public function getUserByEmail(string $email): ?User;
    public function getUserByPhone(string $phone): ?User;
    public function validateImage(array $userData): bool;
    public function validateEmail(array $userData): bool;
    public function validatePhone(array $userData): bool;
}
