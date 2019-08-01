<?php
header("Access-Control-Allow-Origin: *");
$name = addslashes($_POST['name']);
$time = addslashes($_POST['time']);

$host = "localhost";
$user = "";
$password = "";
$database = "maze";
$port = 3306;

if (empty($name) || empty($time)) exit;

$link = mysqli_connect($host, $user, $password, $database, $port);

$sql = "INSERT INTO top_labyrinth (name, time, date) VALUES ('$name', '$time', NOW())";
mysqli_query($link, $sql);
