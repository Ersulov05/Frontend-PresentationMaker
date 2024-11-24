<?php
declare(strict_types=1);
namespace App\Service;

interface AuthServiceInterface
{
    public function checkSession(): ?int;
    public function setSession(int $userId);
    public function destroySession();
    public function getJsonAsArray(): array;
    public function validateEmail(array $userData): bool;
    public function validatePhone(array $userData): bool;
    public function validatePassword(array $userData): bool;
    public function validatePersonalData(array $userData): bool;
}