<?php
get_header();

//echo biq_get_body_shortcode('home');

echo do_shortcode( biq_get_shortcode_part('home', 'body') );
//echo biq_get_body_shortcode('home');
get_footer();
?>