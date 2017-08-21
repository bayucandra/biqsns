<?php
    function footer_developer_info_shortcode($atts){
        extract(
            shortcode_atts(
                array(
                    'widget_id'=>'', 'css_inline'=> '', 'classes'=> '',
                    'show'=>'true',
                ),
                $atts
            )
        );
        
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes =  'class="biq-widgets'.$classes.' footer-developer-info"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="footer_developer_info" data-biq-css-default="footer-developer-info"'
                : '';
        
        return '<div '.$element_attributes.'>'
                .'<h5>Developed by BIQDev</h5>'
        . '</div>';
    }
    add_shortcode( 'footer_developer_info', 'footer_developer_info_shortcode' );
?>
