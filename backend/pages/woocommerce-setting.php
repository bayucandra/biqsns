<?php
    global $biq_sns_settings;
    if( isset( $_POST["biq-sns-woocommerce-setting-submit"] ) ){
        $biq_sns_settings["woocommerce"]["product_display_mode"] = $_POST["mode"];//BEGIN SET WOOCOMMERCE PRODUCT DISPLAY MODE
        $biq_sns_settings["woocommerce"]["loop_shop_columns"] = esc_html( $_POST["loop_shop_columns"] );
        $biq_sns_settings["woocommerce"]["loop_shop_per_page"] = esc_html( $_POST["loop_shop_per_page"] );
        update_option( 'biq-sns-settings', $biq_sns_settings );//AT THE END UPDATE SETINGS=============
        biq_sns_settings_file_gen();//update biq_sns_settings.php file
    }
?>