<?php
require_once "backend/config/db.php";

$email    = "admin@dazzling.com";
$password = "dazz@123";
$name     = "Admin";
$role     = "admin";

// Generate correct hash
$hash = password_hash($password, PASSWORD_BCRYPT);

// Delete old admin if exists
$pdo->prepare("DELETE FROM users WHERE email = ?")->execute([$email]);

// Insert new admin with correct hash
$stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$name, $email, $hash, "", $role]);

// Verify password works
$check = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$check->execute([$email]);
$user = $check->fetch();

if ($user && password_verify($password, $user["password"])) {
    echo "<h2 style='color:green'>✅ SUCCESS!</h2>";
    echo "<p>Admin created successfully.</p>";
    echo "<p><strong>Email:</strong> admin@dazzling.com</p>";
    echo "<p><strong>Password:</strong> dazz@123</p>";
    echo "<p><strong>Role:</strong> " . $user["role"] . "</p>";
    echo "<p><strong>Hash:</strong> " . $user["password"] . "</p>";
    echo "<br><p style='color:red'>⚠ Delete this file after use!</p>";
} else {
    echo "<h2 style='color:red'>❌ FAILED</h2>";
    echo "<p>Something went wrong. Check database connection.</p>";
}
?>