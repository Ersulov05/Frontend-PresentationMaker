<?php
declare(strict_types=1);
namespace App\Service;


use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\User;
use App\Repository\UserRepository;

class ImageService implements ImageServiceInterface
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    const UPLOADS_PATH = 'images' . DIRECTORY_SEPARATOR;
    const ALLOWED_MIME_TYPES_MAP = [
        'image/jpeg' => '.jpg',
        'image/png' => '.png',
        'image/webp' => '.webp',
    ];


    private function saveFile(string $file, string $data): void {
        $myFile = fopen($file, 'w');
        if ($myFile) {
          $result = fwrite($myFile, $data);
          if ($result) {
            //echo "Данные успешно сохранены в файл \n";
          } else {
            //echo 'Произошла ошибка при сохранении данных в файл <br>';
            throw new \RuntimeException('Произошла ошибка при сохранении данных в файл');
          }
          fclose($myFile);
        } else {
          //echo 'Произошла ошибка при открытии файла <br>';
          throw new \RuntimeException('Произошла ошибка при открытии файла');
        }
    }

    public function saveImage(string $imageBase64, string $folder): ?string
    {
        try {
            $imageBase64Array = explode(';base64,', $imageBase64);
            $imageExtention = '.' . str_replace('data:image/', '', $imageBase64Array[0]);
            $imageDecoded = base64_decode($imageBase64Array[1]);
            $destFileName = uniqid($folder, true) . $imageExtention;
            $this->saveFile(self::UPLOADS_PATH . $folder.'/'.$destFileName, $imageDecoded);
            return $destFileName;
        } catch (\RuntimeException $e)
        {
            return null;
        }
    }

    public function deleteImage(string $path): void
    {
        if ($path !== null) {
            if (file_exists("./images/$path"))
            {
                unlink("./images/$path");
            }      
        }
    }

    public function moveImageToUploads(array $fileInfo): ?string
    {
        if ($fileInfo['error'] === UPLOAD_ERR_NO_FILE)
        {
            return null;
        }

        $fileName = $fileInfo['name'];
        $fileType = $fileInfo['type'];
        $imageExt = self::ALLOWED_MIME_TYPES_MAP[$fileType] ?? null;
   
        if (!$imageExt) {
            throw new \InvalidArgumentException("File '$fileName' has non-image type '$fileType'");
        }

        $destFileName = uniqid('image', true) . $imageExt;
        return $this->moveFileToUploads($fileInfo, $destFileName);
    }

    private function getUploadPath(string $fileName): string
    {
        $uploadsPath = dirname(__DIR__, 2) . self::UPLOADS_PATH;

        if (!$uploadsPath || !is_dir($uploadsPath)) {
            throw new \RuntimeException('Invalid uploads path: ' . self::UPLOADS_PATH);
        }

        return $uploadsPath . DIRECTORY_SEPARATOR . $fileName;
    }

    private function moveFileToUploads(array $fileInfo, string $destFileName): string
    {
        $fileName = $fileInfo['name'];
        $destPath = $this->getUploadPath($destFileName);
        $srcPath = $fileInfo['tmp_name'];
        if (!@move_uploaded_file($srcPath, $destPath)) {
            throw new \RuntimeException("Failed to upload file $fileName");
        }
   
        return $destFileName;
    }

}