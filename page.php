<?php
    get_header();
?>
    <div class="biq-box-wrapper short biq-container body biq-layout">
        <?php
            if( have_posts() ):
                while( have_posts() ):
                    the_post();
        ?>
            <div class="biq-container biq-box-content right">
                <h1 style="text-align:center;"><?php the_title();?></h1>
                <p><?php the_content();?></p>
            </div>
        <?php
                endwhile;
            endif;
        ?>
        <?php
            echo do_shortcode( biq_get_shortcode_part( "sidebar", "widget" ) );//LEFT SIDEBAR
        ?>
    </div>
<?php
    get_footer();
?>
