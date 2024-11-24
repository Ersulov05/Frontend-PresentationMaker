<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\Basket;
use App\Repository\BasketRepository;
use App\Repository\UserRepository;
use App\Repository\PizzaRepository;
use App\Service\BasketServiceInterface;
// use App\Service\Data\UserData;
//use Doctrine\ORM\EntityManagerInterface;
//use Doctrine\ORM\EntityRepository;

class BasketService implements BasketServiceInterface
{
    private BasketRepository $basketRepository;
    private UserRepository $userRepository;
    private PizzaRepository $pizzaRepository;

    public function __construct(BasketRepository $basketRepository, UserRepository $userRepository, 
        PizzaRepository $pizzaRepository)
    {
        $this->basketRepository = $basketRepository;
        $this->userRepository = $userRepository;
        $this->pizzaRepository = $pizzaRepository;
    }


    public function addPizzaToBasket(int $userId, int $pizzaId, int $pizzaDiameter, 
        string $pizzaDough, int $pizzaCount)
    {
        $basket = $this->basketRepository->findById($userId, $pizzaId, $pizzaDiameter, $pizzaDough);
        if ($basket !== null) {
            $basket->setPizzaCount($pizzaCount + $basket->getPizzaCount());
            $this->basketRepository->store($basket);
        } else {
            $user = $this->userRepository->findById($userId);
            $pizza = $this->pizzaRepository->findById($pizzaId);
            $basket = new Basket(
                $userId,
                $pizzaId, 
                $pizzaDiameter, 
                $pizzaCount,
                $pizzaDough,
                $user,
                $pizza,
            );
            $this->basketRepository->store($basket);
        }
    }

    public function updatePizzaToBasket(int $userId, int $pizzaId, int $pizzaDiameter, 
        string $pizzaDough, int $pizzaCount)
    {
        $basket = $this->basketRepository->findById($userId, $pizzaId, $pizzaDiameter, $pizzaDough);
        if ($basket !== null) {
            $basket->setPizzaCount($pizzaCount);
            $this->basketRepository->store($basket);
        }
    }

    public function deletePizzaFromBasket(int $userId, int $pizzaId, int $pizzaDiameter, string $pizzaDough): void
    {
        $basket = $this->basketRepository->findById($userId, $pizzaId, $pizzaDiameter, $pizzaDough);
        $this->basketRepository->delete($basket);
    }


    public function validateBasketData(array $basketData): bool
    {
        if (isset($basketData['pizza_id']) && isset($basketData['pizza_diameter']) && 
            isset($basketData['pizza_dough']) && isset($basketData['pizza_count']))
        {
            $diameter = in_array($basketData['pizza_diameter'], [20, 30, 45]);
            $dough = in_array($basketData['pizza_dough'], ['standard', 'thin']);
            $count = $basketData['pizza_count'] > 0;
            $id = $basketData['pizza_id'] > 0;
            if ($diameter && $dough && $count && $id)
            {
                return true;
            }
        }
        return false;
    }
    public function clearUserBasket(int $userId)
    {
        $this->basketRepository->deleteByUserId($userId);
    }
}
