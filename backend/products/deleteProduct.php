<?php
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id   = intval($data["id"] ?? 0);

if (!$id) {
    echo json_encode(["success" => false, "message" => "Product ID is required"]);
    exit();
}

$stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
?>