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

    remove_action( 'woocommerce_review_before', 'woocommerce_review_display_gravatar', 10 );
    add_action( 'woocommerce_review_before', function( $comment ){
        echo '<div class="biq-avatar">'
                .get_avatar( $comment, apply_filters( 'woocommerce_review_gravatar_size', '70' ), '' )
            .'</div>';
    }, 10 );
    
    function biq_wc_add_to_cart(){
        global $template_uri;
        wp_deregister_script( 'wc-add-to-cart' );
        wp_register_script( 'wc-add-to-cart', $template_uri . '/frontend/js/woocommerce/add-to-cart.min.js', array('jquery'), WC_VERSION, true);
        wp_enqueue_script( 'wc-add-to-cart' );
    }
    
    function biq_wc_template_loop_product_short_desc(){
        global $post;
        $desc_length = 100;
        $desc = ( strlen($post->post_excerpt) > $desc_length ) ?
                substr( $post->post_excerpt, 0, $desc_length ).'...'
                : substr( $post->post_excerpt, 0, $desc_length );
        echo '<p class="short-desc">'.$desc.'</p>';
    }
    
    function biq_wc_products_list(){
        global $biq_sns_settings;
        $product_display_mode = $biq_sns_settings["woocommerce"]["product_display_mode"];

        if( $product_display_mode == 'show' ){//begin removing some actions for this file
            remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
            remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
            remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
            //BEGIN ADD SHORT DESCRIPTION====
            add_action('woocommerce_shop_loop_item_title', 'biq_wc_template_loop_product_short_desc');
        }
    }