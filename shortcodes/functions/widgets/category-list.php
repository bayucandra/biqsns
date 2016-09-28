<?php
    function category_list_shortcode( $atts, $content = null ){
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
        $args = array(
            'taxonomy'      => $taxonomy,
            'orderby'       => $orderby,
            'order'         => $order,
            'hide_empty'    => $hide_empty,
            'hierarchical'  => $hierarchical,
            'parent'        => 0
        );
        $categories = get_categories( $args );
        
        $ret_html_li = '';
        foreach($categories as $category){
            $ret_html_li .= 
                    '<li>'
                        .'<a href="'.esc_url( get_category_link( $category->term_id ) ).'">'
                            .esc_html( $category->name )
                        .'</a>'
                    .'</li>';
        }
        if( (count($categories) == 0) && is_admin() ){
            $ret_html_li = "<li>***Category data empty***</li>";
        }
        
        //END CATEGORY QUERY**************
        return
            '<ul '.$element_attributes.'>'
                .$ret_html_li
            .'</ul>';
    }
    add_shortcode('category_list', 'category_list_shortcode');
?>
