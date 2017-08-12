<?php
    if ( ! defined( 'ABSPATH' ) ) {
            exit; // Exit if accessed directly
    }
    /**
     * Get the product thumbnail, or the placeholder if not set.
     *
     * @subpackage	Loop
     * @param string $size (default: 'shop_catalog')
     * @param int $deprecated1 Deprecated since WooCommerce 2.0 (default: 0)
     * @param int $deprecated2 Deprecated since WooCommerce 2.0 (default: 0)
     * @return string
     */
    function woocommerce_get_product_thumbnail( $size = 'shop_catalog', $deprecated1 = 0, $deprecated2 = 0 ) {
            global $post;
            $image_size = apply_filters( 'single_product_archive_thumbnail_size', $size );
            $img = "";
            if ( has_post_thumbnail() ) {
                    $props = wc_get_product_attachment_props( get_post_thumbnail_id(), $post );
                    $img = get_the_post_thumbnail( $post->ID, $image_size, array(
                            'title'	 => $props['title'],
                            'alt'    => $props['alt'],
                    ) );
            } elseif ( wc_placeholder_img_src() ) {
                    $img=wc_placeholder_img( $image_size );
            }
            $img = '<div class="image">'.$img.'</div>';
            return $img;
    }
?>
