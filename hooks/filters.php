<?php

function biq_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() ) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo( 'name', 'display' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'biq-sns' ), max( $paged, $page ) );
	}

	return $title;
}
add_filter( 'wp_title', 'biq_wp_title', 10, 2 );

function biq_excerpt_length($length){
    return 5;
}
add_filter( 'excerpt_length', 'biq_excerpt_length',1 );

function biq_excerpt_more(){
    return ' …';
}
add_filter('excerpt_more', 'biq_excerpt_more');