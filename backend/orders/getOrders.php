<?php
require_once "../config/db.php";

$user_id = intval($_GET["user_id"] ?? 0);
$role    = $_GET["role"] ?? "user";

if ($role === "admin") {
    // Admin sees all orders
    $stmt = $pdo->query("
        SELECT o.*, u.name as customer_name, u.email as customer_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    ");
} else {
    if (!$user_id) {
        echo json_encode(["success" => false, "message" => "user_id is required"]);
        exit();
    }
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
}

$orders = $stmt->fetchAll();

// Attach items to each order
$itemStmt = $pdo->prepare("
    SELECT oi.*, p.name, p.image
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
");

foreach ($orders as &$order) {
    $itemStmt->execute([$order["id"]]);
    $order["items"] = $itemStmt->fetchAll();
}

echo json_encode(["success" => true, "orders" => $orders]);
?>