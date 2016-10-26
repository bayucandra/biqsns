<?php
    header("Content-type: text/css; charset: UTF-8");
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
.biq-footer{
    background-color:#f2f2f2;
    padding: 1rem auto;
    margin-top: 1rem;
}
.biq-footer .column{
    width: 33%;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
}
<?php
    require("layout/sidebar-css.php");
    require("layout/content-css.php");
?>