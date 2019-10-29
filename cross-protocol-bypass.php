<?php
$url = $_GET["url"];
$json = file_get_contents($url);
echo $json;
?>