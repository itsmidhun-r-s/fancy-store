<?php
require_once "../config/db.php";

$data     = json_decode(file_get_contents("php://input"), true);
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "No account found with this email. Please register first."
    ]);
    exit();
}

if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Incorrect password. Please try again."
    ]);
    exit();
}

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user"    => [
        "id"    => $user["id"],
        "name"  => $user["name"],
        "email" => $user["email"],
        "phone" => $user["phone"],
        "role"  => $user["role"],
    ]
]);
?>