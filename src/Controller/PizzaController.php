<?php
declare(strict_types=1);

namespace App\Controller;


use App\View\PhpTemplateEngine;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Parameter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Service\PizzaServiceInterface;
use App\Service\IngredientServiceInterface;
use App\Service\ImageServiceInterface;
use App\Service\AuthServiceInterface;
use App\Service\UserServiceInterface;
use App\Service\BasketServiceInterface;
use App\Service\CompositionPizzaServiceInterface;
class PizzaController extends AbstractController
{
    private UserServiceInterface $userService;
    private PizzaServiceInterface $pizzaService;
    private IngredientServiceInterface $ingredientService;
    private BasketServiceInterface $basketService;
    private CompositionPizzaServiceInterface $compositionPizzaService;
    private ImageServiceInterface $imageService;
    private AuthServiceInterface $authService;

    public function __construct(UserServiceInterface $userService, PizzaServiceInterface $pizzaService, 
    IngredientServiceInterface $ingredientService, ImageServiceInterface $imageService, AuthServiceInterface $authService, 
    BasketServiceInterface $basketService, CompositionPizzaServiceInterface $compositionPizzaService)
    {
        $this->userService = $userService;
        $this->pizzaService = $pizzaService;
        $this->ingredientService = $ingredientService;
        $this->imageService = $imageService;
        $this->authService = $authService;
        $this->basketService = $basketService;
        $this->compositionPizzaService = $compositionPizzaService;
    }

    public function addPizzaApi(): Response {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaData = $this->authService->getJsonAsArray();
        $dataValid = $this->pizzaService->validatePizzaData($pizzaData);
        if ($dataValid) {
            $imagePath = $this->imageService->saveImage($pizzaData['pizza_image'], 'pizza');
            if ($imagePath !== null)
            {
                $pizzaId = $this->pizzaService->savePizza(
                    (string) $pizzaData['pizza_name'], 
                    (string) $pizzaData['pizza_description'], 
                    (int) $pizzaData['pizza_price'], 
                    (string) $imagePath
                );
                $data = [
                    'pizza_id' => $pizzaId,
                ];
                $jsonResponse = json_encode($data);
                $response = new Response($jsonResponse, Response::HTTP_OK);
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }
        $data = [
            'error' => 'Invalid data',
            'message' => 'Pizza data invalid',
        ];       
        $jsonResponse = json_encode($data);   
        $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function deletePizzaApi(): Response {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaData = $this->authService->getJsonAsArray();
        if (isset($pizzaData['pizza_id'])) {
            if ($pizzaData['pizza_id'] > 0) {
                $pizzaId = (int) $pizzaData['pizza_id'];
                $pizza = $this->pizzaService->getPizza($pizzaId);
                $pizzaImagePath = $pizza->getPizzaImagePath();
                if ($pizzaImagePath !== null){
                    $this->imageService->deleteImage('pizza/'.$pizzaImagePath);
                }
                $this->pizzaService->deletePizza($pizzaId);
                $data = [];
                $jsonResponse = json_encode($data);
                $response = new Response($jsonResponse, Response::HTTP_OK);
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }
        $data = [
            'error' => 'Invalid data',
            'message' => 'Pizza data invalid',
        ];       
        $jsonResponse = json_encode($data);   
        $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function addIngredientToPizzaApi(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $ingredientData = $this->authService->getJsonAsArray();
        $dataValid = $this->pizzaService->validateIngredientData($ingredientData);
        if ($dataValid) {
            $this->compositionPizzaService->addIngredientToPizza(
                (int) $ingredientData['pizza_id'], 
                (int) $ingredientData['ingredient_id'], 
                (int) $ingredientData['ingredient_gramm'], 
            );
            $data = [];
            $jsonResponse = json_encode($data);
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
    }
        $data = [
            'error' => 'Invalid data',
            'message' => 'Ingredient data invalid',
        ];       
        $jsonResponse = json_encode($data);   
        $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function showCatalogPage(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaList = $this->pizzaService->listPizzas();
        $user = $this->userService->getUser($userId);
        return $this->render('pizzeria/catalog.html.twig', ['pizza_list' => $pizzaList, 'user' => $user]);
    }

    public function showAddPizzaPage(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $user = $this->userService->getUser($userId);
        if ($user->getIsAdmin()){
            $ingredients = $this->ingredientService->listIngredients();
            return $this->render('pizzeria/add_pizza.html.twig', ['ingredients' => $ingredients]);
        } else {
            return $this->redirectToRoute('show_catalog', [], Response::HTTP_SEE_OTHER);
        }
    }

    public function showPizza(int $pizzaId): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $user = $this->userService->getUser($userId);
        $pizza= $this->pizzaService->getPizza($pizzaId);
        if ($pizza === null)
        {
            throw $this->createNotFoundException();
        }
        return $this->render('pizzeria/pizza.html.twig', ["pizza" => $pizza, 'user' => $user]);
    }
}