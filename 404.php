<?php
    get_header();
?>
    <div class="biq-box-wrapper short biq-container body biq-layout">
            <div class="biq-container biq-box-content right">
                <h1 style="text-align:center;"><span class="fa fa-exclamation-triangle fa-lg"></span> 404</h1>
                <p style="text-align: center; font-size: 1.5rem;">SORRY, PAGE NOT FOUND</p>
                <p style="text-align: center;">Please navigate with menu on the top or on the left for our existing pages.</p>
            </div>
        <?php
            echo do_shortcode( biq_get_shortcode_part( "sidebar", "widget" ) );//LEFT SIDEBAR
        ?>
    </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<?php
    get_footer();
?>

