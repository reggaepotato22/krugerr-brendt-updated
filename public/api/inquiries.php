<?php
include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = "SELECT * FROM inquiries ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
    $data = getInput();
    
    // Update Status or Create New
    if (isset($data['id']) && isset($data['status'])) {
        // Update
        $query = "UPDATE inquiries SET status = :status WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":status", $data['status']);
        $stmt->bindParam(":id", $data['id']);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Status updated"]);
        } else {
            echo json_encode(["error" => "Failed to update"]);
        }
    } else {
        // Create New Inquiry
        $query = "INSERT INTO inquiries (customer_name, email, message, property_id) VALUES (:name, :email, :message, :pid)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data['customer_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":message", $data['message']);
        $stmt->bindParam(":pid", $data['property_id']);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Inquiry sent"]);
        } else {
            echo json_encode(["error" => "Failed to send inquiry"]);
        }
    }
}
?>