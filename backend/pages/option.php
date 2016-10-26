<?php
    global $biq_sns_settings;
    if( isset( $_POST["biq-sns-theme-option-submit"] ) ){
        $biq_sns_settings["option"]["sidebar_width"] = esc_html( $_POST["sidebar_width"] );
        update_option( 'biq-sns-settings', $biq_sns_settings );
    }
?>
