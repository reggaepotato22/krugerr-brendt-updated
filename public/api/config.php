<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "krugerr_brendt_db"; // CHANGE THIS
$username = "root"; // CHANGE THIS
$password = ""; // CHANGE THIS

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->exec("set names utf8");
} catch(PDOException $exception) {
    echo json_encode(["error" => "Connection error: " . $exception->getMessage()]);
    exit();
}

// Helper to get POST data
function getInput() {
    return json_decode(file_get_contents("php://input"), true);
}
?>