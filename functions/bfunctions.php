<?php
    function bget_head_shortcode(){
	$content_json = get_option('biq-sns-sc-head');
	
	$content_arr = json_decode($content_json, true);
	
	return barray_to_shortcode($content_arr);
    }
    function barray_to_shortcode($p_arr, $p_is_init = true){
	$short_code_str = "[" . $p_arr["shortcode"] ;//OPEN SHORT CODE TAG
	//begin parse and assign attributes to the shortcode=======================
	if(isset($p_arr["attributes"])){
	    if( is_array( $p_arr["attributes"] ) ){
		foreach($p_arr["attributes"] as $key=>$val){
		    $short_code_str .= ' '.$key .'="'. $val .'"';
		}
	    }
	}
	//end parse and assign attributes to the shortcoe*************
	$short_code_str .= "]";//Close shortcode opentag
	
	//BEGIN getting the content===========
	if( isset( $p_arr["content"] ) ){
	    $short_code_str .= $p_arr["content"];
	}
	//END getting the content********
	
	if( isset($p_arr["children"]) ){
	    if( is_array($p_arr["children"]) ){
		foreach($p_arr["children"] as $child){
		    $short_code_str .= barray_to_shortcode( $child, false );//recursive
		}
	    }
	}elseif( !$p_is_init ){
	    $short_code_str .= "[/" . $p_arr["shortcode"] ."]";//shortcode close tag for recursive
	    return $short_code_str;
	}
	$short_code_str .= "[/" . $p_arr["shortcode"] ."]";//shortcode closing tag for this scope
	return $short_code_str;
    }

    function get_path_separator(){
	return (strstr(strtoupper(substr(PHP_OS, 0, 3)), "WIN")) ? "\\" : "/";
    }
    function bsession_life($p_path){
	$lifetime = 60 * 60 * 24 * 7;//7 days
	$separator=get_path_separator();
	$path_dir=$p_path."{$separator}BIQSession";
	$session_dir_ok=true;
	if(!file_exists($path_dir)){
	    if(!mkdir($path_dir, 0770, true)){
		$session_dir_ok=false;
	    }
	}
	if($session_dir_ok){
	    ini_set("session.cookie_lifetime", $lifetime);
	    ini_set("session.gc_maxlifetime", $lifetime);
	    ini_set("session.gc_divisor", "1000");
	    ini_set("session.gc_probability", "1");
	    ini_set("session.save_path", $path_dir);

	    //BEGIN STARTING SESSION================
	    if (!defined('PHP_VERSION_ID')) {
		$version = explode('.', PHP_VERSION);

		define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
	    }
	    if(PHP_VERSION_ID>=50400){
		if (session_status() == PHP_SESSION_NONE) {
		    session_start();
		}
	    }else{
		if(!session_id()) {
		    session_start();
		}
	    }
	    //END STARTING SESSION*************
	}else{
	    echo "<h1><red>There is error with session directory</red></h1>";
	}
    }
?>
