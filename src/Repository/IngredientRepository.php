<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\Ingredient;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class IngredientRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Ingredient::class);
    }

    // public function store(User $user): int
    // {templates/pizzeria/ingredient.html.twig
    //     $this->entityManager->persist($user);
    //     $this->entityManager->flush();
    //     return $user->getId();
    // }

    public function findById(int $ingredienId): ?Ingredient
    {
        return $this->repository->findOneBy(['ingredientId' => (string) $ingredienId]);
    }

    // public function delete(User $user): void
    // {
    //     $this->entityManager->remove($user);
    //     $this->entityManager->flush();
    // }

    public function listAll(): array
    {
        // $query = $this->entityManager->createQuery(
        //     'SELECT ingredient FROM App\Entity\Ingredient ingredient'
        // );
        // $pizzasWithUsers = $query->getResult();
        // return $pizzasWithUsers;
        return $this->repository->findAll();
    }
}