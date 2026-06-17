<?php
require_once "../config/db.php";

$stmt = $pdo->query("SELECT * FROM categories ORDER BY name ASC");
$categories = $stmt->fetchAll();

echo json_encode(["success" => true, "categories" => $categories]);
?>