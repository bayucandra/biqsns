<?php
    global $template_directory;
    $json_path = $template_directory."/shortcodes/data/template/default.json";
    $ftemplate = fopen( $json_path, "r") or wp_die("Unable to open initial default template file.");
    
    $template = fread($ftemplate, filesize($json_path));
    fclose($ftemplate);
    
    $template_arr = json_decode($template, true);
    add_option('biq-sns-template',$template_arr);
    
    //BEGIN DEFAULT SETTINGS===================
    $settings = 
        '{
            "active_template": "default"
        }';
    $settings_arr = json_decode($settings, true);
    add_option('biq-sns-settings', $settings_arr);
    //END DEFAULT SETTINGS**************
?>
