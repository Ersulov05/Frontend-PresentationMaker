<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserServiceInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
class UserService implements UserServiceInterface
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function saveUser(string $firstName, string $lastName, string $email, 
        ?string $phone, string $password): int
    {
        $user = new User(
            null,
            $firstName,
            $lastName,
            false,
            0,
            $email,
            $phone,
            $password,
            null,
            new ArrayCollection(),
            new ArrayCollection(),
        );
        return $this->userRepository->store($user);
    }

    public function getUser(int $postId): User
    {
        $user = $this->userRepository->findById($postId);
        if ($user === null)
        {
            //throw $this->createNotFoundException();
            throw new \RuntimeException('User not found');
        }

        return $user;
    }

    public function updateUser(int $userId, ?string $firstName, ?string $lastName,
        ?string $email, ?string $phone, ?string $imagePath): void
    {
        $user = $this->userRepository->findById($userId);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setImagePath($imagePath);
        $this->userRepository->store($user);
    }

    public function deleteUser(int $userId): void
    {
        $user = $this->userRepository->findById($userId);
        $this->userRepository->delete($user);
    }

    public function listUsers(): array
    {
        
        return $this->userRepository->listAll();
    }

    public function getUserByEmail(string $email): ?User
    {
        return $this->userRepository->findByEmail($email);
    }
    public function getUserByPhone(string $phone): ?User
    {
        return $this->userRepository->findByPhone($phone);
    }

    public function validateImage(array $userData): bool
    {
        if (isset($userData['image']))
        {
            if (strlen($userData['image']) !== '')
            {
                return true;
            }
        }
        return false;
    }

    public function validateEmail(array $userData): bool
    {
        if (isset($userData['email']))
        {
            if (filter_var($userData['email'], FILTER_VALIDATE_EMAIL))
            {
                return true;
            }
        }
        return false;
    }
    public function validatePhone(array $userData): bool
    {
        $regexp = '/^\b[1-9]\d{10}\b$/'; 
        if (isset($userData['phone']))
        {
            if (preg_match($regexp, $userData['phone'])) {
                return true;
            } 
        }
        return false;
    }
}
