<?php
declare(strict_types=1);
namespace App\Service;

use App\Entity\Ingredient;
use App\Repository\IngredientRepository;
use App\Service\IngredientServiceInterface;
// use App\Service\Data\UserData;
//use Doctrine\ORM\EntityManagerInterface;
//use Doctrine\ORM\EntityRepository;

class IngredientService implements IngredientServiceInterface
{
    private IngredientRepository $ingredientRepository;

    public function __construct(IngredientRepository $ingredientRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
    }
    public function getIngredient(int $ingredientId): Ingredient
    {
        $ingredient = $this->ingredientRepository->findById($ingredientId);
        if ($ingredient === null)
        {
            //throw $this->createNotFoundException();
            throw new \RuntimeException('Ingredient not found');
        }
        return $ingredient;
    }

    public function listIngredients(): array
    {
        return $this->ingredientRepository->listAll();
    }


}
