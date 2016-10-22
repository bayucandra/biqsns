<?php
    header("Content-type: text/css; charset: UTF-8");
    require_once '../../biq_sns_settings.php';
    $biq_sns_settings = unserialize($biq_sns_settings_serialized);
?>

.biq-widgets .widget-not-ready{
    display: none;
}

a.biq-widgets.contact-email-simple{
    width : <?php echo $biq_sns_settings["option"]["sidebar_width"];?>px;
    float : left;
    padding : 5px 5px 5px 0;
}

a.biq-widgets.contact-email-simple > * {
    height: 1rem;
    line-height: 1rem;
    white-space: nowrap;
    position: relative;
}
a.biq-widgets.contact-email-simple > div {
    float : left;
}
a.biq-widgets.contact-email-simple .icon{
    float : left;
    width : 21px;
}
a.biq-widgets.contact-email-simple .text{
    margin-left: 5px;
    color : #666666;
}
<?php
    require 'widgets/logo-css.php';
    require 'widgets/menu-main-css.php';
    require 'widgets/heading-section-css.php';
    require 'widgets/category-list.css';
?>
