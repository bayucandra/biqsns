<?php
    add_action( 'wp_ajax_widget_save', 'biq_sns_widget_save' );

    function biq_sns_widget_save(){
//	global $wpdb;
//        global $template_arr;
        global $BIQTheme;

        $BIQTheme->save( $_POST );
	wp_die();
    }
    add_action( 'wp_ajax_widget_query', 'biq_sns_widget_query' );
    function biq_sns_widget_query(){
        global $BIQTheme;
        $BIQTheme->widget_query($_POST);
        wp_die();
    }
?>
