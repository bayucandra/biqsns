<?php
    function contact_email_simple_shortcode($atts, $content = null){
	global $template_uri;
	extract(
	    shortcode_atts (
		array(
                    'widget_id' => '',
		    'icon_type' => 'image',// image / class(css)
		    'icon_value' => $template_uri . '/images/biq/widgets/contact-email-simple/icon-contact-email-21x14.png',//icon src / class name
		    'css_inline' => '',
		    'classes' => ''
		),
		$atts 
	    )
	);
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
	
	$icon_html = "";
	if( $icon_type === 'image' ){//USING IMAGE AS ICON
	    $icon_html = '<img src="'.$icon_value.'">';
	}elseif( $icon_type === 'class' ){//USING CLASS AS ICON
	    $icon_html = '<span class="'.$icon_value.'"></span>';
	}
        $element_attributes =  'class="biq-widgets contact-email-simple'.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="contact_email_simple" data-biq-css-default="contact-email-simple"'
                : '';
	return '<a href="mailto:'.$content.'" '.$element_attributes.'>'
		    .'<div class="icon">'.$icon_html.'</div>' 
		    .'<div class="text">'. $content.'</div>' 
		.'</a>';
    }
    add_shortcode('contact_email_simple', 'contact_email_simple_shortcode');

?>
