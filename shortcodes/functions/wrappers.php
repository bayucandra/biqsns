<?php

    function bbox_wrapper_full_shortcode($atts, $content = null){
	extract(
	    shortcode_atts (
		array(
		    'classes'=>'',//CSS classes in space separated
		    'css_inline'=> ''//inline styles
		),
		$atts 
	    ) 
	);
	
	if( !empty( $css_inline ) ) $css_inline = ' style = "'.$css_inline.'"';
	if( !empty( $classes ) ) $classes = ' '.$classes;
	
	return '<div'.$css_inline.' class="bbox_wrapper full'.$classes.'">' . do_shortcode($content) . '</div>';
    }
    add_shortcode('bbox_wrapper_full', 'bbox_wrapper_full_shortcode');
    add_shortcode('bbox_wrapper_full_alt', 'bbox_wrapper_full_shortcode');
    
    function bbox_wrapper_short_shortcode($atts, $content = null){
	extract(
	    shortcode_atts (
		array(
		    'classes'=>'',//CSS classes in space separated
		    'css_inline'=> ''//inline styles
		),
		$atts 
	    ) 
	);
	
	if( !empty( $css_inline ) ) $css_inline = ' style = "'.$css_inline.'"';
	if( !empty( $classes ) ) $classes = ' '.$classes;
	
	return '<div'.$css_inline.' class="bbox_wrapper short'.$classes.'">' . do_shortcode($content) . '</div>';
    }
    add_shortcode('bbox_wrapper_short', 'bbox_wrapper_short_shortcode');
?>