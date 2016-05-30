<?php

function biq_sns_be_menus(){
$icon_svg = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKGSURBVDiNhZNLSJRRFMd/5860CIMwN9FGCZIZR017EGEPJahNkAUKReSjFm3ahTaa9mX5GI2I1pFOKOG4C6KFoCbpogypmWEITKlFiwhyYS6kuafFvD51oP/qnv8993fOPff7hP8oMDDyWIRbwArwFqtjsWDLzNY84w78j54Vlw+En7o9MZwAvMAB4AZGpstDI1MVfcO+vKBA//BRT9K7CBRkPSeyC6U6T6N16pG5sqEXxzaBDvaFS8XIJFCIsXOZzR27/3hR6gW9COIACRdsj7H2dVX/cAmAoCrlQ+EplNoUOen73H79S54uqHWmvb92fu8EvQdI2p6NtTeflkAoXCfoVNr8GWtr2ouIAmiX7zDGU48gJJmQB/FPABWDI92q3M8UUGvPGAOXXUXns5DusiDGLIDeRbUT0UV1yjoAitaL+4CvmUNiTINR1ZocR+cB1AlUAb2b7iUISq86/kMzTt1f0NHcMU4ZhJKsYcwSAFYvINkZbJG5BKAiUVeRfQZIZuMkNpWrnvwQADV5TK8B+ZEj28rUwvMqPwMlKePpyJ9riG8GsTMZwyJXGyIRjzixBUS7UHQTBAlmXk4sJ7Nbou+M4HnpIpcmVtbbAMRJPESlGtF2lNsYrZSeeAigIRLxIBzPnDMwJgCB0MiskK2gotrh218wNNHYmJ2fW5WDzw9ZNR/T4WSsremcF8BY26zGLACFgKhIf2Jl/Vp5KDwu6BKiG3a94E3caVxLjyDzyayKtTcRSb1ANNi6jNrzwG9XYT+oozCqKmFgwzWvGmBVrZ6NBluX09dLKXandR5MDcIM26Tv405jDoSsIRyJB1s+uOa7Xen/7wpQCxSJ8CTa1tyTLzejf/8h8kCZFQtaAAAAAElFTkSuQmCC";
    add_menu_page(
	'BIQ - Show And Shop Theme seting',
	'BIQ theme setting',
	'manage_options',
	'biq-sns-theme-setting',
	'biq_sns_theme_setting_page',
	$icon_svg,
	60
    );
}
add_action('admin_menu', 'biq_sns_be_menus');
function biq_sns_theme_setting_page(){
    if( !current_user_can('manage_options') ){
	wp_die( __('You have no privilege to access this page', 'biqsoft') );
    }
    require_once 'pages/main.php';
}


?>
