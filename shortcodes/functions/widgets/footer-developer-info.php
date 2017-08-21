<?php
    function footer_developer_info_shortcode($atts){
        global $template_uri;
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
        
        $element_attributes =  'class="biq-widgets column right'.$classes.' footer-developer-info"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="footer_developer_info" data-biq-css-default="footer-developer-info"'
                : '';
        
        return '<div '.$element_attributes.'>'
                .'<div class="header">'
                    .'<h5>WP-theme created by: <span>BIQ</span><span>Dev</span></h5>'
                    .'<img src="'.$template_uri.'/images/biq/biq-logo.png" alt="BIQDev Logo"/>'
                .'</div>'
                .'<div class="footer">'
                    .'<a href="https://github.com/biqdev/biqsns" target="_blank"><img src="'.$template_uri.'/images/icon/GitHub_Logo.png" alt="Github Logo"/></a>'
                    .'<div class="fb-like" data-href="https://web.facebook.com/biqdev" data-layout="button" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'
                . '</div>'
        . '</div>';
    }
    add_shortcode( 'footer_developer_info', 'footer_developer_info_shortcode' );
?>
