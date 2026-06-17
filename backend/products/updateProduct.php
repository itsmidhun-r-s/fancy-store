<?php
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id   = intval($data["id"] ?? 0);

if (!$id) {
    echo json_encode(["success" => false, "message" => "Product ID is required"]);
    exit();
}

$fields = [];
$params = [];

$allowed = ["name", "description", "price", "original_price", "category", "stock", "image", "badge", "rating", "reviews"];

foreach ($allowed as $field) {
    if (isset($data[$field])) {
        $fields[] = "$field = ?";
        $params[]  = $data[$field];
    }
}

if (empty($fields)) {
    echo json_encode(["success" => false, "message" => "No fields to update"]);
    exit();
}

$params[] = $id;
$sql = "UPDATE products SET " . implode(", ", $fields) . " WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(["success" => true, "message" => "Product updated successfully"]);
?>