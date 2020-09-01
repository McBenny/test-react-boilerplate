<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/category.php';

// Instantiate database and category object
$database = new Database();
$db = $database->getConnection();

// Initialise object
$category = new Category($db);

// query categories
$stmt = $category->read();
$num = $stmt->rowCount();

if ($num > 0) {
    // Category array
    $categories_arr = array();
    $categories_arr["records"] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $category_item = array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description)
        );
        array_push($categories_arr["records"], $category_item);
    }

    http_response_code(200);
    echo json_encode($categories_arr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No categories found.")
    );
}

?>
