<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\CompositionPizza;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class CompositionPizzaRepository
{
    private \PDO $connection;

    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(CompositionPizza::class);
    }

    public function store(CompositionPizza $compositionPizza)
    {
        $this->entityManager->persist($compositionPizza);
        $this->entityManager->flush();
        //return $user->getId();
    }

    // public function findById(int $id): ?User
    // {
    //     return $this->repository->findOneBy(['id' => (string) $id]);
    // }

    // public function findByEmail(string $email): ?User
    // {
    //     return $this->repository->findOneBy(['email' => (string) $email]);
    // }

    // public function findByPhone(string $phone): ?User
    // {
    //     return $this->repository->findOneBy(['phone' => (string) $phone]);
    // }

    // public function delete(User $user): void
    // {
    //     $this->entityManager->remove($user);
    //     $this->entityManager->flush();
    // }

    // public function listAll(): array
    // {
    //     return $this->repository->findAll();
    // }
}