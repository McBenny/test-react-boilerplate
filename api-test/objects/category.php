<?php
class Category {
  
    // database connection and table name
    private $conn;
    private $table_name = "categories";
  
    // object properties
    public $id;
    public $name;
    public $description;
    public $created;
  
    // constructor with $db as database connection
    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "
            SELECT
                id,
                name,
                description
            FROM
                " . $this->table_name . "
            ORDER BY
                name ASC
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}

?>
