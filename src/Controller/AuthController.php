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
class AuthController extends AbstractController
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

    public function registration(): Response {
        if ($this->authService->checkSession() !== null)
        {
            return $this->redirectToRoute('show_catalog', [], Response::HTTP_SEE_OTHER);
        }
        return $this->render('/auth/registration.html.twig'); 
    }

    public function login(): Response {
        if ($this->authService->checkSession() !== null)
        {
            return $this->redirectToRoute('show_catalog', [], Response::HTTP_SEE_OTHER);
        }
        return $this->render('/auth/login.html.twig'); 
    }

    public function index(): Response {
        //return $this->render('/auth/login.html.twig'); 
        return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
    }

    public function loginApi(): Response{
        //header("Location: /registration", TRUE, 200);
        $userData = $this->authService->getJsonAsArray();
        $emailValid = $this->authService->validateEmail($userData);
        $passwordValid = $this->authService->validatePassword($userData);
        $user = null;
        if ($emailValid)
        {
            $user = $this->userService->getUserByEmail($userData['email']);
        }      
        if ($emailValid && $passwordValid && ($user !== null))
        {
            $salt = 'hrefxs89dj';
            $password = md5(md5($userData['password']) . $salt);
            if ($password == $user->getPassword()){
                $this->authService->setSession($user->getId());
                $data = [];
                // Кодируем данные в JSON
                $jsonResponse = json_encode($data);
                // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
                $response = new Response($jsonResponse, Response::HTTP_OK);
                $response->headers->set('Content-Type', 'application/json');
            }
            else
            {
                $data = [
                    'error' => 'Unauthorized',
                    'message' => 'Authentication is required and has failed or has not yet been provided.',
                    'email' => $emailValid,
                    'check_email' => $user,
                    'password' => $passwordValid,
                ];       
                // Кодируем данные в JSON
                $jsonResponse = json_encode($data);     
                // Создаем объект Response с кодом 401 и устанавливаем заголовок Content-Type
                $response = new Response($jsonResponse, Response::HTTP_UNAUTHORIZED);
                $response->headers->set('Content-Type', 'application/json');
            }
        } else
        {
            $data = [
                'error' => 'Unauthorized',
                'message' => 'Authentication is required and has failed or has not yet been provided.',
                'email' => $emailValid,
                'check_email' => $user,
                'password' => $passwordValid,
            ];       
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);   
            if (json_last_error() !== JSON_ERROR_NONE) {
                // Обработка ошибки
                echo 'Ошибка при кодировании JSON: ' . json_last_error_msg();
            }    
            // Создаем объект Response с кодом 401 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_UNAUTHORIZED);
            $response->headers->set('Content-Type', 'application/json');
        } 
        // Возвращаем ответ
        return $response;
    }

    public function registrationApi(): Response {
        $userData = $this->authService->getJsonAsArray();
        $emailValid = $this->authService->validateEmail($userData);
        $phoneValid = $this->authService->validatePhone($userData);
        $passwordValid = $this->authService->validatePassword($userData);
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
        if ($emailValid && $phoneValid && $passwordValid && $personalDataValid && 
        ($checkEmail == null) && ($checkPhone == null))
        {
            $salt = 'hrefxs89dj';
            $password = md5(md5($userData['password']) . $salt);
            $userId = $this->userService->saveUser(
                $userData['first_name'],
                $userData['last_name'],
                $userData['email'],
                $userData['phone'],
                $password,
            );
            $this->authService->setSession($userId);
            $data = [];
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);
            // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        } else
        {
            $data = [
                'error' => 'Unauthorized',
                'message' => 'Authentication is required and has failed or has not yet been provided.',
                'email' => $emailValid,
                'check_email' => $checkEmail,
                'check_phone' => $checkPhone,
                'phone' => $phoneValid,
                'password' => $passwordValid,
                'personal_data' => $personalDataValid,
            ];       
            // Кодируем данные в JSON
            $jsonResponse = json_encode($data);   
            // Создаем объект Response с кодом 401 и устанавливаем заголовок Content-Type
            $response = new Response($jsonResponse, Response::HTTP_UNAUTHORIZED);
            $response->headers->set('Content-Type', 'application/json');
        } 
        // Возвращаем ответ
        return $response;
    }

    public function logoutApi(): Response {
        $this->authService->destroySession();
        $data = [];
        // Кодируем данные в JSON
        $jsonResponse = json_encode($data);
        // Создаем объект Response с кодом 200 и устанавливаем заголовок Content-Type
        $response = new Response($jsonResponse, Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}