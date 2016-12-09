<?php
add_theme_support( 'woocommerce' );
add_theme_support( 'menus' );
//BEGIN GLOBAL VARS===================
$template_uri = get_template_directory_uri();
$template_directory = get_template_directory();
//END GLOBAL VARS*************
//require 'functions/post-biq-slider.php';
require 'functions/menu-functions.php';
require 'libs/php/bfunctions.php';
require 'libs/php/bimage.php';

//BEGIN SESSION================
//define("SESSION_BIQ_BE", "BIQ-SOFT-BE");//BACKEND SESSION NAME
//define("SESSION_BIQ_FE", "BIQ-SOFT-FE");//FRONTEND SESSION NAME
//if(!session_id()){
//    session_start();
//}

require 'shortcodes/data/init.php';//INIT TEMPLATE
//BEGIN GLOBAL VARS===================
$biq_sns_settings = get_option('biq-sns-settings');
$template_arr= get_option('biq-sns-template');
$bimage = new BImage("");

//Temporary disabling following 161026
biq_sns_settings_file_gen( true );//genereate biq_settings.php file, always do this after any modification to 'biq-sns-settings' for add_option() / update_uption()

//BEGIN WOOCOMMERCE HOOKS================
add_filter( 'woocommerce_enqueue_styles', '__return_false' );
add_filter( 'loop_shop_columns', function(){ global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_columns"]; } );
add_filter( 'loop_shop_per_page', function(){  global $biq_sns_settings; return $biq_sns_settings["woocommerce"]["loop_shop_per_page"]; } );

add_filter( 'post_class', 'prefix_post_class', 21 );
function prefix_post_class( $classes ) {
    if ( 'product' == get_post_type() ) {
        $classes = array_diff( $classes, array( 'first', 'last' ) );
    }
    return $classes;
}
//END WOOCOMMERCE HOOKS*************

//BEGIN FRONTEND====================
require 'frontend/scripts_n_styles_fe.php';

//BEGIN BACKEND=====================
require 'backend/class.BIQTheme.php';
require 'backend/menu-theme-setting.php';
require 'backend/scripts-n-styles-be.php';
$BIQTheme = new BIQtheme;

require 'backend/ajax-submit.php';

//BEGIN SHORTCODES===================
require 'shortcodes/functions/wrappers.php';
require 'shortcodes/functions/widgets/contact-email-simple.php';
require 'shortcodes/functions/widgets/logo.php';
require 'shortcodes/functions/widgets/menu-main.php';
require 'shortcodes/functions/widgets/heading-section-left.php';
require 'shortcodes/functions/widgets/category-list.php';
require 'shortcodes/functions/widgets/slider.php';
require 'shortcodes/functions/widgets/footer_short_description.php';

require 'shortcodes/functions/layout/sidebar.php';
require 'shortcodes/functions/layout/content.php';


//END SHORTCODES***************************

//BEGIN HOOKS=========================
require 'hooks/filters.php';
//END HOOKS********************

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if(!is_plugin_active('woocommerce/woocommerce.php') && !is_admin() ){
    wp_die('<h1>Please install and activate "Woocommerce" plugin in order to use this themes</h1>');
}
?>
