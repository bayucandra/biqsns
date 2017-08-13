<?php
    function content_shortcode( $atts, $content=null ){
        extract(
            shortcode_atts(
                array(
                    'widget_id'=>'', 'classes'=>'', 'css_inline'=>'',
                    'float'=>'left'
                ),
                $atts
            )
        );
	
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes =  'class="biq-container biq-box-content '.$float.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="content" data-biq-css-default="biq-box-content"'
                : '';
        return '<div '.$element_attributes.'>'.do_shortcode($content).'</div>';
    }
    add_shortcode( 'biq_box_content', 'content_shortcode' );
?>
