<?php
    global $biq_sns_settings;
?>
a.biq-widgets.logo{
    min-height:5rem;
    width : <?php echo $biq_sns_settings["option"]["sidebar_width"];?>px;
}
a.biq-widgets.logo img{
    margin-left: 0.5rem;
    display: inline-block;/*avoid extra bottom margin to the wrapper when in default ( inline display )*/
}
