<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class UserRepository
{
    private \PDO $connection;

    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(User::class);
    }

    public function store(User $user): int
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user->getId();
    }

    public function findById(int $id): ?User
    {
        return $this->repository->findOneBy(['userId' => (string) $id]);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->repository->findOneBy(['userEmail' => (string) $email]);
    }

    public function findByPhone(string $phone): ?User
    {
        return $this->repository->findOneBy(['userPhone' => (string) $phone]);
    }

    public function delete(User $user): void
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }

    public function listAll(): array
    {
        return $this->repository->findAll();
    }
}