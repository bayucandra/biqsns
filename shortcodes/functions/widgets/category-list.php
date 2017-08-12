<?php
    function category_list_shortcode( $atts, $content = null ){
        global $wp_query;
        extract(
            shortcode_atts(
                array(
                    'widget_id'=>'', 'classes'=>'', 'css_inline'=>'',
                    'taxonomy'=>'product_cat', 'orderby'=>'name', 'order'=>'ASC',
                    'hide_empty'=>false, 'hierarchical'=>true
                ),
                $atts
            )
        );
        
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
                
        $element_attributes =  'class="biq-widgets category-list'.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="category_list" data-biq-css-default="category-list"'
                .' data-taxonomy="'.$taxonomy.'" data-orderby="'.$orderby.'" data-order="'.$order
                    .'" data-hide-empty="'.($hide_empty ? '1' : '0').'" data-hierarchical="'.($hierarchical ? '1' : '0') .'"'
                : '';
        //BEGIN CATEGORY QUERY==============
        $taxonomy = empty($taxonomy) ? 'product_cat' : $taxonomy;
        $args = array(
            'taxonomy'      => $taxonomy,
            'orderby'       => $orderby,
            'order'         => $order,
            'hide_empty'    => $hide_empty,
            'hierarchical'  => $hierarchical,
            'parent'        => 0
        );
        $queried_object = is_archive() ? $wp_query->get_queried_object() : '';
        $root_term = biq_woo_get_root_term();
        $root_term_id = count( $root_term ) > 0 ? $root_term->term_id : -1;
        
//        print_r($args);
        
        $categories = get_categories( $args );
        $ret_html_li = '';
        
        foreach($categories as $category){
            $active_class = ( !empty( $queried_object ) && (property_exists($queried_object, 'term_id')) 
                    && ( $queried_object->term_id == $category->term_id ) )
                    || ( ( $root_term_id != -1 ) && ( $root_term_id == $category->term_id ) )
                    ? ' class="active"' : '';
            $ret_html_li .= 
                    '<li'.$active_class.'>'
                        .'<a href="'.esc_url( get_category_link( $category->term_id ) ).'">'
                            .esc_html( $category->name )
                        .'</a>'
                    .'</li>';
        }
        if( (count($categories) == 0) && is_admin() ){
            $ret_html_li = "<li>***Category empty for current setting***</li>";
        }
        
        //END CATEGORY QUERY**************
        return
            '<ul '.$element_attributes.'>'
                .$ret_html_li
            .'</ul>';
    }
    add_shortcode('category_list', 'category_list_shortcode');
?>
