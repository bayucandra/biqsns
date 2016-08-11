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
	if( !empty( $css_inline ) ) $css_inline = ' style = "'.$css_inline.'"';
        $img_title = !empty($img_title) ? ' title="'.$img_title.'"' : ""; 
        $element_attributes =  'class="biq-widgets logo '.$classes.'"'. $css_inline 
                .' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="logo"';
	return '<a href="'.$url.'" '.$element_attributes.'>'
                .'<img src="'. $template_uri . '/images/biq/widgets/'.$img_file_name.'" alt="'.$img_alt.'"'.$img_title.'>'
            .'</a>';
    }
    add_shortcode('logo', 'logo_shortcode');
?>
