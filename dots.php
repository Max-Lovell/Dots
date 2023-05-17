<?php

if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
    header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
    die( header( 'location: /error.php' ) );
} //exit if URL accessed directly

if($_SERVER['HTTP_ORIGIN'] == 'https://universityofsussex.eu.qualtrics.com') { //exit if not from uni qualtrics
    //file_put_contents("globals.log", print_r($GLOBALS,true));
    header('Access-Control-Allow-Origin: https://universityofsussex.eu.qualtrics.com'); 
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, x-requested-with');
    header('Content-Type: application/json');

if(!empty($_POST)){exit;}
if(!empty($_GET)){exit;}
if(!empty($_FILES)){exit;} //https://st-g.de/2011/04/doing-filename-checks-securely-in-PHP

$post_data = json_decode(file_get_contents('php://input'), true);
if (JSON_ERROR_NONE !== json_last_error()){exit;} //https://stackoverflow.com/questions/48242848/how-to-parse-php-json-decode-data-to-jquery-ajax-request    

$post_data = filter_var_array($post_data,[ //https://stackoverflow.com/questions/37533162/sanitize-json-with-php
    'file_name'    => FILTER_SANITIZE_STRING,
    'exp_data'     => ['filter' => FILTER_SANITIZE_STRING,'flags'=> FILTER_REQUIRE_ARRAY]
]);

if (isset($post_data['exp_data']) == true) {//https://www.w3schools.com/php/php_filter.asp
    $data = $post_data['exp_data'];
    
    $args_san = array(
        'trial_n' => FILTER_SANITIZE_NUMBER_INT,
        'n_dots' => array('filter' => FILTER_SANITIZE_NUMBER_FLOAT, 'flags' => FILTER_FLAG_ALLOW_FRACTION),
        'target' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'response' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'rt' => array('filter' => FILTER_SANITIZE_NUMBER_FLOAT, 'flags' => FILTER_FLAG_ALLOW_FRACTION),
        'correct' => FILTER_SANITIZE_NUMBER_INT,
        'confidence' => FILTER_SANITIZE_NUMBER_INT
    );
    
    $args_val = array(
            'trial_n' => FILTER_VALIDATE_INT,
            'n_dots' => FILTER_VALIDATE_FLOAT,
            'target' => array('filter' => FILTER_VALIDATE_REGEXP, 'options'=>array('regexp'=>'/^left|right$/')),
            'response' => array('filter' => FILTER_VALIDATE_REGEXP, 'options'=>array('regexp'=>'/^left|right$/')),
            'rt' => FILTER_VALIDATE_FLOAT,
            'correct' => FILTER_VALIDATE_BOOLEAN,
            'confidence' => array('filter' => FILTER_VALIDATE_INT, 'options'=>array(['min_range' => -1,'max_range' => 6]))
    );
     
    foreach($data as &$innerArray) {
        $innerArray = filter_var_array($innerArray,$args_san);
        $innerArray = filter_var_array($innerArray,$args_val);
        //if(empty($innerArray['correct'])){ 
        //    $innerArray['correct']=false;
        //};
    };

    $data = json_encode($data);
} else {exit;}

if (isset($post_data['file_name']) == true) {
    $file_name = $post_data['file_name'];
    $file_name = filter_var($file_name, FILTER_SANITIZE_STRING);
    $file_name = filter_var($file_name, FILTER_VALIDATE_REGEXP, array('options'=>array('regexp'=>'/^[0-9]{5}_dots_p(re|ost)$/')));//\_(gabor|dots|breath|span)
} else {exit;}

file_put_contents("../../metacog/task/$file_name.json", $data); //https://stackoverflow.com/questions/43519007/usage-of-http-raw-post-data
//file_put_contents("globals.log", print_r($GLOBALS,true)); //see what file should look like - good security to use the php file to check everything is as it should be in the globals.
} else {exit;}

?>
