<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\CompositionPizza;
use App\Repository\CompositionPizzaRepository;
use App\Service\CompositionPizzaServiceInterface;
use App\Repository\PizzaRepository;
use App\Repository\IngredientRepository;

class CompositionPizzaService implements CompositionPizzaServiceInterface
{
    private CompositionPizzaRepository $compositionPizzaRepository;
    private PizzaRepository $pizzaRepository;
    private IngredientRepository $ingredientRepository;

    public function __construct(CompositionPizzaRepository $compositionPizzaRepository, PizzaRepository $pizzaRepository, IngredientRepository $ingredientRepository)
    {
        $this->compositionPizzaRepository = $compositionPizzaRepository;
        $this->pizzaRepository = $pizzaRepository;
        $this->ingredientRepository = $ingredientRepository;
    }

    public function addIngredientToPizza(int $pizzaId, int $ingredientId, int $ingredientGramm)
    {
        $pizza = $this->pizzaRepository->findById($pizzaId);
        $ingredient = $this->ingredientRepository->findById($ingredientId);
        $compositionPizza = new CompositionPizza(
            $pizzaId,
            $ingredientId, 
            $ingredientGramm, 
            $ingredient,
            $pizza,
        );
        $this->compositionPizzaRepository->store($compositionPizza);
    }
}
