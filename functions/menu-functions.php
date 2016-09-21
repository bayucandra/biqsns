<?php
    function biq_register_theme_menus(){
        register_nav_menus(
            array(
                'biq-menu-main' => __('Main Menu')
            )
        );
    }
    add_action('init', 'biq_register_theme_menus');
    
    //BEGIN CREATE DEFAULT MENU====================================
    // Check if the menu exists
    $menu_name = 'Main Menu';
    $is_menu_exists = wp_get_nav_menu_object( $menu_name );

    // If it doesn't exist, let's create it.
    if( !$is_menu_exists){
        $menu_id = wp_create_nav_menu($menu_name);

        // Set up default menu items
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' =>  __('Home'),
//            'menu-item-classes' => 'home',
            'menu-item-url' => home_url( '/' ), 
            'menu-item-status' => 'publish'));

        //BEGIN PAGES============
        $pages_args = array(
                'sort_order' => 'asc',
                'sort_column' => 'menu_order',
                'hierarchical' => 0,
                'exclude' => '',
                'include' => '',
                'meta_key' => '',
                'meta_value' => '',
                'authors' => '',
                'child_of' => 0,
                'parent' => 0,
                'exclude_tree' => '',
                'number' => '',
                'offset' => 0,
                'post_type' => 'page',
                'post_status' => 'publish'
            );
        $pages = get_pages();
        foreach($pages as $page){
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' =>  __($page->post_title),
                'menu-item-url' => get_permalink($page->ID), 
                'menu-item-status' => 'publish'));
        }
        //END PAGES**********
        $menu_location = "biq-menu-main";
        if( !has_nav_menu( $menu_location ) ){
            $locations = get_theme_mod('nav_menu_locations');
            $locations[$menu_location] = $menu_id;
            set_theme_mod( 'nav_menu_locations', $locations );
        }
    }
    //END CREATE DEFAULT MENU************************************
?>
