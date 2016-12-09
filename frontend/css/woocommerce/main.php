<?php
    header("Content-type: text/css; charset: UTF-8");
    require_once '../../../biq_sns_settings.php';
    $biq_sns_settings = unserialize($biq_sns_settings_serialized);
    
//100/$biq_sns_settings['woocommerce']['loop_shop_columns']
?>
ul.biq-products{
    list-style: none;
    list-style-type: none;
    position:relative;
    overflow:auto;
    padding:0;
}
ul.biq-products li.product{
    list-style: none;
    display: inline-block;
    box-sizing: border-box;
    width: <?php echo floor( 100/$biq_sns_settings['woocommerce']['loop_shop_columns'] *100) / 100;?>%;
}
