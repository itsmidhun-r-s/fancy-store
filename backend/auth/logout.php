<?php
require_once "../config/db.php";

// Since we use localStorage on frontend, just confirm logout
echo json_encode(["success" => true, "message" => "Logged out successfully"]);
?>