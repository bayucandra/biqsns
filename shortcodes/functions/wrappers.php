<?php

    function biq_box_wrapper_full_shortcode($atts, $content = null){
	extract(
	    shortcode_atts (
		array(
                    'widget_id'=>'',
		    'classes'=>'',//CSS classes in space separated
		    'css_inline'=> ''//inline styles
		),
		$atts 
	    ) 
	);
	
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
	
	return '<div'.$css_inline.' class="biq-box-wrapper full'.$classes.'">' . do_shortcode($content) . '</div>';
//	return '<div'.$css_inline.' class="biq-box-wrapper full biq-container'.$classes.'">' . do_shortcode($content) . '</div>';
    }
    add_shortcode('biq_box_wrapper_full', 'biq_box_wrapper_full_shortcode');
    add_shortcode('biq_box_wrapper_full_alt', 'biq_box_wrapper_full_shortcode');
    
    function biq_box_wrapper_short_shortcode($atts, $content = null){
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
	
	return '<div'.$css_inline.' class="biq-box-wrapper short'.$classes.'">' . do_shortcode($content) . '</div>';
//	return '<div'.$css_inline.' class="biq-box-wrapper short biq-container'.$classes.'">' . do_shortcode($content) . '</div>';
    }
    add_shortcode('biq_box_wrapper_short', 'biq_box_wrapper_short_shortcode');
    add_shortcode('biq_box_wrapper_short_alt', 'biq_box_wrapper_short_shortcode');
    
    function biq_box_wrapper_shortcode($atts, $content = null){
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
	
	return '<div'.$css_inline.' class="biq-box-wrapper'.$classes.'">' . do_shortcode($content) . '</div>';
    }
    add_shortcode('biq_box_wrapper', 'biq_box_wrapper_shortcode');
?>