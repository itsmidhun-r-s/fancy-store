<?php
require_once "../config/db.php";

$user_id = intval($_GET["user_id"] ?? 0);

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "user_id is required"]);
    exit();
}

$stmt = $pdo->prepare("
    SELECT c.id as cart_id, c.quantity, 
           p.id, p.name, p.description, p.price, p.original_price, 
           p.image, p.category, p.badge, p.rating
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
");
$stmt->execute([$user_id]);
$items = $stmt->fetchAll();

echo json_encode(["success" => true, "cart" => $items]);
?>