<!DOCTYPE html>
<html lang="en-US">
    <head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" />
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/frontend/js/html5.js"></script>
	<![endif]-->
	
	
	<?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
	<?php 
//	    $content = '';
//	    echo do_shortcode( '[biq-box-wrapper_full css_classes="header layout"]
//		[biq-box-wrapper_short css_classes="info"]Test[/biq-box-wrapper_short]
//		[/biq-box-wrapper_full]' ); 
	    echo do_shortcode( biq_get_head_shortcode() );
	?>
	