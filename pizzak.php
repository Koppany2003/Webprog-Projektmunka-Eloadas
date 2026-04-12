<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $dbh->prepare("SELECT * FROM pizza");
            $stmt->execute();
            $eredmeny = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($eredmeny);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Hiba a lekérdezés során: " . $e->getMessage()]);
        }
        break;

    
    default:
        echo json_encode(["message" => "Érvénytelen kérés."]);
        break;
}
?>