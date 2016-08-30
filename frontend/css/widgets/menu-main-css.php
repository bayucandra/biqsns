.biq-widgets.menu-main{
    min-height:5rem;
    margin:0 10px 0 0;
    font-size:1em;
    overflow:visible;
    z-index:30;
}
.biq-widgets.menu-main.left{
    float:left;
}
.biq-widgets.menu-main.right{
    float:right;
}
.biq-widgets.menu-main input[type=checkbox]{
    display: none;
}
.biq-widgets.menu-main label.show-menu-main{
    font-weight:bold;
    text-decoration: none;
    text-shadow: 1px 2px 0 rgba(0, 0, 0, 0.6);
    color: #fff;
    background: #1f8fb4;
    text-align: center;
    padding: 0 10px;
    display: none;
}
.biq-widgets.menu-main > ul{
    list-style-type: none;
    margin:0;
    padding:0;
    position:relative;
    overflow:visible;
}
.biq-widgets.menu-main li{
    display:inline-block;
    float:left;
    position:relative;
    margin-right:1px;
    overflow:visible;
}
.biq-widgets.menu-main > ul > li > a{
    transition: background-color 0.5s ease;
    display:block;
    min-width:110px;
    height:100%;
    text-align: center;
    line-height:70px;
    color:#000000;
    text-decoration:none;
}
.biq-widgets.menu-main > ul > li.current-menu-item > a{
    color:#328cc1;
}
/*Menu Parent Active & Hover*/
.biq-widgets.menu-main > ul > li.current-menu-item:before, .biq-widgets.menu-main > ul > li.current-menu-ancestor:before{
    content:"";
    display:block;
    position:absolute;
    width:100%;
    height:2px;
    background:#00a6db;
    border-top:#1f8fb4 1px solid;
    border-bottom:#1f8fb4 1px solid;
}
.biq-widgets.menu-main > ul > li:hover > a{
    color:#ffffff;
    background-color:#05c2ff;
    font-weight: bold;
}
/*link wrapper dropdown*/
.biq-widgets.menu-main > ul li:hover ul{
    width:190px;
    /*border:#05c2ff 1px solid;*/
    /*list-style-type:circle;*/
    margin:0 0 0 -10px;
    padding:10px;
    position:relative;
    overflow:auto;
    background-color: rgba(0,0,0,0.5);
}
/*dropdown links style*/
.biq-widgets.menu-main > ul > li:hover ul a{
    font-size:0.95em;
    width:auto;
    text-align: left;
    padding:6px 0 6px 3px;
    border-bottom:#05c2ff;
    display:block;
    text-decoration:none;
    color:#FFF;
}
.biq-widgets.menu-main > ul > li:hover ul a:hover{
    text-decoration:underline;
}
/*Hide dropdown links until they are needed*/
.biq-widgets.menu-main > ul > li ul{
    display:none;
}
/*Make dropdown links vertical*/
.biq-widgets.menu-main > ul > li ul li{
    display:block;
    float:none;
}
/*Prevent text wrapping*/
/*
.biq-widgets.menu-main li ul li a{
    width:auto;
    padding:0 10px;
}
*/
/*Display dropdown on hover*/
.biq-widgets.menu-main > ul > li a:hover + .sub-menu, .biq-widgets.menu-main .sub-menu:hover{
    display:block;
    position:absolute;
    z-index: 25;
}