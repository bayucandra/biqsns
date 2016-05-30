<?php
/*
 * Frontend scripts and styles
 */
    function biq_sns_fe_styles(){
	global $template_uri;
	wp_enqueue_style( 'main_css', $template_uri . '/frontend/css/main_css.php' );
	wp_enqueue_style( 'widget_css', $template_uri . '/frontend/css/widget_css.php' );
	if(WP_DEBUG){
	    wp_enqueue_style( 'font_', $template_uri . '/frontend/libs/font-awesome-4.6.3/css/font-awesome.css' );
	}else{
	    wp_enqueue_style( 'font_', $template_uri . '/frontend/libs/font-awesome-4.6.3/css/font-awesome.min.css' );
	}
    }
    add_action( 'wp_enqueue_scripts', 'biq_sns_fe_styles' );
    
    function biq_sns_fe_js(){
	global $template_uri;
	wp_enqueue_script( 'bfunctions_js', $template_uri . '/frontend/js/bfunctions.js', array( 'jquery' ), '', false );
	wp_enqueue_script( 'main_js', $template_uri . '/frontend/js/main.js', array( 'bfunctions_js', 'jquery' ), '', false );
    }
    add_action( 'wp_enqueue_scripts', 'biq_sns_fe_js' );
    
    function biq_sns_fe_head(){
	global $template_uri;
	$head="";
	if(WP_DEBUG){
	    //BEGIN GOOGLE FONT=============
	    $head .= 
	    "<style>
		@font-face {
		    font-family: Lato;
		    src: url($template_uri/frontend/fonts/Lato/Lato-Bold.ttf);
		    font-weight: bold;
		}
		@font-face {
		    font-family: Lato;
		    src: url($template_uri/frontend/fonts/Lato/Lato-Regular.ttf);
		    font-weight: normal;
		}
	    </style>\n";
	}else{
	    $head .= "<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>";
	}
	echo $head;
    }
    add_action('wp_head','biq_sns_fe_head');
?>
