<?php

    //BEGIN WOOCOMMERCE HOOKS================
    
    add_filter( 'woocommerce_enqueue_styles', '__return_false' );
    add_filter( 'loop_shop_columns', function(){ global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_columns"]; } );
    add_filter( 'loop_shop_per_page', function(){  global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_per_page"]; } );
    function biq_wc_add_to_cart(){
        global $template_uri;
        wp_deregister_script( 'wc-add-to-cart' );
        wp_register_script( 'wc-add-to-cart', $template_uri . '/frontend/js/woocommerce/add-to-cart.min.js', array('jquery'), WC_VERSION, true);
        wp_enqueue_script( 'wc-add-to-cart' );
    }
    add_action('wp_enqueue_scripts', 'biq_wc_add_to_cart');
