<?php

$host = 'localhost';             
$dbname = 'adatbazispizza1';     
$user = 'adatbazispizza1';       
$password = 'Kopi2003';          

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ));
} catch (PDOException $e) {
    die("Adatbázis hiba: " . $e->getMessage());
}
?>