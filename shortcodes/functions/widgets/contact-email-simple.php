<?php

    function contact_email_simple_shortcode($atts, $content = null){
	global $template_uri;
	extract(
	    shortcode_atts (
		array(
		    'icon_type' => 'image',// image / class(css)
		    'icon_value' => $template_uri . '/images/biq/icon-contact-email-21x14.png',//icon src / class name
		    'css_inline' => ''
		),
		$atts 
	    ) 
	);
	if( !empty( $css_inline ) ) $css_inline = ' style = "'.$css_inline.'"';
	
	if( $icon_type === 'image' ){//USING IMAGE AS ICON
	    return '<a href="mailto:'.$content.'" class="biq-widgets contact-email-simple"'. $css_inline .'>'
			.'<div class="icon"><img src="'.$icon_value.'"></div>' 
			.'<div class="text">'. $content .'</div>' 
		    .'</a>';
	}
    }
    add_shortcode('contact_email_simple', 'contact_email_simple_shortcode');

?>
