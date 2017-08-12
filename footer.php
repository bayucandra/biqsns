        <?php
            $footer_shortcode = biq_get_shortcode_part("footer", "widget");
            echo do_shortcode( $footer_shortcode );
        ?>
	<?php wp_footer();?>
    </body>
</html>