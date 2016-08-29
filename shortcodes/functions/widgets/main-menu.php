<?php
    function main_menu_shortcode($atts){
	global $template_uri;
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline' => '', 'classes' => '',
                    'home_show' => true, 'float' => 'right', 'all_pages' => true,
                    'selected_pages' => array()//IF all_pages => false
                ),
                $atts
            )
        );
	if( !empty( $css_inline ) ) $css_inline = ' style = "'.$css_inline.'"';
        $main_menu_attribute =  'class="biq-widgets main-menu '.$float.' '.$classes.'"'. $css_inline 
                .' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="main_menu"';
        
        
        $options = array(
            'container'=>false, 'theme_location' => 'biq-main-menu', 'echo'=>false, 'fallback_cb' => 'main_menu_fallback'
        );
        $menu = wp_nav_menu($options);
        
        return
            '<div '.$main_menu_attribute.'>'
                .$menu
            .'</div>';
    }
    add_shortcode('main_menu', 'main_menu_shortcode');
    
    
    function main_menu_fallback(){
        $main_menu_attribute =  'class="biq-widgets main-menu right"'
                .' data-biq-widget-id="-1" data-biq-widget-type="main_menu"';
        $menu_item_home = 
                '<li>
                    <a href="'.site_url().'">Home</a>
                </li>';
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
            $menu_item_home .=
                '<li>
                    <a href="'.$page->guid.'">'.$page->post_title.'</a>
                </li>';
        }
        //END PAGES**********
//        return '<h3>Please setup a menu for your theme</h3>';
        return
            '<div '.$main_menu_attribute.'>'
                .'<label for="show-main-menu" class="show-main-menu">Menu</label>'
                .'<input id="show-main-menu" type="checkbox">'
                .'<ul>'
                    .$menu_item_home
                .'</ul>'
            .'</div>';
    }
?>
