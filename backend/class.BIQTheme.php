<?php
/** 
 * @class BIQTheme
 * @brief For updating widget data of theme
 * 
 * This class is mainly purposed for updating widget which stored at Wordpress 'option' table
 */
    class BIQTheme{
        private $template_arr;//!< global variables which store value that generated with get_option() at function.php file
        private $biq_sns_settings, $bimage, $template_directory;
        /**
         * Mostly initializing global variables
         */
        public function __construct($arr_params=array()){
            global $template_arr; global $biq_sns_settings; global $bimage; global $template_directory;
            $this->template_arr = &$template_arr;
            $this->biq_sns_settings = &$biq_sns_settings;
            $this->bimage = $bimage;
            $this->template_directory = $template_directory;
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
            }
            echo json_encode($widget_result);
            update_option('biq-sns-template', $this->template_arr);
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function contact_email_simple_update($p_data){
            $attributes = array( "widget_id"=>$p_data["widget_id"] );
            if( !empty($p_data["icon_type"]) ){ $attributes["icon_type"] = $p_data["icon_type"]; }
            if( !empty($p_data["icon_value"]) ){ $attributes["icon_value"] = $p_data["icon_value"]; }
            if( !empty($p_data["css_inline"]) ){ $attributes["css_inline"] = $p_data["css_inline"]; }
            if( !empty($p_data["classes"]) ){ $attributes["classes"] = $p_data["classes"]; }
            
            $update_arr = array( "attributes" => $attributes, "content" => $p_data["content"] );
            $widget_update_res = $this->widget_update(
                    $this->template_arr[ $this->biq_sns_settings["active_template"] ],
                    $update_arr, $attributes["widget_id"]
                );
            return $widget_update_res;
        }
        /**
         * @brief Generate widget structure by using widget_update() function and called with save()
         */
        function logo_update($p_data){
            $attributes = array("widget_id"=>$p_data["widget_id"]);
            
            //BEGIN PROCESSING THE IMAGE===========
            $img_file_name = $_FILES["img_file_name"];
            if(!empty($img_file_name)){
                $this->bimage->load_image($img_file_name["tmp_name"]);
                $image_is_valid=$this->bimage->get_error("success");
                if($image_is_valid){
                    $logo_path = $this->template_directory."/images/biq/widgets/contact-email-simple/".$img_file_name["name"];
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
                    $update_arr, $attributes["widget_id"]
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
        function widget_update(&$p_arr, &$p_update_arr, $p_widget_id){
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
    }
?>
