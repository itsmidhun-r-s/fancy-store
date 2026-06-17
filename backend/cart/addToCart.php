<?php
require_once "../config/db.php";

$data       = json_decode(file_get_contents("php://input"), true);
$user_id    = intval($data["user_id"] ?? 0);
$product_id = intval($data["product_id"] ?? 0);
$quantity   = intval($data["quantity"] ?? 1);

if (!$user_id || !$product_id) {
    echo json_encode(["success" => false, "message" => "user_id and product_id are required"]);
    exit();
}

// Check if already in cart
$stmt = $pdo->prepare("SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?");
$stmt->execute([$user_id, $product_id]);
$existing = $stmt->fetch();

if ($existing) {
    $newQty = $existing["quantity"] + $quantity;
    $stmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
    $stmt->execute([$newQty, $existing["id"]]);
    echo json_encode(["success" => true, "message" => "Cart updated", "quantity" => $newQty]);
} else {
    $stmt = $pdo->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $product_id, $quantity]);
    echo json_encode(["success" => true, "message" => "Added to cart"]);
}
?>