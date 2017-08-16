<?php
    function post_feed_shortcode($atts){
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline'=> '', 'classes'=> '',
                    'post_category'=>'post_category', 'limit'=> -1, 'clickable'=>'true', 'staggered' => 'false',
                    'type' => 'two_col_circle', 'size'=>'medium'

                ),
                $atts
            )
        );
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes = 'class="biq-widgets'.$classes.' post-feed"'.$css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="post_feed" data-biq-css-default="post-feed"'
                .' data-post-category="'.$post_category.'" data-limit="'.$limit.'" data-type="'.$type.'"'
                .' data-clickable="'.$clickable.'" data-size="'.$size.'"'
                : '' ;
        $element_attributes .=  ' data-staggered="'.$staggered.'"';
        
        $posts_per_page = $limit!=-1 ? '&posts_per_page='.$limit : '';
        
        $post_html = '';
        query_posts('category_name='.$post_category.$posts_per_page);
        while(have_posts()) : the_post();
            switch($type){
                case 'two_col_circle':
                    if($clickable == 'false'){
                        $post_html .= '<div class="box circle">';
                    }else{
                        $post_html .= '<a href="'.get_permalink().'" class="box circle">';
                    }
                    
                    $post_html .= 
                        '<div class="thumbnail-wrapper"'
                            . (has_post_thumbnail() ? 
                                'style="background-image: url(\''.get_the_post_thumbnail_url(get_the_id(), $size).'\')"'
                            :'')
                            .'>'//closure of <div
                        .'</div>'
                        .'<div class="content-wrapper">'
                            .'<h4>'. get_the_title(). '</h4>'
                            . '<div>'.wp_strip_all_tags(get_the_excerpt()).'</div>'
                        . '</div>';
                    
                    if($clickable == 'false'){
                        $post_html .= '</div>';
                    }else{
                        $post_html .= '</a>';
                    }
                    break;
            }
        endwhile;
        
        return 
            '<div '.$element_attributes.'>'.$post_html.'</div>';
    }
    
    add_shortcode('post_feed', 'post_feed_shortcode');
?>
