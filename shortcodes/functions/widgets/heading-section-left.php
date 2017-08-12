<?php
    function heading_section_left_shortcode($atts, $content = null){
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline' => '', 'classes' =>'',
                    'tag_name'=>'','highlight' => '',//highlight class
                    'border' => ''
                ),
                $atts
            )
        );
        
        if($highlight == "none"){
            $highlight = "";
        }elseif( empty($highlight) ){
            $highlight = " highlight-default";
        }else{
            $highlight=" ".$highlight;
        }
        $tag_name = empty($tag_name) ? 'h3' : $tag_name;
        
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $element_attributes =  'class="biq-widgets section-left'.$highlight.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="heading_section_left" data-biq-css-default="section-left highlight-default highlight-red"'
                : '';
        return '<'.$tag_name.' '.$element_attributes.'>'.$content.'</'.$tag_name.'>';
    }
    add_shortcode('heading_section_left', 'heading_section_left_shortcode');
?>
