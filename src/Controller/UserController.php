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
class UserController extends AbstractController
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

    public function userUpdateApi(): Response {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $userData = $this->authService->getJsonAsArray();
        $emailValid = $this->userService->validateEmail($userData);
        $phoneValid = $this->userService->validatePhone($userData);
        $imageValid = $this->userService->validateImage($userData);
        $personalDataValid = $this->authService->validatePersonalData($userData);
        $checkEmail = null;
        $checkPhone = null;
        if ($emailValid)
        {
            $checkEmail = $this->userService->getUserByEmail($userData['email']);
        }
        if ($phoneValid)
        {
            $checkPhone = $this->userService->getUserByPhone($userData['phone']);
        }       
        $user = $this->userService->getUser($userId);
        if ($emailValid && $phoneValid && $imageValid && $personalDataValid && 
        ($checkEmail == null || $user === $checkEmail) && ($checkPhone == null || $user === $checkPhone))
        {
            $imagePath = null;
            if ($userData['image'] !== 'no') {
                if ($userData['image'] !== 'empty'){
                    $imagePath = $this->imageService->saveImage($userData['image'], 'user');                 
                } else {
                    $imagePath = 'empty';
                }
                $userImagePath = $user->getImagePath();
                if ($userImagePath !== null){
                    $this->imageService->deleteImage('user/'.$userImagePath);
                }
            }
            $this->userService->updateUser(
                (int) $userId,
                (string) $userData['first_name'],
                (string) $userData['last_name'],
                (string) $userData['email'],
                (string) $userData['phone'],
                $imagePath,
            );
            $data = [];
            $jsonResponse = json_encode($data);
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        } else
        {
            $data = [
                'error' => 'Bad request',
                'message' => 'Invalid data.',
                'email' => $emailValid,
                'check_email' => $checkEmail,
                'check_phone' => $checkPhone,
                'phone' => $phoneValid,
                'personal_data' => $personalDataValid,
            ];       
            $jsonResponse = json_encode($data);   
            $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
            $response->headers->set('Content-Type', 'application/json');
        } 
        return $response;
    }

    public function showProfile(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $user = $this->userService->getUser($userId);
        return $this->render('pizzeria/profile.html.twig', ['user' => $user]);
    }

    public function showProfileChange(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $user = $this->userService->getUser($userId);
        return $this->render('pizzeria/profile_change.html.twig', ['user' => $user]);
    }

    public function showBasket(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $user = $this->userService->getUser($userId);
        if ($user === null)
        {
            throw $this->createNotFoundException();
        }
        return $this->render('pizzeria/basket.html.twig', ["user" => $user]);
    }

    public function addPizzaToBasket(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaData = $this->authService->getJsonAsArray();
        $pizzaDataValid = $this->basketService->validateBasketData($pizzaData);
        if ($pizzaDataValid) {
            $this->basketService->addPizzaToBasket(
                (int) $userId, 
                (int) $pizzaData['pizza_id'], 
                (int) $pizzaData['pizza_diameter'], 
                (string) $pizzaData['pizza_dough'], 
                (int) $pizzaData['pizza_count']
            );
            $data = [];
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);
            // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        }
        else {
            $data = [
                'error' => 'Invalid data',
                'message' => 'The data has not been validated.',
            ];       
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);   
            // Создаем объект Response с кодом 400 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
            $response->headers->set('Content-Type', 'application/json');
        }
        return $response;
    }

    public function updatePizzaToBasket(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaData = $this->authService->getJsonAsArray();
        $pizzaDataValid = $this->basketService->validateBasketData($pizzaData);
        if ($pizzaDataValid) {
            $this->basketService->updatePizzaToBasket(
                (int) $userId, 
                (int) $pizzaData['pizza_id'], 
                (int) $pizzaData['pizza_diameter'], 
                (string) $pizzaData['pizza_dough'], 
                (int) $pizzaData['pizza_count']
            );
            $data = [];
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);
            // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        }
        else {
            $data = [
                'error' => 'Invalid data',
                'message' => 'The data has not been validated.',
            ];       
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);   
            // Создаем объект Response с кодом 400 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
            $response->headers->set('Content-Type', 'application/json');
        }
        return $response;
    }

    public function deletePizzaFromBasket(): Response
    {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $pizzaData = $this->authService->getJsonAsArray();
        $pizzaDataValid = $this->basketService->validateBasketData($pizzaData);
        if ($pizzaDataValid) {
            $this->basketService->deletePizzaFromBasket(
                (int) $userId, 
                (int) $pizzaData['pizza_id'], 
                (int) $pizzaData['pizza_diameter'], 
                (string) $pizzaData['pizza_dough'], 
            );
            $data = [];
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);
            // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        }
        else {
            $data = [
                'error' => 'Invalid data',
                'message' => 'The data has not been validated.',
            ];       
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);   
            // Создаем объект Response с кодом 400 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
            $response->headers->set('Content-Type', 'application/json');
        }
        return $response;
    }
}