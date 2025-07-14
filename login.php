<?php
session_start();

$username = htmlspecialchars(strip_tags(strtolower($_POST["username"])));
$password = md5(htmlspecialchars(strip_tags($_POST["password"])));

// echo $username . ' ' . $password;
$host = "localhost";
$user = "root";
$pass = "";
$database = "webos";

$conn = mysqli_connect($host, $user, $pass, $database);
$query = "SELECT * FROM `accounts` WHERE `username`='$username' && `password`='$password' LIMIT 1";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) == 1){
    $_SESSION["logged_in"] = true;

    $userhash = md5("user-$username");

    $query = "SELECT * FROM `accounts` WHERE `userhash`='$userhash' LIMIT 1";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) < 1){
        header("Location: ./index.php?keysnap=wrongpassword");
        exit;
    }

    $row = mysqli_fetch_assoc($result);
    $userhash = $row["userhash"];
    
    
    $_SESSION["userhash"] = $userhash;
    header("Location: ./desktop.php");
    exit;
}
else{
    header("Location: ./index.php?keysnap=wrongpassword");
    exit;
}