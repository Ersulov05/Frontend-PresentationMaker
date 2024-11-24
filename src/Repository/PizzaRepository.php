<?php
declare(strict_types=1);
namespace App\Repository;

use App\Entity\Pizza;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
class PizzaRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Pizza::class);
    }

    public function store(Pizza $pizza): int
    {
        $this->entityManager->persist($pizza);
        $this->entityManager->flush();
        return $pizza->getId();
    }

    public function findById(int $pizzaId): ?Pizza
    {
        // $query = $this->entityManager->createQuery("SELECT p, c, i
        // FROM App\Entity\Pizza p
        // LEFT JOIN p.composition c
        // LEFT JOIN c.ingredient i
        // WHERE p.pizzaId = $pizzaId");//->setParameter('pizzaId', $pizzaId);
        // return $query->getOneOrNullResult();
        return $this->repository->findOneBy(['pizzaId' => (string) $pizzaId]);
    }

    public function delete(Pizza $pizza): void
    {
        $this->entityManager->remove($pizza);
        $this->entityManager->flush();
    }

    public function listAll(): array
    {
        $query = $this->entityManager->createQuery(
            //'SELECT pizza FROM App\Entity\Pizza pizza'
            //'SELECT p, u FROM App\Entity\Pizza p JOIN p.basket u'
            'SELECT p, c, i
                FROM App\Entity\Pizza p
                LEFT JOIN p.composition c
                LEFT JOIN c.ingredient i'
        );
        $pizzasWithUsers = $query->getResult();
        //var_dump($pizzasWithUsers);
    // Обработка результатов запроса
        // foreach ($pizzasWithUsers as $result) {
        //     $pizza = $result[0]; // объект Pizza
        //     $users = $result['users']->toArray();
        // }
        return $pizzasWithUsers;
        //return $this->repository->findAll();
    }
}