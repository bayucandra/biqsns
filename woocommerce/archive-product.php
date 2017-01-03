<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $biq_sns_settings;

if( $biq_sns_settings["woocommerce"]["hide_shorting"] ){
    remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
}

$product_display_mode = $biq_sns_settings["woocommerce"]["product_display_mode"];
if( $product_display_mode == 'show' ){//begin removing some actions for this file
    remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
    remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
    //BEGIN ADD SHORT DESCRIPTION====
    add_action('woocommerce_shop_loop_item_title', 'biq_wc_template_loop_product_short_desc');
}

//BEGIN MOVE 'woocommerce_template_loop_rating' inside thumbnail
remove_action( 'woocommerce_after_shop_loop_item_title' , 'woocommerce_template_loop_rating', 5);
add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );

get_header( 'shop' ); 
?>
    <div class="biq-box-wrapper short biq-container body biq-layout">
        <?php
            echo do_shortcode( biq_get_shortcode_part( "sidebar", "widget" ) );//LEFT SIDEBAR
        ?>
        <?php
                /**
                 * woocommerce_before_main_content hook.
                 *
                 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
                 * @hooked woocommerce_breadcrumb - 20
                 */
                do_action( 'woocommerce_before_main_content' );
        ?>
        
                <?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>

                        <h1 class="page-title"><?php woocommerce_page_title();?></h1>

                <?php endif;?>

                <?php
                        /**
                         * woocommerce_archive_description hook.
                         *
                         * @hooked woocommerce_taxonomy_archive_description - 10
                         * @hooked woocommerce_product_archive_description - 10
                         */
                        do_action( 'woocommerce_archive_description' );
                ?>

                <?php if ( have_posts() ) : ?>

                        <?php
                                /**
                                 * woocommerce_before_shop_loop hook.
                                 *
                                 * @hooked woocommerce_result_count - 20
                                 * @hooked woocommerce_catalog_ordering - 30
                                 */
                                do_action( 'woocommerce_before_shop_loop' );
                        ?>

                        <?php woocommerce_product_loop_start(); ?>

                                <?php woocommerce_product_subcategories(); ?>

                                <?php while ( have_posts() ) : the_post(); ?>

                                        <?php wc_get_template_part( 'content', 'product' ); ?>

                                <?php endwhile; // end of the loop. ?>

                        <?php woocommerce_product_loop_end(); ?>

                        <?php
                                /**
                                 * woocommerce_after_shop_loop hook.
                                 *
                                 * @hooked woocommerce_pagination - 10
                                 */
                                do_action( 'woocommerce_after_shop_loop' );
                        ?>

                <?php elseif ( ! woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) : ?>

                        <?php wc_get_template( 'loop/no-products-found.php' ); ?>

                <?php endif; ?>

        <?php
                /**
                 * woocommerce_after_main_content hook.
                 *
                 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
                 */
                do_action( 'woocommerce_after_main_content' );
        ?>

        <?php
                /**
                 * woocommerce_sidebar hook.
                 *
                 * @hooked woocommerce_get_sidebar - 10
                 */
//                do_action( 'woocommerce_sidebar' );
        ?>
    </div><!-- end biq-container -->
<?php get_footer( 'shop' ); ?>