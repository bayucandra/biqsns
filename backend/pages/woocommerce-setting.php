<?php
    global $biq_sns_settings;
    if( isset( $_POST["biq-sns-woocommerce-setting-submit"] ) ){
        $biq_sns_settings["woocommerce"]["product_display_mode"] = $_POST["mode"];//SET WOOCOMMERCE PRODUCT DISPLAY MODE
        $biq_sns_settings["woocommerce"]["hide_shorting"] = isset($_POST["hide_shorting"]) ? $_POST["hide_shorting"] : 0;
        $biq_sns_settings["woocommerce"]["loop_shop_columns"] = esc_html( $_POST["loop_shop_columns"] );
        $biq_sns_settings["woocommerce"]["loop_shop_per_page"] = esc_html( $_POST["loop_shop_per_page"] );
        update_option( 'biq-sns-settings', $biq_sns_settings );//AT THE END UPDATE SETINGS=============
    }
?>