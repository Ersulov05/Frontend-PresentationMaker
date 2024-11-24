<?php
declare(strict_types=1);
namespace App\Entity;
use Doctrine\Common\Collections\Collection;
class Ingredient
{
    public function __construct(
        private ?int $ingredientId, 
        private string $ingredientName, 
        private int $ingredientCalorie,  
        private ?string $ingredientImagePath,
        private Collection $composition,
        )
    {
    }
    public function getId(): ?int
    {
        return $this->ingredientId;
    }
    public function getCompositions(): array {
        return $this->composition->toArray();
    }
    public function getName(): string
    {
        return $this->ingredientName;
    }
    public function getCalorie(): int
    {
        return $this->ingredientCalorie;
    }

    public function getImagePath(): ?string
    {
        return $this->ingredientImagePath;
    }
    public function setName(string $ingredientName): void
    {
        if (!empty($ingredientName)){
            $this->ingredientName = $ingredientName;
        }    
    }
    
    public function setCalorie(int $ingredientCalorie): void
    {
        $this->ingredientCalorie = $ingredientCalorie;
    }

    public function setImagePath(string $ingredientImagePath): void
    {
        if (!empty($ingredientImagePath)) {
            $this->ingredientImagePath = $ingredientImagePath;
        }
    }

}