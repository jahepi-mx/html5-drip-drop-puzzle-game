<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$host = "localhost";
$user = "";
$password = "";
$database = "";
$port = 3306;

$link = mysqli_connect($host, $user, $password, $database, $port);

$data = array();
$data['times'] = array();

$sql = "SELECT name, time FROM top_labyrinth ORDER BY time ASC LIMIT 10";
$rs = mysqli_query($link, $sql);

while ($row = mysqli_fetch_object($rs)) {
    $data['times'][] = array(
        'name' => $row->name,
        'time' => $row->time,
    );
}

echo json_encode($data);
