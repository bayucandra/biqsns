<?php
/*
 * Backend scripts and styles
 */
    function biq_sns_be_styles($hook){
	if ( 'toplevel_page_biq-sns-theme-setting' != $hook ) {
	    return;
	}
	
	global $template_uri;
	wp_enqueue_style( 'biq-style', $template_uri . '/frontend/css/style.css' );
	//BEGIN EXTERNAL LIBRARY=================
	wp_enqueue_style( 'angular-ui-notification', $template_uri . '/libs/angular/angular-ui-notification.css' );
        
        wp_enqueue_style( 'angular-material', $template_uri . '/libs/angular/angular-material.css' );
	wp_enqueue_style( 'lf-ng-md-file-input', $template_uri . '/libs/angular/lf-ng-md-file-input.min.css' );
//        wp_enqueue_style( 'jquery-ui.structure.min', $template_uri, '/libs/jquery-ui/jquery-ui.structure.min.css' );
//        wp_enqueue_style( 'jquery-ui.theme.min', $template_uri, '/libs/jquery-ui/jquery-ui.theme.min.css' );
	//END EXTERNAL LIBRARY***********
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
	wp_enqueue_script( 'angular_animate', $template_uri . '/libs/angular/angular-animate.js',
	    array( 'angular' ), null, true );
	wp_enqueue_script( 'angular_aria', $template_uri . '/libs/angular/angular-aria.js',
	    array( 'angular' ), null, true );
	wp_enqueue_script( 'angular_loading_overlay', $template_uri . '/libs/angular/angular-loading-overlay.js',
	    array( 'angular' ), null, true );
	wp_enqueue_script( 'angular_ui_notification', $template_uri . '/libs/angular/angular-ui-notification.js',
	    array( 'angular' ), null, true );
	if( WP_DEBUG ){
	    wp_enqueue_script( 'angular', $template_uri . '/libs/angular/angular.js',
		array( ), null, false );
	    wp_enqueue_script( 'angular_material', $template_uri . '/libs/angular/angular-material.js',
		array( 'angular' ), null, true );
	}else{
	    wp_enqueue_script( 'angular', $template_uri . '/libs/angular/angular.min.js',
		array( ), null, false );
	    wp_enqueue_script( 'angular_material', $template_uri . '/libs/angular/angular-material.min.js',
		array( 'angular' ), null, true );
	}
        wp_enqueue_script( 'angular_messages', $template_uri . '/libs/angular/angular-messages.min.js',
            array( 'angular' ), null, true );
	wp_enqueue_script( 'lf-ng-md-file-input', $template_uri . '/libs/angular/lf-ng-md-file-input.min.js',
	    array( 'angular' ), null, true );
	wp_enqueue_script( 'jquery-ui.min', $template_uri . '/libs/jquery-ui/jquery-ui.min.js',
	    array( 'jquery' ), null, true );
	wp_enqueue_script( 'biq_slider', $template_uri . '/libs/biq-slider/biq-slider.js',
	    array( 'jquery' ), null, true );
	//END EXTERNAL LIBRARY*************
	//BEGIN BIQ LIBRARY============
	
	wp_enqueue_script( 'bfunctions', $template_uri . '/frontend/js/bfunctions.js', array( 'jquery' ), null, true );
	//BEGIN APP===========
	wp_enqueue_script( 'biq_app', $template_uri . '/backend/app.js',
		array( 'jquery', 'angular', 'bfunctions' ), null, true );
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
		\n var \$b = jQuery.noConflict();
		\n var main_wrapper_id = 'biq-sns-be-main';
	    \n</script>";
	//END JAVASCRIPTS*****************
	echo $head;
    }
    add_action('admin_head-toplevel_page_biq-sns-theme-setting','biq_sns_be_head');
?>