<?php
    add_theme_support( 'menus' );
    function biq_register_theme_menus(){
        register_nav_menus(
            array(
                'biq-menu-main' => __('Main Menu')
            )
        );
    }
    add_action('init', 'biq_register_theme_menus');
?>
