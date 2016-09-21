<?php
    function heading_section_left_shortcode($atts, $content = null){
        extract(
            shortcode_atts(
                array(
                    'widget_id' => '', 'css_inline' => '', 'classes' =>'',
                    'tag'=>'h3','highlight' => '',//highlight class
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
        $element_attributes =  'class="biq-widgets section-left'.$highlight.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="heading-section-left" data-biq-css-default="section-left highlight-default"'
                : '';
        return '<'.$tag.' '.$element_attributes.'>'.$content.'</'.$tag.'>';
    }
    add_shortcode('heading_section_left', 'heading_section_left_shortcode');
?>
