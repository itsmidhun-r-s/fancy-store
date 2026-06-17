<?php
require_once "../config/db.php";

// Install via: composer require razorpay/razorpay
// require_once "../vendor/autoload.php";
// use Razorpay\Api\Api;

$data   = json_decode(file_get_contents("php://input"), true);
$action = $data["action"] ?? "";

$key_id     = "YOUR_RAZORPAY_KEY_ID";
$key_secret = "YOUR_RAZORPAY_KEY_SECRET";

if ($action === "create_order") {
    $amount   = intval($data["amount"] ?? 0) * 100; // paise
    $currency = "INR";

    $ch = curl_init("https://api.razorpay.com/v1/orders");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$key_id:$key_secret");
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        "amount"   => $amount,
        "currency" => $currency,
        "receipt"  => "order_" . time(),
    ]));

    $response = curl_exec($ch);
    curl_close($ch);

    $order = json_decode($response, true);
    echo json_encode(["success" => true, "order" => $order, "key_id" => $key_id]);

} elseif ($action === "verify") {
    $razorpay_order_id   = $data["razorpay_order_id"] ?? "";
    $razorpay_payment_id = $data["razorpay_payment_id"] ?? "";
    $razorpay_signature  = $data["razorpay_signature"] ?? "";

    $generated = hash_hmac("sha256", $razorpay_order_id . "|" . $razorpay_payment_id, $key_secret);

    if ($generated === $razorpay_signature) {
        echo json_encode(["success" => true, "message" => "Payment verified"]);
    } else {
        echo json_encode(["success" => false, "message" => "Payment verification failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid action"]);
}
?>