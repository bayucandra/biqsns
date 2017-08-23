<?php
/** 
 * @class BIQTheme
 * @brief For updating widget data of theme
 * 
 * This class is mainly purposed for updating widget which stored at Wordpress 'option' table
 */
    class BIQTheme{
        private $template_arr;//!< global variables which store value that generated with get_option() at function.php file
        private $biq_sns_settings, $bimage, $template_directory, $template_uri;
        /**
         * Mostly initializing global variables
         */
        public function __construct($arr_params=array()){
            global $template_arr; global $biq_sns_settings; global $bimage; global $template_directory; global $template_uri;
            $this->template_arr = &$template_arr;
            $this->biq_sns_settings = &$biq_sns_settings;
            $this->bimage = $bimage;
            $this->template_directory = $template_directory;
            $this->template_uri = $template_uri;
        }
        /**
         * @brief Save modified widget with wordpress function : update_option()
         * 
         * This function should be called via AJAX at file backend/ajax-submit.php by using wp-ajax-.
         * It will first detect 'widget_type' from $_POST variable then call appropriate function related to widget type. e.g : contact_email_simple_update()
         * 
         * @param array $p_arr got from $_POST PHP variable contain 'widget_type' and other widget detail
         */
        public function save($p_arr){
            if(!isset($p_arr["widget_type"])){
                echo '<h3>Error class BIQTheme::save()</h3>';
                return;
            }
            $widget_result = $this->widget_error();
            switch($p_arr['widget_type']){
                case 'contact_email_simple':
                    $widget_result = $this->contact_email_simple_update($p_arr);
                    break;
                case 'logo':
                    $widget_result = $this->logo_update($p_arr);
                    break;
                case 'menu_main':
                    $widget_result = $this->menu_main_update($p_arr);
                    break;
                case 'heading_section_left':
                    $widget_result = $this->heading_section_left_update($p_arr);
                    break;
                case 'category_list':
                    $widget_result = $this->category_list_update($p_arr);
                    break;
                case 'slider':
                    if($p_arr['mode']== 'create'){
                        $widget_result = $this->slider_list_create($p_arr);
                    }elseif($p_arr['mode']== 'destroy'){
                        $widget_result = $this->slider_list_destroy($p_arr);
                    }elseif( $p_arr['mode']== 'update' ){
                        $widget_result = $this->slider_list_update($p_arr);
                    }else{//list widget only
                        $widget_result = $this->slider_list();
                    }
                    break;
                case 'footer_short_description':
                    $widget_result = $this->footer_short_description_update($p_arr);
                    break;
                case 'footer_developer_info':
                    $widget_result = $this->footer_developer_info_update($p_arr);
                    break;
                case 'post_feed':
                    $widget_result = $this->post_feed_update($p_arr);
                    break;
            }
            echo json_encode($widget_result);
            update_option('biq-sns-template', $this->template_arr);
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function contact_email_simple_update($p_data){
            $attributes = array( );
            if( !empty($p_data["icon_type"]) ){ $attributes["icon_type"] = $p_data["icon_type"]; }
            if( !empty($p_data["icon_value"]) ){ $attributes["icon_value"] = $p_data["icon_value"]; }
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            
            $update_arr = array( "attributes" => $attributes, "content" => $p_data["content"] );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function logo_update($p_data){
            $attributes = array();
            
            //BEGIN PROCESSING THE IMAGE===========
            $img_file_name = $_FILES["img_file_name"];
            if(!empty($img_file_name)){
                $this->bimage->load_image($img_file_name["tmp_name"]);
                $image_is_valid=$this->bimage->get_error("success");
                if($image_is_valid){
                    $logo_path = $this->template_directory."/images/biq/widgets/logo/".$img_file_name["name"];
                    $logo_upload_process = $this->bimage->save($logo_path);
                    if(!$logo_upload_process["success"]){
                        return $this->widget_error("Please make sure theme folder has write permission. Error when uploading logo image: ".$logo_upload_process["message"]);
                    }
                    $attributes["img_file_name"] = $img_file_name["name"];
                }else{
                    return $this->widget_error("Uploaded image is not valid, please only upload JPEG/PNG/GIF.");
                }
            }
            //END PROCESSING THE IMAGE*************
            
            if( !empty($p_data["img_alt"]) ){ $attributes["img_alt"] = $p_data["img_alt"]; }
            if( !empty($p_data["img_title"]) ){ $attributes["img_title"] = $p_data["img_title"]; }
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }

            $update_arr = array( "attributes" => $attributes  );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function menu_main_update($p_data){
            $attributes = array();
            $attributes["float"] = $p_data["float"];
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            
            $update_arr = array("attributes" => $attributes);
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function heading_section_left_update($p_data){
            $attributes = array( );
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            
            $attributes["tag_name"] = $p_data["tag_name"];
            $attributes["highlight"] = $p_data["highlight"];
            
            $update_arr = array("attributes"=>$attributes, "content"=>$p_data["content"] );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function category_list_update($p_data){
            $attributes = array();
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            $attributes["taxonomy"] = $p_data["taxonomy"]; $attributes["orderby"] = $p_data["orderby"]; $attributes["order"] = $p_data["order"];
            $attributes["hide_empty"] = $p_data["hide_empty"]; $attributes["hierarchical"] = $p_data["hierarchical"];
            
            $update_arr = array( "attributes"=>$attributes );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        function footer_short_description_update($p_data){
            $attributes = array();
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            $attributes["title"] = $p_data["title"];
            $attributes["description"] = $p_data["description"]; $attributes["description_source"] =$p_data["description_source"];
            
            $update_arr = array( "attributes"=>$attributes );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /*
         * @breif Update Footer developer info widget
         */
        function footer_developer_info_update($p_data){
            $attributes = array();
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            $attributes["visible"] = $p_data["visible"];
            
            $update_arr = array("attributes"=>$attributes);
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Update Post Feed
         */
        function post_feed_update($p_data){
            $attributes = array();
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            $attributes["post_category"] = $p_data["post_category"];
            $attributes["limit"] = $p_data["limit"];
            $attributes["clickable"] = $p_data["clickable"];
            $attributes["staggered"] = $p_data["staggered"];
            $attributes["type"] = $p_data["type"];
            $attributes["size"] = $p_data["size"];
            
            $update_arr = array("attributes"=>$attributes);
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Create list for slider
         */
        function slider_list_create($p_data){
            $ret_arr = array("is_found"=>true, "widget_id"=>$p_data["widget_id"], "html"=>"", "message"=>"");
            $img_file = $_FILES[$p_data["file_key"]];
            
            $path_base = $this->template_directory."/images/biq/widgets/".$p_data['file_key']."/".$p_data["widget_id"];
            $path_base_exist = true;
            if(!file_exists( $path_base ) ){
                $path_base_exist = mkdir( $path_base );
            }
            if(!$path_base_exist){
                $ret_arr["is_found"] = false;
                $ret_arr["message"] = "Error when creating directory at server, please make sure it is writeable.";
                return $ret_arr;
            }
//            $img_path = $this->template_directory."/images/biq/widgets/{$p_data['file_key']}/".$img_file["name"];
            
            $widget_current = biq_widget_find(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $p_data["widget_id"]
                );
            $list_new_arr = json_decode($widget_current["data"]["attributes"]["list"], true);
            //BEGIN CHECK IF IMAGE NAME ALREADY IN LIST=========
            foreach($list_new_arr AS $item){
                if($img_file["name"]==$item["img_name"]){
                    $ret_arr["is_found"]=false;
                    $ret_arr["message"]="Error, Slider with image name: ".$img_file["name"].", is already exist.";
                    return $ret_arr;
                }
            }
            //END CHEK IF IMAGE NAME ALREADY IN LIST*****
            if(!empty($img_file["name"])){
                $this->bimage->load_image($img_file["tmp_name"]);
                $image_is_valid=$this->bimage->get_error("success");
                if($image_is_valid){
                    $img_path = $path_base."/".$img_file["name"];
                    $img_upload_process = $this->bimage->save($img_path);
                    if(!$img_upload_process["success"]){
                        $ret_arr["is_found"] = false;
                        $ret_arr["message"] = "Please make sure theme folder has write permission. Error when uploading slider image: ".$img_upload_process["message"];
                        return $ret_arr;
                    }
//                    set_max_size($p_arr){// $p_arr=array("max_width","max_height");
                    $thumb_path = $path_base."/thumb_".$img_file["name"];
                    $this->bimage->set_max_size( array( "max_width"=>150, "max_height"=>150 ) );
                    $img_thumb_upload_process = $this->bimage->save($thumb_path);
                    if(!$img_thumb_upload_process["success"]){
                        $ret_arr["is_found"] = false;
                        $ret_arr["message"] = "Please make sure theme folder has write permission. Error when uploading thumbnail image: ".$img_thumb_upload_process["message"];
                        return $ret_arr;
                    }
                }else{
                    $ret_arr["is_found"] = false;
                    $ret_arr["message"] = "Uploaded image is not valid, please only upload JPEG/PNG/GIF.";
                    return $ret_arr;
                }
            }else{
                $ret_arr["is_found"] = false;
                $ret_arr["message"] = "Image is required, please don't left it empty";
                return $ret_arr;
            }
            //BEGIN PRODUCING RECORD OF LIST==============
            $list_record_new = array();
            $list_record_new["img_name"] = $img_file["name"];//key for deleting purpose (unique key)
            $list_record_new["key"] = $p_data['file_key'];
            $list_record_new["uri_base"] = $this->template_uri."/images/biq/widgets/".$p_data['file_key']."/".$p_data["widget_id"];
            
            $inputs_str = stripslashes($p_data["inputs"]);
            $inputs = json_decode( $inputs_str, true);
            $list_record_new["inputs"] = $inputs;
            //END PRODUCING RECORD OF LIST***********
            $list_new_arr[] = $list_record_new;
            $list_new_json = json_encode($list_new_arr);
//            $list_new_json_trim = substr($list_new_json, 1, count($list_new_json)-2);//Remove '[' and ']'
            
            $attributes = array("list"=>$list_new_json);
            $update_arr = array("attributes"=>$attributes);
//            print_r($attributes);
//            print_r($update_arr);
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"],
                    array("json_data"=>$list_new_json)
                );
//            print_r($list_new_json_trim);
//            print_r($list_record_new);
//            print_r($list_new);
//            print_r($p_data);
            return $widget_update_res;
        }
        /**
         * @brief update special input type named 'list'
         */
        function slider_list_update($p_data){
            $ret_arr = array("is_found"=>true, "widget_id"=>$p_data["widget_id"], "html"=>"", "message"=>"");
            $img_file = $_FILES[$p_data["file_key"]];
            
            $path_base = $this->template_directory."/images/biq/widgets/".$p_data['file_key']."/".$p_data["widget_id"];
            
            if(!empty($img_file["name"])){
                $img_old_path = $path_base."/".$p_data["img_name_old"];
                if( !unlink($img_old_path) ){//delete old file
                    $ret_arr["is_found"] = false;
                    $ret_arr["message"] = "Error deleting old file :".$p_data["img_name_old"];
                    return $ret_arr;
                }
                $this->bimage->load_image($img_file["tmp_name"]);
                $image_is_valid=$this->bimage->get_error("success");
                if($image_is_valid){
                    $img_path = $path_base."/".$img_file["name"];
                    $img_upload_process = $this->bimage->save($img_path);
                    if(!$img_upload_process["success"]){
                        $ret_arr["is_found"] = false;
                        $ret_arr["message"] = "Please make sure theme folder has write permission. Error when uploading slider image: ".$img_upload_process["message"];
                        return $ret_arr;
                    }
                    $thumb_path = $path_base."/thumb_".$img_file["name"];
                    $this->bimage->set_max_size( array( "max_width"=>150, "max_height"=>150 ) );
                    $img_thumb_upload_process = $this->bimage->save($thumb_path);
                    if(!$img_thumb_upload_process["success"]){
                        $ret_arr["is_found"] = false;
                        $ret_arr["message"] = "Please make sure theme folder has write permission. Error when uploading thumbnail image: ".$img_thumb_upload_process["message"];
                        return $ret_arr;
                    }
                }else{
                    $ret_arr["is_found"] = false;
                    $ret_arr["message"] = "Uploaded image is not valid, please only upload JPEG/PNG/GIF.";
                    return $ret_arr;
                }
            }
            //BEGIN PRODUCING RECORD OF LIST=====
            $list_record_update = array();
            $list_record_update["img_name"] = !empty($img_file["name"]) ? $img_file["name"] : $p_data["img_name_old"];
            $list_record_update["key"] = $p_data["file_key"];
            $list_record_update["uri_base"] = $this->template_uri."/images/biq/widgets/".$p_data["file_key"]."/".$p_data["widget_id"];
            $inputs_str = stripslashes($p_data["inputs"]);
            $inputs = json_decode( $inputs_str, true);
            $list_record_update["inputs"] = $inputs;
            //END PRODUCING RECORD OF LIST***********
            $widget_current = biq_widget_find(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $p_data["widget_id"]
                );
            $list_update_arr = json_decode($widget_current["data"]["attributes"]["list"], true);
            for( $i=0; $i< count($list_update_arr) ;$i++ ){//updating list data
                if($list_update_arr[$i]["img_name"] == $p_data["img_name_old"]){
                    foreach( $list_record_update AS $key=>$val ){
                        $list_update_arr[$i][$key] = $val;
                    }
                }
            }
            $list_update_json = json_encode($list_update_arr);
            $attributes = array("list"=>$list_update_json);
            $update_arr = array("attributes"=>$attributes);
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"],
                    array("json_data"=>$list_update_json)
                );
            return $widget_update_res;
        }
        /**
         * @brief delete special input type named 'list'
         */
        function slider_list_destroy($p_data){
            $ret_arr = array("is_found"=>true, "widget_id"=>$p_data["widget_id"], "html"=>"", "message"=>"");
            
            $widget_current = biq_widget_find(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $p_data["widget_id"]
                );
            $list_arr = json_decode($widget_current["data"]["attributes"]["list"], true);
            $path_base = "";
            $list_new_arr = array();
            foreach($list_arr AS $list){
                if( $list["img_name"] == $p_data["img_name"] ){
                    $path_base = $this->template_directory."/images/biq/widgets/".$list["key"]."/".$p_data["widget_id"];
                    continue;
                }
                $list_new_arr[] = $list;
            }
            if( (file_exists($path_base."/".$p_data["img_name"])) && !unlink($path_base."/".$p_data["img_name"]) ){
                $ret_arr["is_found"] = false;
                $ret_arr["message"] = "Error when deleting slider: ".$p_data["image_name"];
                return $ret_arr;
            }
            $list_new_json = json_encode($list_new_arr);
            $attributes = array( "list"=>$list_new_json );
            $update_arr = array( "attributes"=>$attributes );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $p_data["widget_id"],
                    array("json_data"=>$list_new_json)
                );
            return $widget_update_res;
        }
        /**
         * Search template array for match widget. The array stored as global variable referenced by $this->template_arr.
         * 
         * @param array &$p_arr reference to main template array match to "active_template" settings array
         * @param array &p_update_arr is generated array based on user input. It will produce structure of widget with new data inputed.
         * @param $p_widget_id the widget_id which need to update, will be parse and search by loop function
         * @return array contain array is_found=>true/false, "html"=> html widget generated with do_shortcode
         */
        function widget_update(&$p_arr, &$p_update_arr, $p_widget_id, $p_opt_arr = array()){
            $arr_ret = array("is_found"=>false, "widget_id"=>$p_widget_id, "html"=>"");
            foreach($p_arr as $key=>&$val){
                if( is_array($val) ){
                    if( isset($val["widget_id"]) && ($val["widget_id"]==$p_widget_id) ) {
                        $this->widget_item_update($val, $p_update_arr);
                        
                        $arr_ret["is_found"] = true;
                        $arr_ret["html"] = do_shortcode( biq_array_to_shortcode($val) );
                        return $arr_ret;
                    }else{
                        $arr_ret = $this->widget_update($val, $p_update_arr, $p_widget_id);
                    }
                }
                if($arr_ret["is_found"]){//Break the main function foreach
                    break;
                }
            }
            if(isset($p_opt_arr["json_data"])){
                $arr_ret["json_data"] = $p_opt_arr["json_data"];
            }
            return $arr_ret;
        }
        /**
         * Update template data item value.
         * 
         * @param array &$p_arr_widget reference of array of widget structure with widget_id match to $p_widget_id parameter on widget_update() function
         * @param array $p_arr_update is the value for update the value of &$p_arr_widget
         */
        function widget_item_update(&$p_arr_widget, $p_arr_update){
            foreach($p_arr_update as $key=>$val){
                $p_arr_widget[$key] = $val;
            }
        }
        /**
         * Generate and give array return which represent error state
         * 
         * @param string String of error message to be shown
         */
        function widget_error($p_message = ""){
            $arr_ret = array("is_found"=>false, "widget_id"=>-1, "html"=>$p_message);
            return $arr_ret;
        }
        //BEGIN WP_AJAX_WIDGET_QUERY======================
        function widget_query( $p_arr ){
            if(!isset($p_arr["query_type"])){
                echo '<h3>Error class BIQTheme::widget_query()</h3>';
                return;
            }
            $query_result = array();
            switch($p_arr['query_type']){
                case 'slider':
                    $query_result = $this->query_slider($p_arr);
                    break;
            }
            echo json_encode($query_result);
        }
        function query_slider($p_data){
            $arr_ret = array("success"=>true, "widget_id"=>$p_data["widget_id"], "list"=>array());
            $widget_current = biq_widget_find(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $p_data["widget_id"]
                );
            $arr_ret["list"] = json_decode($widget_current["data"]["attributes"]["list"], true);
            if(!is_array($arr_ret["list"])){
                $arr_ret["list"] = array();
            }
            return $arr_ret;
        }
    }
?>
