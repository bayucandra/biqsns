<?php
    function biq_slider_shortcode( $atts, $content = null ){
        global $template_uri; global $template_arr; global $biq_sns_settings;
        extract(
            shortcode_atts(
                array(
                    'widget_id'=>'', 'classes'=>'', 'css_inline'=>''
                ),
                $atts
            )
        );
        $widget_arr = biq_widget_find( $template_arr[ $biq_sns_settings["active_template"] ], $widget_id );
        $list = ($widget_arr["is_found"] && isset($widget_arr["data"]["attributes"]["list"]) ) ? $widget_arr["data"]["attributes"]["list"] : '';
        
	$css_inline = !empty( $css_inline ) ? ' style = "'.$css_inline.'"' : '';
	$classes = !empty( $classes ) ? ' '.$classes : '';
        
        $list_arr = json_decode($list, true);
        $list_empty_class = empty($list_arr) ? ' empty' : '';
        
        $element_attributes =  'class="biq-widgets slider'.$list_empty_class.$classes.'"'. $css_inline;
        $element_attributes .= is_admin() ?
                ' data-biq-widget-id="'.$widget_id.'" data-biq-widget-type="slider" data-biq-css-default="slider empty"'
                : '';
//        $list_arr = json_decode($list);
        $html_slider = '<div '.$element_attributes.'>';
        
        if( empty($list_arr) ){
            $html_slider .=
                '<div class="slide">'
                    .'<img src="'.$template_uri.'/images/biq/widgets/slider/no-image.png"/>'
                .'</div>';
            $html_slider .= 
                '<div class="slide">'
                    .'<img src="'.$template_uri.'/images/biq/widgets/slider/no-image.png"/>'
                .'</div>';
        }else{
            foreach($list_arr AS $key=>$val){
                $title_color = ( !empty( $val["inputs"]["title_color"] ) ) ? ' style="color:'.$val["inputs"]["title_color"].'"' : '';
                $caption_color = ( !empty( $val["inputs"]["caption_color"] ) ) ? ' style="color:'.$val["inputs"]["caption_color"].'"' : '';
                $html_slider .= 
                    '<div class="slide">'
                        .'<img src="'.$val["uri_base"]."/".rawurlencode($val["img_name"]).'"/>'
                        .'<div class="text">'
                            .( !empty($val["inputs"]["title"]) ? '<h2'.$title_color.'>' .$val["inputs"]["title"]. '</h2>' : '<br/><br/>' )
                            .( !empty($val["inputs"]["caption"]) ? '<p'.$caption_color.'>'. $val["inputs"]["caption"] .'</p>' : '<br/>' )
                            .( !empty($val["inputs"]["url"]) ? '<a class="button" href="'.$val["inputs"]["url"].'">View Detail</a>' : '')
                        .'</div>'
                    .'</div>';
            }
        }
        $html_slider .= '</div>';
        $html_slider .=
            '<script>
                jQuery(document).ready(function(){
                    new BIQSlider({wrapper:".biq-widgets.slider", css_width:"60%",css_height:400,img_height_auto:true});
                });
            </script>';
        return $html_slider;
    }
    add_shortcode( 'biq_slider', 'biq_slider_shortcode' );
?>
