<?php
//BEGIN GLOBAL VARS===================
$template_uri = get_template_directory_uri();
$template_directory = get_template_directory();
//END GLOBAL VARS*************
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
require 'shortcodes/functions/widgets/main-menu.php';


//END SHORTCODES***************************

//BEGIN HOOKS=========================
require 'hooks/filters.php';
//END HOOKS********************
?>
