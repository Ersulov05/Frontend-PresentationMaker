<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\Basket;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class BasketRepository
{
    private \PDO $connection;

    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Basket::class);
    }

    public function store(Basket $basket)
    {
        $this->entityManager->persist($basket);
        $this->entityManager->flush();
    }

    public function findById(int $userId, int $pizzaId, int $pizzaDiameter, string $pizzaDough): ?Basket
    {
        return $this->repository->findOneBy([
            'userId' => (string) $userId, 
            'pizzaId' => (string) $pizzaId,
            'pizzaDiameter' => (string) $pizzaDiameter,
            'pizzaDough' => (string) $pizzaDough,
        ]);
    }

    public function delete(Basket $basket): void
    {
        $this->entityManager->remove($basket);
        $this->entityManager->flush();
    }

    public function deleteByUserId(int $userId): void
    {
        $query = $this->entityManager->createQuery(
            'DELETE FROM App\Entity\Basket b WHERE b.user = :userId'
        )->setParameter('userId', $userId);   
        $query->execute();
    }
}