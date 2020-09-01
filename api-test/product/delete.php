<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-requested-with");

include_once '../config/database.php';
include_once '../objects/product.php';

// Instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// Initialise object
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

$product->id = $data->id;

if ($product->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "Product was deleted."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to delete product."));
}

?>
