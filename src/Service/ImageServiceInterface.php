<?php
declare(strict_types=1);
namespace App\Service;

interface ImageServiceInterface
{
    public function moveImageToUploads(array $fileInfo): ?string;
    public function deleteImage(string $path): void;
    public function saveImage(string $imageBase64, string $folder): ?string;
}