<?php
    function biq_get_head_shortcode($p_part=""){ //$p_part : "home", "page", "product"
//	$content_json = get_option('biq-sns-template');
	global $template_arr;
	global $biq_sns_settings;
        $template = !empty($p_part) && array_key_exists( "header", $template_arr[ $biq_sns_settings["active_template"] ] [$p_part] ) ? // IF part has custom "header" part
                $template_arr[ $biq_sns_settings["active_template"] ][$p_part]["header"] // Use the custom "header" of the part
                : $template_arr[ $biq_sns_settings["active_template"] ]["header"]["widget"]; //Use the main default "header"
//        print_r($template);
//        echo biq_array_to_shortcode($template);
	return biq_array_to_shortcode($template);
    }
    /**
     * Generate shortcode from template structure by it array address
     * @global type $template_arr
     * @global type $biq_sns_settings
     * @param type $p_part
     * @param type $p_sub_part If this is array, then it is mean address to multi dimensional array, otherwise it will get the first child match
     * @return type short code generate by biq_array_to_shortcode() function
     */
    function biq_get_shortcode_part($p_part, $p_sub_part){
	global $template_arr;
	global $biq_sns_settings;
        $template = $template_arr[ $biq_sns_settings["active_template"] ][$p_part];
        if( !is_array($p_sub_part) ){
            $template = $template[$p_sub_part];
        }else{
            foreach( $p_sub_part AS $sub_part ){
                $template = $template[ $sub_part];
            }
        }
        
//        echo "<pre>";
//        print_r( $template );
//        echo "</pre>";

//        echo biq_array_to_shortcode($template);
        return biq_array_to_shortcode($template);
    }
    function biq_array_to_shortcode($p_arr, $p_is_init = true){
	$short_code_str = "[" . $p_arr["shortcode"] ;//OPEN SHORT CODE TAG
	//begin parse and assign attributes to the shortcode=======================
	if(isset($p_arr["attributes"])){
	    if( is_array( $p_arr["attributes"] ) ){
		foreach($p_arr["attributes"] as $key=>$val){
                    if($key=='list'){ //block 'list' keyword to be stand as attribute, it must be have a special treatment
                        continue;
                    }
		    $short_code_str .= ' '.$key .'="'. $val .'"';
		}
	    }
	}
        $short_code_str .= ' widget_id="'. $p_arr["widget_id"] .'"';//MANDATORY widget_id attribute
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
                    if( isset($child["part"]) ){//IF reference to other part, e.g: "home", "footer", "header" etc.
                        global $template_arr;
                        global $biq_sns_settings;
                        $short_code = $template_arr[ $biq_sns_settings["active_template"] ] [ $child["part"] ] [ $child["sub_part"] ];
                        $short_code_str .= biq_array_to_shortcode( $short_code, false );
                    }else{
                        $short_code_str .= biq_array_to_shortcode( $child, false );//recursive
                    }
		}
	    }
	}elseif( !$p_is_init ){
	    $short_code_str .= "[/" . $p_arr["shortcode"] ."]";//shortcode close tag for recursive
	    return $short_code_str;
	}
	$short_code_str .= "[/" . $p_arr["shortcode"] ."]";//shortcode closing tag for this scope
	return $short_code_str;
    }

    /**
     * Find template item with specific widget_id
     * @param array $p_arr array of widget structure
     * @param array $p_widget_id The id of widget to find
     * @return array return array contain "is_found"(bool) and "data"(array)
     */
    function biq_widget_find($p_arr, $p_widget_id){
        $arr_ret = array("is_found"=>false, "data"=>array());
        foreach($p_arr AS $key=>$val){
            if( is_array($val) ){
                if( isset($val["widget_id"]) && ($val["widget_id"]==$p_widget_id) ){
                    $arr_ret["is_found"] = true;
                    $arr_ret["data"] = $val;
                    return $arr_ret;
                }else{
                    $arr_ret = biq_widget_find($val, $p_widget_id);
                }
            }
            if($arr_ret["is_found"]){
                break;
            }
        }
        return $arr_ret;
    }
    function biq_widget_id_init(&$p_arr){
        global $widget_id_next;
        if(!isset($widget_id_next)){ $widget_id_next=1; }
        foreach($p_arr AS $key=> &$val){
//            echo "<pre>";
//            print_r($val);
//            echo "</pre>";
            if( is_array($val) && array_key_exists("shortcode", $val) ){
                $val["widget_id"] = $widget_id_next;
                $widget_id_next++;
                if(array_key_exists("children", $val) ){
                    biq_widget_id_init($val["children"]);
                }
            }
            elseif(is_array($val)){
                biq_widget_id_init($val);
            }
        }
    }
    function biq_get_path_separator(){
	return (strstr(strtoupper(substr(PHP_OS, 0, 3)), "WIN")) ? "\\" : "/";
    }
    function biq_session_life($p_path){
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
    /**
     * Create biq_sns_settings.php file at theme root directory if at load the file not exist, or update when $init = false
     * @param $init will be false by default, when set to true it will only for the first load and generate the file if not exist.
     *       The false one is for update_option(), so it will ignore the file_exist() check
     */
    function biq_sns_settings_file_gen( $init = false ){//Generate biq_sns_settings.php at the root theme folder which contain array comes from get_option()
        global $template_directory;
        global $biq_sns_settings;
        $biq_settings_path = $template_directory."/biq_sns_settings.php";
        if( !file_exists( $biq_settings_path || !$init ) ){
            $biq_settings_file = fopen($biq_settings_path, "w") or wp_die("Failed to write biq_settings.php at theme folder, please make sure your web server have sufficient permission to write there.");
            
            $var_script = "<?php /*This file is purposed to read theme settings for CSS files and other files outside wrodpress scope.*/\r";
                $var_script .= "\r";
                $var_script .= '$biq_sns_settings_serialized = \''. serialize($biq_sns_settings).'\';'." \r \r";
            $var_script .= '?>';
            fwrite($biq_settings_file, print_r($var_script, true));
            fclose($biq_settings_file);
            chmod( $biq_settings_path, 0775 );
        }
    }
    function biq_woo_get_root_term() {
        global $post;
        $root_term=array();
        if( !is_product() ){
            return $root_term;
        }
        $terms = wc_get_product_terms( $post->ID, 'product_cat', array( 'orderby' => 'parent', 'order' => 'DESC' ) );
        if ( ! empty( $terms ) ) {
            $main_term = $terms[0];
            $ancestors = get_ancestors( $main_term->term_id, 'product_cat' );
            if ( ! empty( $ancestors ) ) {
                $ancestors = array_reverse( $ancestors );
                // first element in $ancestors has the root category ID
                // get root category object
                $root_term = get_term( $ancestors[0], 'product_cat' );
            }else {
                $root_term = $main_term;
            }
        }else {
            // no category assigned to the product
        }
        return $root_term;
    }
?>
