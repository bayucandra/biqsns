<?php

    //BEGIN WOOCOMMERCE HOOKS================
    
    add_filter( 'woocommerce_enqueue_styles', '__return_false' );
    add_filter( 'loop_shop_columns', function(){ global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_columns"]; } );
    add_filter( 'loop_shop_per_page', function(){  global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_per_page"]; } );
    add_filter( 'woocommerce_output_related_products_args', function($args = array() ){ 
        global $biq_sns_settings;
        $args["post_per_page"] = $biq_sns_settings["woocommerce"]["loop_shop_per_page"];
        $args["columns"] = $biq_sns_settings["woocommerce"]["loop_shop_columns"];
        return $args;
    } );
    add_action('wp_enqueue_scripts', 'biq_wc_add_to_cart');

    add_filter( 'get_avatar', 'biq_get_avatar', 1, 5 );

    remove_action( 'woocommerce_review_before', 'woocommerce_review_display_gravatar', 10 );
    add_action( 'woocommerce_review_before', function( $comment ){
        echo get_avatar( $comment, apply_filters( 'woocommerce_review_gravatar_size', '70' ), '' );
    }, 10 );
    
    
    function biq_wc_add_to_cart(){
        global $template_uri;
        wp_deregister_script( 'wc-add-to-cart' );
        wp_register_script( 'wc-add-to-cart', $template_uri . '/frontend/js/woocommerce/add-to-cart.min.js', array('jquery'), WC_VERSION, true);
        wp_enqueue_script( 'wc-add-to-cart' );
    }
    
    function biq_get_avatar($avatar, $id_or_email, $size, $default, $alt){
        $biq_avatar = 
                '<div class="biq-avatar">'
                    .$avatar
                . '</div>';
        return $biq_avatar;
    }
    function biq_wc_template_loop_product_short_desc(){
        global $post;
        echo '<p class="short-desc">'.substr( $post->post_excerpt, 0, 100 ).'</p>';
    }