<?php
declare(strict_types=1);
namespace App\Service;


use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\User;
use App\Repository\UserRepository;

class AuthService implements AuthServiceInterface
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
   
    public function checkSession(): ?int
    {
        session_name('auth');
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        return $userId;
    }
    public function setSession(int $userId)
    {
        session_name('auth');
        session_start();
        $_SESSION['user_id'] = $userId;
    }
    public function destroySession()
    {
        session_name('auth');
        session_start();
        $_SESSION = [];
        session_destroy();
        setcookie(session_name(), '', time()-3600);
    }

    private function getDataJson(): ?string {
        $dataAsJson = file_get_contents("php://input");
        if (!$dataAsJson) {
          //echo 'Не удалось считать данные! <br>';
          return null;
        }
        return $dataAsJson;
    }
    
    public function getJsonAsArray(): array {
        $dataAsJson = $this->getDataJson();
        $dataAsArray = json_decode($dataAsJson, true);
        if (!$dataAsArray) {
          //echo 'Не удалось преобразовать JSON в массив! <br>';
          return [];
        }
        return $dataAsArray;
    }
    public function validateEmail(array $userData): bool
    {
        if (isset($userData['email']))
        {
            if (filter_var($userData['email'], FILTER_VALIDATE_EMAIL))
            {
                return true;
            }
        }
        return false;
    }
    public function validatePhone(array $userData): bool
    {
        $regexp = '/^\b[1-9]\d{10}\b$/'; 
        if (isset($userData['phone']))
        {
            if (preg_match($regexp, $userData['phone'])) {
                return true;
            } 
        }
        return false;
    }
    public function validatePassword(array $userData): bool
    {
        if (isset($userData['password']))
        {
            if (strlen($userData['password']) >= 8)
            {
                return true;
            }
        }
        return false;
    }

    public function validatePersonalData(array $userData): bool
    {
        if (isset($userData['first_name']) && isset($userData['last_name']))
        {
            if ((strlen($userData['first_name']) > 0) && (strlen($userData['last_name']) > 0))
            {
                return true;
            }
        }
        return false;
    }
}