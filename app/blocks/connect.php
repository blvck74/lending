<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lend";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$authenticated = false;
if (isset($_SESSION['authenticated']) && $_SESSION['authenticated']) {
    $authenticated = true;
}
?>

