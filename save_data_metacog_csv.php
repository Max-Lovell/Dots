<?php

if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
        header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
        die( header( 'location: /error.php' ) );
    }

if($_SERVER['HTTP_ORIGIN'] == 'safe_origin.com') { //  https://users.sussex.ac.uk
    header('Access-Control-Allow-Origin: safe_origin.com'); 
    //header('Content-Type: application/json')

//THIS ONLY WORKS WITH enctype="multipart/form-data"
    //echo "<script>console.log(".json_encode($_FILES).")</script>";
    //$blacklist = array(".php", ".phtml", ".php3", ".php4", ".js", ".shtml", ".pl" ,".py");
    //foreach ($blacklist as $file){
    //    if(preg_match("/$file\$/i", $_FILES['file']['name'])){ 
    //        exit;}
    //    if(preg_match("/$file\$/i", $_FILES['file']['tmp_name'])){ 
    //        exit;}
    //} //http://www.mysql-apache-php.com/fileupload-security.htm

//NOTE: if sending JSON data, use $post = file_get_contents('php://input') https://stackoverflow.com/questions/8207488/get-all-variables-sent-with-post
    //current version just sends a normal dict {}
    //echo "<script>console.log(".json_encode($_POST).")</script>";
    //echo "<script>console.log(".json_encode(var_dump($_POST)).")</script>";

if (isset($_POST['exp_data']) == true)
{   //check uploads are json
    $test = json_decode(file_get_contents($_POST['exp_data']), true);
    if (JSON_ERROR_NONE !== json_last_error()){
    exit;} //https://stackoverflow.com/questions/48242848/how-to-parse-php-json-decode-data-to-jquery-ajax-request
    json_encode($test);
    $exp_data = $_POST['exp_data'];
} else {echo "<script>console.log('no data')</script>"; exit; }

//sanitize data
$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING); //must come after exp_data - unsure how to sanitize this yet

//check file name and extensions
if (isset($_POST['file_name']) == true) {
    $file_name = $_POST['file_name'];
    if (0 === preg_match("/(.*)\.(csv)$/i", $file_name)) {
        echo "<script>console.log('bad type')</script>";
        exit;
    }
    if (preg_match('/[[:cntrl:]]/', $file_name)) {
        echo "<script>console.log('bad type')</script>";
        exit;
    }
} else {echo "<script>console.log('no name')</script>";exit;}

file_put_contents("non_public_path/$file_name", $exp_data);
echo "<script>console.log('thumbs up')</script>";
exit;

} else { exit; }

?>