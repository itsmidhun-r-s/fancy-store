<?php
require_once "../config/db.php";

$category = $_GET["category"] ?? "";
$search   = $_GET["search"] ?? "";

$sql    = "SELECT * FROM products WHERE 1=1";
$params = [];

if ($category) {
    $sql .= " AND category = ?";
    $params[] = $category;
}
if ($search) {
    $sql .= " AND (name LIKE ? OR description LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll();

echo json_encode(["success" => true, "products" => $products]);
?>