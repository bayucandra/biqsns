<?php
/*
 * Backend scripts and styles
 */
    function biq_sns_be_styles($hook){
	if ( 'toplevel_page_biq-sns-theme-setting' != $hook ) {
	    return;
	}
	
	global $template_uri;
	wp_enqueue_style( 'main', $template_uri . '/frontend/css/main_css.php' );
	wp_enqueue_style( 'widget', $template_uri . '/frontend/css/widget_css.php' );
	if( WP_DEBUG ){
	    wp_enqueue_style( 'font-awesome', $template_uri . '/frontend/libs/font-awesome-4.6.3/css/font-awesome.css' );
	    wp_enqueue_style( 'bootstrap-theme', $template_uri . '/libs/bootstrap/bootstrap-theme.css' );
	    wp_enqueue_style( 'bootstrap', $template_uri . '/libs/bootstrap/bootstrap.css' );
	    wp_enqueue_style( 'bootstrap-dialog', $template_uri . '/libs/bootstrap-dialog/bootstrap-dialog.css' );
	}else{
	    wp_enqueue_style( 'font-awesome', $template_uri . '/frontend/libs/font-awesome-4.6.3/css/font-awesome.min.css' );
	    wp_enqueue_style( 'bootstrap-theme', $template_uri . '/libs/bootstrap/bootstrap-theme.min.css.css' );
	    wp_enqueue_style( 'bootstrap', $template_uri . '/libs/bootstrap/bootstrap.min.css' );
	    wp_enqueue_style( 'bootstrap-dialog', $template_uri . '/libs/bootstrap-dialog/bootstrap-dialog.min.css' );
	}
	//BEGIN BIQ WIDGET AND LAYOUT=================
	wp_enqueue_style( 'theme-layout', $template_uri . '/backend/css/theme-layout.css' );
	wp_enqueue_style( 'theme-widget', $template_uri . '/backend/css/theme-widget.css' );
    }
    add_action( 'admin_enqueue_scripts', 'biq_sns_be_styles' );
    
    function biq_sns_be_js($hook){
	if ( 'toplevel_page_biq-sns-theme-setting' != $hook ) {
	    return;
	}
	
	global $template_uri;
	//BEGIN EXTERNAL LIBRARY==========
	if( WP_DEBUG ){
	    wp_enqueue_script( 'bootstrap', $template_uri . '/libs/bootstrap/bootstrap.js', array( 'jquery' ), false );
	    wp_enqueue_script( 'bootstrap_dialog', $template_uri . '/libs/bootstrap-dialog/bootstrap-dialog.js',
		    array( 'jquery', 'bootstrap' ), false );
	}else{
	    wp_enqueue_script( 'bootstrap', $template_uri . '/libs/bootstrap/bootstrap.min.js', array( 'jquery' ), false );
	    wp_enqueue_script( 'bootstrap_dialog', $template_uri . '/libs/bootstrap-dialog/bootstrap-dialog.min.js',
		    array( 'jquery', 'bootstrap' ), false );
	}
	//BEGIN BIQ LIBRARY============
	wp_enqueue_script( 'bfunctions', $template_uri . '/frontend/js/bfunctions.js', array( 'jquery' ), '', false );
	wp_enqueue_script( 'biq_widget_structure', $template_uri . '/backend/js/biq-widget-structure.js' );
	wp_enqueue_script( 'biq_theme_management', $template_uri . '/backend/js/biq-theme-management.js',
		array( 'jquery', 'bootstrap', 'bfunctions', 'biq_widget_structure' ), '', false );
	//BEGIN APP===========
	wp_enqueue_script( 'biq_theme_management_app_js', $template_uri . '/backend/app.js',
		array( 'jquery', 'bootstrap', 'bfunctions', 'biq_theme_management', 'biq_widget_structure' ), '', false );
    }
    add_action( 'admin_enqueue_scripts', 'biq_sns_be_js' );
    
    
    function biq_sns_be_head(){
	
	global $template_uri; global $template_directory;
	$head="";
	$head .= '<link rel="shortcut icon" href="'.$template_uri.'/favicon.ico" />';
	if(WP_DEBUG){
	    //BEGIN GOOGLE FONT=============
	    $head .= 
	    "\n<style>
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
	    $head .= "\n<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>";
	}
	//BEGIN JAVASCRIPTS==================
	$head .= "\n<script>
		\n var template_uri = '$template_uri';
	    \n</script>";
	//END JAVASCRIPTS*****************
	echo $head;
    }
    add_action('admin_head-toplevel_page_biq-sns-theme-setting','biq_sns_be_head');
?>