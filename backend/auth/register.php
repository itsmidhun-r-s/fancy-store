<?php
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data["name"] ?? "");
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");
$phone    = trim($data["phone"] ?? "");

if (!$name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Name, email and password are required"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Password must be at least 6 characters"]);
    exit();
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Email already registered"]);
    exit();
}

$hashed = password_hash($password, PASSWORD_BCRYPT);
$role   = ($email === "admin@dazzling.com") ? "admin" : "user";

$stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$name, $email, $hashed, $phone, $role]);

echo json_encode([
    "success" => true,
    "message" => "Registration successful",
    "user"    => [
        "id"    => $pdo->lastInsertId(),
        "name"  => $name,
        "email" => $email,
        "phone" => $phone,
        "role"  => $role,
    ]
]);
?>