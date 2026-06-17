<?php
require_once "../config/db.php";

$data  = json_decode(file_get_contents("php://input"), true);
$name  = trim($data["name"] ?? "");
$image = trim($data["image"] ?? "");
$path  = trim($data["path"] ?? "");

if (!$name) {
    echo json_encode(["success" => false, "message" => "Category name is required"]);
    exit();
}

// Check duplicate
$stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ?");
$stmt->execute([$name]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Category already exists"]);
    exit();
}

$stmt = $pdo->prepare("INSERT INTO categories (name, image, path) VALUES (?, ?, ?)");
$stmt->execute([$name, $image, $path]);

echo json_encode([
    "success"     => true,
    "message"     => "Category added",
    "category_id" => $pdo->lastInsertId()
]);
?>