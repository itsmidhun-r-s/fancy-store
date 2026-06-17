<?php
require_once "../config/db.php";

$data          = json_decode(file_get_contents("php://input"), true);
$name          = trim($data["name"] ?? "");
$description   = trim($data["description"] ?? "");
$price         = floatval($data["price"] ?? 0);
$originalPrice = floatval($data["original_price"] ?? 0);
$category      = trim($data["category"] ?? "");
$stock         = intval($data["stock"] ?? 0);
$image         = trim($data["image"] ?? "");
$badge         = trim($data["badge"] ?? "");
$rating        = floatval($data["rating"] ?? 0);
$reviews       = intval($data["reviews"] ?? 0);

if (!$name || !$price || !$category) {
    echo json_encode(["success" => false, "message" => "Name, price and category are required"]);
    exit();
}

$stmt = $pdo->prepare("INSERT INTO products 
    (name, description, price, original_price, category, stock, image, badge, rating, reviews) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$name, $description, $price, $originalPrice, $category, $stock, $image, $badge, $rating, $reviews]);

echo json_encode([
    "success" => true,
    "message" => "Product added successfully",
    "product_id" => $pdo->lastInsertId()
]);
?>