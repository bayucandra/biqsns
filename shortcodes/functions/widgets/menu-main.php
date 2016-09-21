<?php
    function menu_main_shortcode($atts){
//	global $template_uri;
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline' => '', 'classes' => '',
                    'float' => 'right', 'all_pages' => true,
                    'selected_pages' => array()//IF all_pages => false
                ),
                $atts
            )
        );
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes =  'class="biq-widgets menu-main '.$float.$classes.'"'. $css_inline ;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="menu_main" data-biq-css-default="menu-main right left"'
                : '';
        
        
        $options = array(
            'container'=>false, 'theme_location' => 'biq-menu-main', 'echo'=>false, 'fallback_cb' => 'menu_main_fallback'
        );
        $menu = wp_nav_menu($options);
        
        return
            '<div '.$element_attributes.'>'
                .'<label for="show-menu-main" class="show-menu-main">Menu</label>'
                .'<input id="show-menu-main" type="checkbox">'
                .$menu
            .'</div>';
    }
    add_shortcode('menu_main', 'menu_main_shortcode');
    
    
    function menu_main_fallback(){
        $menu_item = 
                '<li>
                    <a href="'.site_url().'">Homes</a>
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
            $menu_item .=
                '<li>
                    <a href="'.get_permalink($page->ID).'">'.$page->post_title.'</a>
                </li>';
        }
        //END PAGES**********
//        return '<h3>Please setup a menu for your theme</h3>';
        return
            '<span class="widget-not-ready">Please setup Wordpress theme menu first</span>'.
            '<ul>'
                .$menu_item
            .'</ul>';
    }
?>
