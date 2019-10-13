<?php
  $user = 'root';
  $psw = '';
  $host = 'localhost';
  $db = 'scores';

if (isset($_POST['pseudo']) && isset($_POST['score'])) {
  try {
    $conn = new PDO("mysql:host=".$host.";dbname=".$db, $user, $psw);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("INSERT INTO scores (`pseudo`, `score`) VALUES ('".$_POST['pseudo']."', '".$_POST['score']."');");
  } catch(PDOException $e) {
    echo $e.getMessage();
  }
} else if (isset($_POST['get'])) {
  try {
    $conn = new PDO("mysql:host=".$host.";dbname=".$db, $user, $psw);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    foreach  ($conn->query("SELECT  * FROM scores ORDER BY score DESC LIMIT 5") as $row) {
      echo '<tr><td style="border: 1px solid black;">' . $row['pseudo'] . '</td><td style="text-align: center; border: 1px solid black;">' . $row['score'] . '</td></tr>';
    }
  } catch(PDOException $e) {
    echo $e.getMessage();
  }
}
?>
