<?php

/*
 * Declare global vars
 */
$template_uri = get_template_directory_uri();
$template_directory = get_template_directory();
require 'functions/bfunctions.php';
//BEGIN SESSION================
//define("SESSION_BIQ_BE", "BIQ-SOFT-BE");//BACKEND SESSION NAME
//define("SESSION_BIQ_FE", "BIQ-SOFT-FE");//FRONTEND SESSION NAME
//if(!session_id()){
//    session_start();
//}

//BEGIN FRONTEND====================
require 'frontend/scripts_n_styles_fe.php';

//BEGIN BACKEND=====================
require 'backend/menu-theme-setting.php';
require 'backend/scripts_n_styles_be.php';

//BEGIN SHORTCODES===================
require 'shortcodes/functions/wrappers.php';
require 'shortcodes/functions/widgets/contact-email-simple.php';

require 'shortcodes/data/init.php';

//END SHORTCODES***************************

//BEGIN HOOKS=========================
require 'hooks/filters.php';
//END HOOKS********************
?>
