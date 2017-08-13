<?php
    function biq_box_sidebar_shortcode($atts, $content = null){
        extract(
            shortcode_atts(
                array(
                    'widget_id'=>'',
                    'classes'=>'',
                    'css_inline'=>'',
                    'float'=>''
                ),
                $atts
            )
        );
	
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        $float = empty($float) ? 'left' : $float;
        
        $element_attributes =  'class="biq-box-sidebar biq-container '.$float.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="sidebar" data-biq-css-default="biq-box-sidebar"'
                : '';
        
        return '<div '.$element_attributes.'>'.do_shortcode($content).'</div>';
    }
    add_shortcode('biq_box_sidebar', 'biq_box_sidebar_shortcode');
?>
