<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\OrderedPizza;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class OrderedPizzaRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(OrderedPizza::class);
    }

    public function store(OrderedPizza $orderedPizza)
    {
        $this->entityManager->persist($orderedPizza);
        $this->entityManager->flush();
    }

    public function findById(int $orderId): ?OrderedPizza
    {
        return $this->repository->findOneBy([ 'orderId' => (string) $orderId ]);
    }

    // public function delete(Basket $basket): void
    // {
    //     $this->entityManager->remove($basket);
    //     $this->entityManager->flush();
    // }
}