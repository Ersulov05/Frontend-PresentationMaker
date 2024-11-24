<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\Pizza;
use App\Repository\PizzaRepository;
use App\Service\PizzaServiceInterface;
use Doctrine\Common\Collections\ArrayCollection;

class PizzaService implements PizzaServiceInterface
{
    private PizzaRepository $pizzaRepository;

    public function __construct(PizzaRepository $pizzaRepository)
    {
        $this->pizzaRepository = $pizzaRepository;
    }
    public function getPizza(int $pizzaId): Pizza
    {
        $pizza = $this->pizzaRepository->findById($pizzaId);
        if ($pizza === null)
        {
            throw new \RuntimeException('User not found');
        }

        return $pizza;
    }

    public function validatePizzaData(array $pizzaData): bool
    {
        if (isset($pizzaData['pizza_name']) && isset($pizzaData['pizza_description']) && 
            isset($pizzaData['pizza_image']) && isset($pizzaData['pizza_price']))
        {
            if ($pizzaData['pizza_name'] !== '' && $pizzaData['pizza_description'] !== '' && $pizzaData['pizza_image'] !== '' && $pizzaData['pizza_price'] > 0)
            {
                return true;
            }
        }
        return false;
    }
    public function validateIngredientData(array $ingredientData): bool
    {
        if (isset($ingredientData['pizza_id']) && isset($ingredientData['ingredient_id']) && 
            isset($ingredientData['ingredient_gramm']))
        {
            if ($ingredientData['ingredient_id'] > 0 && $ingredientData['pizza_id'] > 0 && $ingredientData['ingredient_gramm'] > 0)
            {
                return true;
            }
        }
        return false;
    }
    
    public function savePizza(string $pizzaName, string $pizzaDescription, int $pizzaPrice, 
        ?string $pizzaImagePath): int
    {
        $pizza = new Pizza(
            null,
            $pizzaName,
            $pizzaDescription,
            $pizzaPrice,
            $pizzaImagePath,
            new ArrayCollection(),
            new ArrayCollection(),
        );
        return $this->pizzaRepository->store($pizza);
    }

    public function deletePizza(int $pizzaId): void
    {
        $pizza = $this->pizzaRepository->findById($pizzaId);
        $this->pizzaRepository->delete($pizza);
    }

    public function listPizzas(): array
    {

        return $this->pizzaRepository->listAll();;
    }
}
