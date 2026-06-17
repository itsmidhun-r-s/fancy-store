<?php
require_once "../config/db.php";

$data        = json_decode(file_get_contents("php://input"), true);
$user_id     = intval($data["user_id"] ?? 0);
$items       = $data["items"] ?? [];
$total       = floatval($data["total"] ?? 0);
$address     = trim($data["address"] ?? "");
$city        = trim($data["city"] ?? "");
$state       = trim($data["state"] ?? "");
$pincode     = trim($data["pincode"] ?? "");
$phone       = trim($data["phone"] ?? "");
$pay_method  = trim($data["pay_method"] ?? "cod");

if (!$user_id || empty($items) || !$address) {
    echo json_encode(["success" => false, "message" => "user_id, items and address are required"]);
    exit();
}

try {
    $pdo->beginTransaction();

    // Insert order
    $stmt = $pdo->prepare("INSERT INTO orders 
        (user_id, total, address, city, state, pincode, phone, pay_method, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Processing')");
    $stmt->execute([$user_id, $total, $address, $city, $state, $pincode, $phone, $pay_method]);
    $order_id = $pdo->lastInsertId();

    // Insert order items
    $itemStmt = $pdo->prepare("INSERT INTO order_items 
        (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");

    foreach ($items as $item) {
        $itemStmt->execute([
            $order_id,
            intval($item["id"]),
            intval($item["quantity"]),
            floatval($item["price"]),
        ]);

        // Reduce stock
        $pdo->prepare("UPDATE products SET stock = stock - ? WHERE id = ? AND stock > 0")
            ->execute([intval($item["quantity"]), intval($item["id"])]);
    }

    // Clear cart
    $pdo->prepare("DELETE FROM cart WHERE user_id = ?")->execute([$user_id]);

    $pdo->commit();

    echo json_encode([
        "success"  => true,
        "message"  => "Order placed successfully",
        "order_id" => $order_id,
    ]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Order failed: " . $e->getMessage()]);
}
?>