<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        try {
            $stmt = $dbh->prepare("SELECT * FROM pizza");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            echo json_encode(["error" => "Hiba: " . $e->getMessage()]);
        }
        break;

    case 'POST':
        if (isset($input['nev']) && isset($input['ar'])) {
            try {
                $stmt = $dbh->prepare("INSERT INTO pizza (nev, ar) VALUES (:nev, :ar)");
                $stmt->execute(['nev' => $input['nev'], 'ar' => $input['ar']]);
                echo json_encode(["message" => "Sikeresen hozzáadva!"]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Hiba a mentésnél: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "Hiányzó adatok (név vagy ár)!"]);
        }
        break;

    case 'PUT':
        if (isset($input['id']) && isset($input['nev']) && isset($input['ar'])) {
            try {
                $stmt = $dbh->prepare("UPDATE pizza SET nev = :nev, ar = :ar WHERE id = :id");
                $stmt->execute(['nev' => $input['nev'], 'ar' => $input['ar'], 'id' => $input['id']]);
                echo json_encode(["message" => "Sikeresen módosítva!"]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Hiba a frissítésnél: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "Hiányzó adatok a frissítéshez!"]);
        }
        break;

    case 'DELETE':
        if (isset($input['id'])) {
            try {
                $stmt = $dbh->prepare("DELETE FROM pizza WHERE id = :id");
                $stmt->execute(['id' => $input['id']]);
                echo json_encode(["message" => "Sikeresen törölve!"]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Hiba a törlésnél: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "Hiányzó ID a törléshez!"]);
        }
        break;

    default:
        echo json_encode(["error" => "Érvénytelen HTTP kérés."]);
        break;
}
?>