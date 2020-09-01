<?php
include_once './credentials.php';

class Database {
//    private $host = "db5000510146.hosting-data.io";
//    private $db_name = "dbs489610";
//    private $username = "dbu631090";
//    private $password = "F2(mW<!?(X";
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $this->host = $h1;
        $this->db_name = $h2;
        $this->user_name = $h3;
        $this->password = $h4;
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
