<?php
class Database {
    private $host = "db5000510146.hosting-data.io";
    private $db_name = "dbs489610";
    private $username = "dbu631090";
    private $password = "F2(mW<!?(X";
    public $conn;

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
