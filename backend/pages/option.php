<?php
    global $biq_sns_settings;
    if( isset( $_POST["biq-sns-theme-option-submit"] ) ){
        $biq_sns_settings["option"]["maintenance_mode"] = isset($_POST["maintenance_mode"]) ? esc_html( $_POST["maintenance_mode"] ) : "0";
        
        $biq_sns_settings["option"]["home_meta_keyword"] = esc_html( $_POST["home_meta_keyword"] );
        $biq_sns_settings["option"]["home_meta_description"] = esc_html( $_POST["home_meta_description"] );
        update_option( 'biq-sns-settings', $biq_sns_settings );
    }
?>
