<?php
//CURENTLY UNUSED 161019
add_action( 'init', 'create_post_biq_slider' );

function create_post_biq_slider() {
  register_post_type( 'biq_slider',
    array(
      'labels' => array(
        'name' => __( 'BIQ Slider' ),
        'singular_name' => __( 'BIQ Slider' )
      ),
      'public' => true,
      'has_archive' => false
    )
  );
}

?>
