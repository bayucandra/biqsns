<?php
    global $biq_sns_settings;
    if( isset( $_POST["biq_sns_woocommerce_setting_submit"] ) ){
        //BEGIN SET WOOCOMMERCE PRODUCT DISPLAY MODE===============
        $biq_sns_settings["woocommerce"]["product_display_mode"] = $_POST["mode"];
        
        //END SET WOOCOMMERCE PRODUCT DISPLAY MODE**********
        update_option( 'biq-sns-settings', $biq_sns_settings );//AT THE END UPDATE SETINGS=============
    }
?>