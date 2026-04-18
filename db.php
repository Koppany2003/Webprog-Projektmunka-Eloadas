<?php
// db.php
$host = 'localhost'; 
$dbname = 'adatb';   
$user = 'root';      
$pass = '';          

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, 
        array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION)
    );
} catch (PDOException $e) {
    die(json_encode(["error" => "Adatbázis csatlakozási hiba: " . $e->getMessage()]));
}
?>