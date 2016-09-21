<?php
    function logo_shortcode($atts){
	global $template_uri;
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '',
		    'css_inline' => '',
		    'classes' => '',
                    'img_file_name' => 'logo.png',//image file name e.g : logo.png, logo.jpg which will modified when user upload new logo
                    'img_alt' => 'Logo',
                    'url' => site_url(),
                    'img_title' => ''
                ),
                $atts
            )
        );
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $img_title = !empty($img_title) ? ' title="'.$img_title.'"' : ""; 
        $element_attributes =  'class="biq-widgets logo'.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ? 
                    ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="logo" data-biq-css-default="logo"' 
                : '';
	return
            '<a href="'.$url.'" '.$element_attributes.'>'
                .'<img src="'. $template_uri . '/images/biq/widgets/logo/'.$img_file_name.'" alt="'.$img_alt.'"'.$img_title.'>'
            .'</a>';
    }
    add_shortcode('logo', 'logo_shortcode');
?>
