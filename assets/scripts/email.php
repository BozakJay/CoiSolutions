<?php
$name = $_POST["name"];

if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
  header('Location: ../../contactus.html');
}

$email = $_POST["email"];
$message = $_POST['message'];

$to = "mailholdings@yahoo.com";
$subject = "CoiSolutions";
$body = "From: ".$name." at ".$email."\n\n".$message;
$sender = "From: mailholdings@yahoo.com";

mail($to, $subject, $body, $sender);
header('Location: ../../contactus.html');
exit;
?>
