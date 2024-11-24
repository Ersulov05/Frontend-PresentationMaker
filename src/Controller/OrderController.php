<?php
declare(strict_types=1);

namespace App\Controller;


use App\View\PhpTemplateEngine;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Parameter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Service\PizzaServiceInterface;
use App\Service\OrderServiceInterface;
use App\Service\OrderedPizzaServiceInterface;
use App\Service\AuthServiceInterface;
use App\Service\UserServiceInterface;
use App\Service\BasketServiceInterface;
use App\Service\CompositionPizzaServiceInterface;
class OrderController extends AbstractController
{
    private UserServiceInterface $userService;
    private PizzaServiceInterface $pizzaService;
    private BasketServiceInterface $basketService;
    private OrderServiceInterface $orderService;
    private OrderedPizzaServiceInterface $orderedPizzaService;
    private AuthServiceInterface $authService;

    public function __construct(UserServiceInterface $userService, PizzaServiceInterface $pizzaService, 
    OrderServiceInterface $orderService, OrderedPizzaServiceInterface $orderedPizzaService, AuthServiceInterface $authService, 
    BasketServiceInterface $basketService)
    {
        $this->userService = $userService;
        $this->pizzaService = $pizzaService;
        $this->orderService = $orderService;
        $this->orderedPizzaService = $orderedPizzaService;
        $this->authService = $authService;
        $this->basketService = $basketService;
    }

    public function addOrderApi(): Response {
        $userId = $this->authService->checkSession();
        if ($userId == null)
        {
            return $this->redirectToRoute('auth_login', [], Response::HTTP_SEE_OTHER);
        }
        $orderData = $this->authService->getJsonAsArray();
        $dataValid = $this->orderService->validateOrderData($orderData);
        if ($dataValid) {
            $user = $this->userService->getUser($userId);
            $basket = $user->getBasket();
            if (count($basket) > 0) {
                //добавление заказа
                $orderId = $this->orderService->saveOrder($user, $orderData['order_delivery_address']);
                $order = $this->orderService->getOrder($orderId);
                foreach ($basket as $basketItem) {
                    $pizza = $basketItem->getPizza();
                    $pizzaPrices = [
                        20 => (int)($pizza->getPizzaPrice() / 2.1),
                        30 => $pizza->getPizzaPrice(),
                        45 => (int)($pizza->getPizzaPrice() * 2.1),
                    ];
                    $this->orderedPizzaService->addPizzaToOrder(
                        $order, 
                        $pizza->getPizzaName(), 
                        $basketItem->getPizzaDiameter(),
                        $basketItem->getPizzaDough(),
                        $basketItem->getPizzaCount(),
                        $pizzaPrices[$basketItem->getPizzaDiameter()],
                    );
                }
                //очищение корзины пользователя
                $this->basketService->clearUserBasket($userId);
                $data = [];
                $jsonResponse = json_encode($data);
                $response = new Response($jsonResponse, Response::HTTP_OK);
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }  
        }
        $data = [
            'error' => 'Invalid data',
            'message' => 'Order data invalid',
        ];       
        $jsonResponse = json_encode($data);   
        $response = new Response($jsonResponse, Response::HTTP_BAD_REQUEST);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}