<?php
    function post_feed_shortcode($atts){
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline'=> '', 'classes'=> '',
                    'post_category'=>'post_category','type' => 'two_col_rect', 'limit'=> -1

                ),
                $atts
            )
        );
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes = 'class="biq-widgets"'.$classes.' post-feed'.$css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="post_feed"'
                .' data-post-category="'.$post_category.'" data-type="'.$type.'" data-limit="'.$limit.'"'
                : '' ;
        
        $posts_per_page = $limit!=-1 ? '&posts_per_page='.$limit : '';
        
        $post_html = '';
        query_post('category_name='.$post_category.$posts_per_page);
        while(have_posts()) : the_post();
            $post_html .= the_title();
        endwhile;
        
        return 
            '<div '.$element_attributes.'>Test</div>';
    }
    
    add_shortcode('post_feed', 'post_feed_shortcode');
?>