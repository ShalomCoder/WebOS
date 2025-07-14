<?php
// Start the session
session_start();

// Check if the request is a POST
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $host = "localhost";
    $uname = "root";
    $pass = "";
    $db = "webos";
    // Get the posted data
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if the data is available
    if(!empty($data)) {
        $uh = htmlspecialchars(strip_tags($data["uh"]));
        $conn = mysqli_connect($host, $uname, $pass, $db);
        $query = "SELECT * FROM `accounts` WHERE `userhash`='$uh'";
        $response = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($response);
        echo json_encode(array("username" => $row["username"]));
    } else {
        // Return an error if the data is empty
        http_response_code(400);
        echo json_encode(array('error' => 'No data received.'));
    }
} else {
    echo json_encode(array("response" => 'Please use a POST request instead!'));
}
?>