<?php
    header("Content-type: text/css; charset: UTF-8");
    require_once '../../biq_sns_settings.php';
    $biq_sns_settings = unserialize($biq_sns_settings_serialized);
?>
.biq-table{
    display:table;
}
.biq-table-cell{
    display: table-cell;
    vertical-align: middle;
}

.biq-header{
    overflow:visible;
}
.biq-header .line-top{
    background-color:#f2f2f2;
}
<?php
    require("layout/sidebar-css.php");
    require("layout/content-css.php");
?>